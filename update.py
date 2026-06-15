import json
import pathlib
import argparse
import datetime
import sys

def main():
    parser = argparse.ArgumentParser(description="Regenerate ai_context files from CODEMAP.json")
    parser.add_argument("--module", help="Regenerate only this module (by slug)")
    parser.add_argument("--check", action="store_true", help="Validate CODEMAP.json only")
    args = parser.parse_args()

    codemap_path = pathlib.Path("CODEMAP.json")
    if not codemap_path.exists():
        print("Error: CODEMAP.json not found in project root.")
        sys.exit(1)

    try:
        with open(codemap_path, "r", encoding="utf-8") as f:
            codemap = json.load(f)
    except Exception as e:
        print(f"Error parsing CODEMAP.json: {e}")
        sys.exit(1)

    # Validate CODEMAP.json
    for key in ["meta", "modules", "entities", "dependency_rules"]:
        if key not in codemap:
            print(f"Error: Missing required section '{key}' in CODEMAP.json.")
            sys.exit(1)

    if args.check:
        print("CODEMAP.json is valid.")
        sys.exit(0)

    # Update metadata
    meta = codemap["meta"]
    entities = codemap["entities"]
    meta["total_entities"] = len(entities)
    meta["last_updated"] = datetime.datetime.now(datetime.UTC).isoformat().replace("+00:00", "Z")
    meta["last_updated_by"] = "update.py script"

    # Write back updated CODEMAP.json
    try:
        with open(codemap_path, "w", encoding="utf-8") as f:
            json.dump(codemap, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Error writing to CODEMAP.json: {e}")
        sys.exit(1)

    # Ensure output directory exists
    context_dir = pathlib.Path("ai_context")
    modules_dir = context_dir / "modules"
    modules_dir.mkdir(parents=True, exist_ok=True)

    # Filter entities by module or layer
    modules = codemap["modules"]
    
    # Check if a specific module slug was requested
    requested_slug = args.module
    if requested_slug:
        # Find module ID from slug
        matched_module_id = None
        for mid, mdata in modules.items():
            if mdata.get("slug") == requested_slug:
                matched_module_id = mid
                break
        if not matched_module_id:
            print(f"Error: Module slug '{requested_slug}' not found in CODEMAP.json.")
            sys.exit(1)

    # Helper: Group entities by module
    module_entities = {mid: [] for mid in modules}
    shared_entities = []

    for ent_id, ent in entities.items():
        mid = ent.get("module")
        layer = ent.get("layer")
        if layer in ["UTL", "CFG"] or mid == "shared":
            shared_entities.append((ent_id, ent))
        if mid in module_entities:
            module_entities[mid].append((ent_id, ent))

    # Generate MODULE files
    written_files = []

    # Map layer to section title
    layer_sections = {
        "DB": "DB Models",
        "SVC": "Service Functions",
        "REP": "Repository Functions",
        "RTE": "API Routes",
        "SCH": "Pydantic Schemas",
        "WRK": "Background Workers",
        "FE": "Frontend Components",
        "TST": "Tests",
        "INF": "Infrastructure Config"
    }

    def generate_module_md(mid, mdata, ents):
        slug = mdata["slug"]
        lines = []
        lines.append(f"# MODULE {mdata['name']} ({mid})")
        lines.append(f"Slug: `MODULE_{slug}.md` | Sprint: {mdata.get('sprint', 'N/A')} | Status: {mdata.get('status', 'NOT_STARTED')}")
        lines.append("")
        
        # Group entities by layer
        ents_by_layer = {layer: [] for layer in layer_sections}
        other_ents = []
        for ent_id, ent in ents:
            layer = ent.get("layer")
            if layer in ents_by_layer:
                ents_by_layer[layer].append((ent_id, ent))
            else:
                other_ents.append((ent_id, ent))

        for layer, section_name in layer_sections.items():
            lines.append(f"## {section_name}")
            layer_ents = ents_by_layer[layer]
            if not layer_ents:
                lines.append("*No entities registered for this layer.*")
            else:
                for ent_id, ent in layer_ents:
                    lines.append(f"- **{ent_id}** (`{ent.get('name')}`): {ent.get('description', '')} in `{ent.get('file_path', '')}`")
            lines.append("")

        if other_ents:
            lines.append("## Other Entities")
            for ent_id, ent in other_ents:
                lines.append(f"- **{ent_id}** (`{ent.get('name')}`): {ent.get('description', '')} in `{ent.get('file_path', '')}`")
            lines.append("")

        filepath = modules_dir / f"MODULE_{slug}.md"
        with open(filepath, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
        written_files.append(filepath)

    # Generate MODULE_shared.md
    def generate_shared_md():
        lines = []
        lines.append("# MODULE Shared Utilities & Config (shared)")
        lines.append("Slug: `MODULE_shared.md` | Contains global helpers and configuration keys.")
        lines.append("")
        
        # Group shared entities by layer
        utl_ents = []
        cfg_ents = []
        other_ents = []
        for ent_id, ent in shared_entities:
            layer = ent.get("layer")
            if layer == "UTL":
                utl_ents.append((ent_id, ent))
            elif layer == "CFG":
                cfg_ents.append((ent_id, ent))
            else:
                other_ents.append((ent_id, ent))

        lines.append("## Shared Utilities")
        if not utl_ents:
            lines.append("*No shared utility entities registered.*")
        else:
            for ent_id, ent in utl_ents:
                lines.append(f"- **{ent_id}** (`{ent.get('name')}`): {ent.get('description', '')} in `{ent.get('file_path', '')}`")
        lines.append("")

        lines.append("## Configuration Keys")
        if not cfg_ents:
            lines.append("*No configuration entities registered.*")
        else:
            for ent_id, ent in cfg_ents:
                lines.append(f"- **{ent_id}** (`{ent.get('name')}`): {ent.get('description', '')}")
        lines.append("")

        if other_ents:
            lines.append("## Other Shared Entities")
            for ent_id, ent in other_ents:
                lines.append(f"- **{ent_id}** (`{ent.get('name')}`): {ent.get('description', '')} in `{ent.get('file_path', '')}`")
            lines.append("")

        filepath = modules_dir / "MODULE_shared.md"
        with open(filepath, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
        written_files.append(filepath)

    if requested_slug:
        # Regenerate only the single module requested
        for mid, mdata in modules.items():
            if mdata["slug"] == requested_slug:
                generate_module_md(mid, mdata, module_entities[mid])
                break
        if requested_slug == "shared":
            generate_shared_md()
    else:
        # Regenerate everything
        for mid, mdata in modules.items():
            generate_module_md(mid, mdata, module_entities[mid])
        generate_shared_md()

        # Regenerate ai_context/INDEX.md
        index_lines = []
        index_lines.append("# Divyotsav Module Status & Index")
        index_lines.append("")
        index_lines.append(f"Last Updated: {meta['last_updated']} by {meta['last_updated_by']}")
        index_lines.append(f"Total Entities: {meta['total_entities']} | Active Sprint: {meta['active_sprint']}")
        index_lines.append("")

        index_lines.append("## Module Status")
        index_lines.append("| Module ID | Name | Sprint | Status | Slug |")
        index_lines.append("|---|---|---|---|---|")
        for mid, mdata in sorted(modules.items()):
            index_lines.append(f"| {mid} | {mdata['name']} | {mdata.get('sprint', 'N/A')} | {mdata.get('status', 'NOT_STARTED')} | {mdata['slug']} |")
        index_lines.append("")

        index_lines.append("## Shared Utilities")
        index_lines.append("| Code | Name | File Path | Description |")
        index_lines.append("|---|---|---|---|")
        utl_ents = [e for e in shared_entities if e[1].get("layer") == "UTL"]
        if not utl_ents:
            index_lines.append("| - | - | - | No shared utilities registered |")
        else:
            for ent_id, ent in sorted(utl_ents):
                index_lines.append(f"| {ent_id} | {ent.get('name')} | {ent.get('file_path')} | {ent.get('description')} |")
        index_lines.append("")

        index_lines.append("## Config Keys")
        index_lines.append("| Code | Name | Description |")
        index_lines.append("|---|---|---|")
        cfg_ents = [e for e in shared_entities if e[1].get("layer") == "CFG"]
        if not cfg_ents:
            index_lines.append("| - | - | No config keys registered |")
        else:
            for ent_id, ent in sorted(cfg_ents):
                index_lines.append(f"| {ent_id} | {ent.get('name')} | {ent.get('description')} |")
        index_lines.append("")

        index_lines.append("## Architectural Dependency Rules")
        dep_rules = codemap.get("dependency_rules", {})
        if not dep_rules:
            index_lines.append("*No dependency rules registered.*")
        else:
            for i, (rule_key, rule_text) in enumerate(sorted(dep_rules.items()), 1):
                index_lines.append(f"{i}. **{rule_key}**: {rule_text}")
        index_lines.append("")

        index_filepath = context_dir / "INDEX.md"
        with open(index_filepath, "w", encoding="utf-8") as f:
            f.write("\n".join(index_lines))
        written_files.append(index_filepath)

    print("--- Memory Context Update Summary ---")
    print(f"Total entities: {meta['total_entities']}")
    print(f"Active sprint: {meta['active_sprint']}")
    print("Files written:")
    for filepath in written_files:
        print(f"  - {filepath}")

if __name__ == "__main__":
    main()

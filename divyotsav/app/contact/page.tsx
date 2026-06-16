import ContactClient from "./ContactClient";
import { sanityFetch } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { CMSSiteSettings } from "@/lib/sanity/types";

export const revalidate = 60; // revalidate every minute for live changes

export default async function ContactPage() {
  const siteSettings = await sanityFetch<CMSSiteSettings | null>({
    query: siteSettingsQuery,
    fallback: null,
  });

  return (
    <main className="min-h-screen bg-cream text-obsidian pt-32 pb-24 font-jost">
      <ContactClient siteSettings={siteSettings} />
    </main>
  );
}

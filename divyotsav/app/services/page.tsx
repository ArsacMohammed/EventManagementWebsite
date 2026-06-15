import ServicesCatalog from "@/components/sections/ServicesCatalog";
import { sanityFetch } from "@/lib/sanity/client";
import { allServicesQuery } from "@/lib/sanity/queries";
import { CMSService } from "@/lib/sanity/types";

export const revalidate = 3600; // revalidate every hour

export default async function ServicesPage() {
  const services = await sanityFetch<CMSService[]>({
    query: allServicesQuery,
    fallback: [],
  });

  return (
    <main className="min-h-screen bg-cream text-obsidian pt-32 pb-24 font-jost">
      <ServicesCatalog initialServices={services} />
    </main>
  );
}

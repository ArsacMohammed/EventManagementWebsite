import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/servicesData";
import { sanityFetch } from "@/lib/sanity/client";
import { allServicesQuery, serviceBySlugQuery } from "@/lib/sanity/queries";
import { CMSService } from "@/lib/sanity/types";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const services = await sanityFetch<CMSService[]>({
    query: allServicesQuery,
    fallback: [],
  });

  const list = services && services.length > 0 ? services : servicesData;
  return list.map((s) => ({
    slug: s.slug,
  }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = await sanityFetch<CMSService | null>({
    query: serviceBySlugQuery,
    params: { slug: params.slug },
    fallback: null,
  });

  const displayService = service || servicesData.find((s) => s.slug === params.slug);

  if (!displayService) {
    notFound();
  }

  const features = displayService.features || [];
  const galleryImages = displayService.galleryImages || [];
  const priceString = displayService.priceFrom
    ? displayService.priceFrom.toLocaleString("en-IN")
    : "0";

  return (
    <main className="min-h-screen bg-cream text-obsidian pt-32 pb-24 font-jost">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Back Link */}
        <div className="mb-12">
          <Link
            href="/services"
            className="inline-flex items-center text-xs text-gold uppercase tracking-[0.2em] hover:text-obsidian transition-colors duration-300"
          >
            <svg className="w-3.5 h-3.5 mr-2 stroke-current fill-none" viewBox="0 0 12 12">
              <path d="M10 6H2M6 2L2 6l4 4" strokeWidth="1.5" />
            </svg>
            <span>Back to services</span>
          </Link>
        </div>

        {/* Two-Column Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 mb-16 items-start">
          
          {/* Left Block: Narrative Header */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <span className="font-devanagari text-gold text-sm tracking-wider">
              {displayService.sanskritLabel}
            </span>
            <span className="inline-block text-[10px] text-warm-gray uppercase tracking-widest border border-border-custom px-3 py-1 self-start" style={{ borderRadius: "0px" }}>
              {displayService.category}
            </span>
            <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light text-obsidian tracking-wide pt-2">
              {displayService.title}
            </h1>
            <p className="font-cormorant italic text-gold text-lg md:text-xl font-light pt-2">
              &ldquo;{displayService.tagline}&rdquo;
            </p>
          </div>

          {/* Right Block: Sidebar price summary card */}
          <div
            className="border border-border-custom bg-cream-dark p-8 flex flex-col justify-between space-y-6"
            style={{ borderRadius: "0px" }}
          >
            <div>
              <span className="text-[10px] text-warm-gray uppercase tracking-[0.2em] block mb-2">
                Event Coordination
              </span>
              <span className="font-cormorant text-3xl font-light text-gold block mb-4">
                Starting ₹{priceString}
              </span>
              <p className="text-xs text-warm-gray leading-relaxed font-light">
                Prices vary based on venue size, structural complexity, custom artisan orders, and layout scale.
              </p>
            </div>
            <Link
              href={`/contact?type=${displayService.title}`}
              className="w-full text-center inline-block font-jost text-xs uppercase tracking-[0.2em] bg-gold text-obsidian px-6 py-4 transition-all duration-300 hover:bg-obsidian hover:text-cream"
              style={{ borderRadius: "0px" }}
            >
              Plan Celebration →
            </Link>
          </div>

        </div>

        {/* Full-width Banner Image */}
        {displayService.bannerImage && (
          <div className="relative w-full aspect-[21/9] overflow-hidden mb-16 border border-border-custom/20" style={{ borderRadius: "0px" }}>
            <Image
              src={displayService.bannerImage}
              alt={displayService.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Detailed Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 items-start mb-20">
          
          {/* Main Description */}
          <div className="lg:col-span-2 flex flex-col space-y-6 text-warm-gray text-base md:text-lg font-light leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-cormorant first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-2">
              {displayService.fullDescription}
            </p>
          </div>

          {/* Design Philosophy & Checklist */}
          <div className="flex flex-col space-y-8">
            {/* Design Philosophy Block */}
            <div className="bg-obsidian text-cream p-8 border border-gold/15" style={{ borderRadius: "0px" }}>
              <span className="font-devanagari text-gold text-xs block mb-3">कल्पना (Philosophy)</span>
              <h4 className="font-cormorant text-lg text-cream tracking-wider uppercase mb-3 border-b border-gold/10 pb-2">
                Design Philosophy
              </h4>
              <p className="text-warm-gray text-xs md:text-sm font-light leading-relaxed">
                {displayService.designPhilosophy}
              </p>
            </div>

            {/* Checklist */}
            {features.length > 0 && (
              <div className="flex flex-col space-y-4">
                <h4 className="font-jost text-xs tracking-widest uppercase text-obsidian border-b border-border-custom pb-2 font-medium">
                  What We Curate
                </h4>
                <ul className="flex flex-col space-y-2.5 text-xs text-warm-gray tracking-wide">
                  {features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-gold mr-2.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* Service Details Gallery Grid */}
        {galleryImages.length > 0 && (
          <div className="border-t border-border-custom/35 pt-16">
            <h3 className="font-cormorant text-3xl font-light text-obsidian tracking-wide mb-8">
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {galleryImages.map((image: string, idx: number) => (
                <div
                  key={idx}
                  className="relative w-full aspect-[4/5] overflow-hidden border border-border-custom/25"
                  style={{ borderRadius: "0px" }}
                >
                  <Image
                    src={image}
                    alt={`Bespoke project rendering ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] hover:scale-102 filter grayscale-[20%] hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

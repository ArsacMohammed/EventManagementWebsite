import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-03-15";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to bypass cache during static generation
});

export async function sanityFetch<T>({
  query,
  params = {},
  fallback,
}: {
  query: string;
  params?: Record<string, unknown>;
  fallback: T;
}): Promise<T> {
  const isPlaceholder = !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "placeholder";
  if (isPlaceholder) {
    return fallback;
  }
  try {
    const data = await client.fetch(query, params);
    if (data === null || data === undefined || (Array.isArray(data) && data.length === 0)) {
      return fallback;
    }
    return data;
  } catch (err) {
    console.warn("Sanity fetch error, using fallback:", err);
    return fallback;
  }
}

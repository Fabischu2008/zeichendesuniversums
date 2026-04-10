import { createBrandOpenGraphImage } from "@/lib/og-brand-image";

export const runtime = "nodejs";

export default async function Image() {
  return createBrandOpenGraphImage();
}

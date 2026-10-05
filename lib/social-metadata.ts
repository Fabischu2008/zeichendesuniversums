import type { Metadata } from "next";
import {
  SITE_NAME,
  SOCIAL_PREVIEW_IMAGE,
  SOCIAL_PREVIEW_IMAGE_SIZE,
} from "@/lib/brand";
import { absoluteUrl } from "@/lib/site";

/** Standard-OG-Bilder für Open Graph (WhatsApp, LinkedIn, …). */
export function socialOpenGraphImages(
  alt: string = SITE_NAME,
): NonNullable<NonNullable<Metadata["openGraph"]>["images"]> {
  return [
    {
      url: absoluteUrl(SOCIAL_PREVIEW_IMAGE),
      ...SOCIAL_PREVIEW_IMAGE_SIZE,
      alt,
      type: "image/jpeg",
    },
  ];
}

/** Twitter/X card images (URL-Liste). */
export function socialTwitterImages(): string[] {
  return [absoluteUrl(SOCIAL_PREVIEW_IMAGE)];
}

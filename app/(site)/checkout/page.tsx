import type { Metadata } from "next";
import CheckoutClient from "@/app/checkout/ui";

export const metadata: Metadata = {
  title: "Checkout",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function CheckoutPage({
  searchParams,
}: {
  searchParams?: Promise<{ productId?: string }>;
}) {
  return <CheckoutClient searchParams={searchParams} />;
}


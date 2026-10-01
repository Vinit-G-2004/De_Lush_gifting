import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/delush/Hero";
import { Products } from "@/components/delush/Products";
import { WhyDeLush } from "@/components/delush/WhyDeLush";
import { Gallery } from "@/components/delush/Gallery";
import { EnquiryForm } from "@/components/delush/EnquiryForm";
import { Footer } from "@/components/delush/Footer";
import { WhatsAppButton } from "@/components/delush/WhatsAppButton";

const title = "Gifting an Experience — De LUSH Resort Corporate Gifting";
const description =
  "Premium corporate gifting from De LUSH Resort, Bavdhan, Pune. Stay, dining and wellness vouchers with 10% off on 20+ vouchers and brandable presentation.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Products />
      <WhyDeLush />
      <Gallery />
      <EnquiryForm />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

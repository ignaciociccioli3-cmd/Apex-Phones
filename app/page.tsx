import { Hero } from "@/components/home/Hero";
import { BrandStrip } from "@/components/home/BrandStrip";
import { CategorySelector } from "@/components/home/CategorySelector";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TrustSection } from "@/components/home/TrustSection";
import { FinancingBanner } from "@/components/home/FinancingBanner";
import { TradeInBanner } from "@/components/home/TradeInBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <CategorySelector />
      <FeaturedProducts />
      <TrustSection />
      <FinancingBanner />
      <TradeInBanner />
      <Testimonials />
      <FAQSection />
    </>
  );
}

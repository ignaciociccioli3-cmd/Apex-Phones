import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { products } from "@/lib/data";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — APEX Phones`,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#71717a] mb-8" aria-label="Ruta">
          <Link href="/" className="hover:text-[#f8f8f8] transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/tienda" className="hover:text-[#f8f8f8] transition-colors">Tienda</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#a1a1aa]">{product.name}</span>
        </nav>

        {/* Main product section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>

        {/* Tabs section */}
        <div className="space-y-20 border-t border-white/6 pt-16">
          <ProductSpecs specs={product.specs} highlights={product.highlights} />
          <hr className="section-divider" />
          <ProductReviews
            productId={product.id}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
          <hr className="section-divider" />
          <RelatedProducts products={related} />
        </div>
      </div>
    </div>
  );
}

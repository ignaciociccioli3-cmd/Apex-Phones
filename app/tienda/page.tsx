import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda — APEX Phones",
  description: "Explorá el catálogo completo de smartphones premium. Filtrá por marca, precio, características y más.",
};

function CatalogSkeleton() {
  return (
    <div className="min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-10 w-64 bg-white/5 rounded-2xl mb-3 shimmer-line" />
        <div className="h-4 w-80 bg-white/4 rounded-xl mb-10 shimmer-line" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-3xl bg-white/3 border border-white/6 overflow-hidden">
              <div className="aspect-[4/3] bg-white/4 shimmer-line" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-16 bg-white/5 rounded-lg shimmer-line" />
                <div className="h-5 w-3/4 bg-white/5 rounded-xl shimmer-line" />
                <div className="h-3 w-1/2 bg-white/4 rounded-lg shimmer-line" />
                <div className="h-8 w-full bg-white/4 rounded-xl shimmer-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TiendaPage() {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogView />
    </Suspense>
  );
}

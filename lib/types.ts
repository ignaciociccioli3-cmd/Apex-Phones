export type ProductBadge =
  | "nuevo"
  | "oferta"
  | "recomendado"
  | "mejor-camara"
  | "mejor-bateria"
  | "gaming"
  | "reacondicionado"
  | "agotado";

export interface ProductColor {
  name: string;
  hex: string;
  available: boolean;
}

export interface ProductStorage {
  label: string;
  priceModifier: number;
  available: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  badges: ProductBadge[];
  colors: ProductColor[];
  storage: ProductStorage[];
  images: string[];
  thumbnailUrl: string;
  specs: ProductSpec[];
  highlights: string[];
  category: string;
  os: "iOS" | "Android";
  ram: number;
  storage_gb: number;
  camera_mp: number;
  battery_mah: number;
  has5G: boolean;
  isNew: boolean;
  isRefurbished: boolean;
  inStock: boolean;
  installments: number;
  installmentPrice: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
}

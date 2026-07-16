export type ProductRoutine = "Matin" | "Soir" | "Matin & Soir";

export type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  routine: ProductRoutine;
  rating: number;
  image: string | null;
  favorite: boolean;
};
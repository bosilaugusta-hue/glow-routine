import type {
  Product,
  ProductRoutine,
} from "../types/Product";

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export type CreateProductData = {
  name: string;
  brand: string;
  category: string;
  routine: ProductRoutine;
  rating: number;
  imageUrl: string;
};

export type UpdateProductData = CreateProductData & {
  favorite: boolean;
};

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les produits.");
  }

  const products: Product[] = await response.json();

  return products.map((product) => ({
    ...product,
    favorite: Boolean(product.favorite),
  }));
}

export async function createProduct(
  product: CreateProductData,
): Promise<Product> {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: 1,
      name: product.name,
      brand: product.brand,
      category: product.category,
      routine: product.routine,
      rating: product.rating,
      imageUrl: product.imageUrl,
      favorite: false,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ?? "Impossible d’ajouter le produit.",
    );
  }

  return {
    ...data.product,
    favorite: Boolean(data.product.favorite),
  };
}
export async function deleteProduct(productId: number): Promise<void> {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ?? "Impossible de supprimer le produit.",
    );
  }
}

export async function updateFavorite(
  productId: number,
  favorite: boolean,
): Promise<void> {
  const response = await fetch(
    `${API_URL}/products/${productId}/favorite`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favorite,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ?? "Impossible de modifier le favori.",
    );
  }
}

export async function updateProduct(
  productId: number,
  product: UpdateProductData,
): Promise<void> {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ?? "Impossible de modifier le produit.",
    );
  }
}
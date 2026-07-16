import type { Request, Response } from "express";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "../db";

type ProductRow = RowDataPacket & {
  id: number;
  name: string;
  brand: string;
  category: string;
  routine: "Matin" | "Soir" | "Matin & Soir";
  rating: number;
  image: string | null;
  favorite: boolean;
};

type ProductBody = {
  userId?: number;
  name?: string;
  brand?: string;
  category?: string;
  routine?: "Matin" | "Soir" | "Matin & Soir";
  rating?: number;
  imageUrl?: string;
  favorite?: boolean;
};

export async function getProducts(
  request: Request,
  response: Response,
) {
  try {
    const userId = Number(request.query.userId) || 1;

    const [products] = await pool.query<ProductRow[]>(
      `
        SELECT
          product_id AS id,
          name,
          brand,
          category,
          routine,
          rating,
          image_url AS image,
          favorite
        FROM products
        WHERE user_id = ?
        ORDER BY created_at DESC
      `,
      [userId],
    );

    response.json(products);
  } catch (error) {
    console.error("Erreur getProducts :", error);

    response.status(500).json({
      message: "Impossible de récupérer les produits.",
    });
  }
}

export async function createProduct(
  request: Request<unknown, unknown, ProductBody>,
  response: Response,
) {
  try {
    const {
      userId = 1,
      name,
      brand,
      category,
      routine,
      rating = 0,
      imageUrl = "",
      favorite = false,
    } = request.body;

    if (!name || !brand || !category || !routine) {
      response.status(400).json({
        message:
          "Le nom, la marque, la catégorie et la routine sont obligatoires.",
      });

      return;
    }

    const safeRating = Math.min(Math.max(Number(rating), 0), 5);

    const [result] = await pool.execute<ResultSetHeader>(
      `
        INSERT INTO products (
          user_id,
          name,
          brand,
          category,
          routine,
          rating,
          image_url,
          favorite
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        name,
        brand,
        category,
        routine,
        safeRating,
        imageUrl,
        favorite,
      ],
    );

    response.status(201).json({
      message: "Produit ajouté avec succès.",
      product: {
        id: result.insertId,
        name,
        brand,
        category,
        routine,
        rating: safeRating,
        image: imageUrl,
        favorite,
      },
    });
  } catch (error) {
    console.error("Erreur createProduct :", error);

    response.status(500).json({
      message: "Impossible d'ajouter le produit.",
    });
  }
}

export async function updateProduct(
  request: Request<{ id: string }, unknown, ProductBody>,
  response: Response,
) {
  try {
    const productId = Number(request.params.id);

    const {
      name,
      brand,
      category,
      routine,
      rating = 0,
      imageUrl = "",
      favorite = false,
    } = request.body;

    if (!Number.isInteger(productId)) {
      response.status(400).json({
        message: "Identifiant du produit invalide.",
      });

      return;
    }

    if (!name || !brand || !category || !routine) {
      response.status(400).json({
        message:
          "Le nom, la marque, la catégorie et la routine sont obligatoires.",
      });

      return;
    }

    const safeRating = Math.min(Math.max(Number(rating), 0), 5);

    const [result] = await pool.execute<ResultSetHeader>(
      `
        UPDATE products
        SET
          name = ?,
          brand = ?,
          category = ?,
          routine = ?,
          rating = ?,
          image_url = ?,
          favorite = ?
        WHERE product_id = ?
      `,
      [
        name,
        brand,
        category,
        routine,
        safeRating,
        imageUrl,
        favorite,
        productId,
      ],
    );

    if (result.affectedRows === 0) {
      response.status(404).json({
        message: "Produit introuvable.",
      });

      return;
    }

    response.json({
      message: "Produit modifié avec succès.",
    });
  } catch (error) {
    console.error("Erreur updateProduct :", error);

    response.status(500).json({
      message: "Impossible de modifier le produit.",
    });
  }
}

export async function toggleFavorite(
  request: Request<
    { id: string },
    unknown,
    {
      favorite?: boolean;
    }
  >,
  response: Response,
) {
  try {
    const productId = Number(request.params.id);
    const favorite = Boolean(request.body.favorite);

    if (!Number.isInteger(productId)) {
      response.status(400).json({
        message: "Identifiant du produit invalide.",
      });

      return;
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `
        UPDATE products
        SET favorite = ?
        WHERE product_id = ?
      `,
      [favorite, productId],
    );

    if (result.affectedRows === 0) {
      response.status(404).json({
        message: "Produit introuvable.",
      });

      return;
    }

    response.json({
      message: favorite
        ? "Produit ajouté aux favoris."
        : "Produit retiré des favoris.",
    });
  } catch (error) {
    console.error("Erreur toggleFavorite :", error);

    response.status(500).json({
      message: "Impossible de modifier le favori.",
    });
  }
}

export async function deleteProduct(
  request: Request<{ id: string }>,
  response: Response,
) {
  try {
    const productId = Number(request.params.id);

    if (!Number.isInteger(productId)) {
      response.status(400).json({
        message: "Identifiant du produit invalide.",
      });

      return;
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `
        DELETE FROM products
        WHERE product_id = ?
      `,
      [productId],
    );

    if (result.affectedRows === 0) {
      response.status(404).json({
        message: "Produit introuvable.",
      });

      return;
    }

    response.json({
      message: "Produit supprimé avec succès.",
    });
  } catch (error) {
    console.error("Erreur deleteProduct :", error);

    response.status(500).json({
      message: "Impossible de supprimer le produit.",
    });
  }
}
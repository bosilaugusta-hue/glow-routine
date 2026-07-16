import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "../db";

type UserRow = RowDataPacket & {
  user_id: number;
  first_name: string;
  email: string;
  password_hash: string;
};

export async function register(request: Request, response: Response) {
  try {
    const { firstName, email, password } = request.body;

    if (!firstName || !email || !password) {
      response.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
      return;
    }

    if (password.length < 8) {
      response.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères",
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [existingUsers] = await pool.query<UserRow[]>(
      "SELECT user_id FROM users WHERE email = ? LIMIT 1",
      [normalizedEmail],
    );

    if (existingUsers.length > 0) {
      response.status(409).json({
        message: "Un compte existe déjà avec cet email",
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.execute<ResultSetHeader>(
      `
        INSERT INTO users (first_name, email, password_hash)
        VALUES (?, ?, ?)
      `,
      [firstName.trim(), normalizedEmail, passwordHash],
    );

    response.status(201).json({
      message: "Compte créé avec succès",
      user: {
        id: result.insertId,
        firstName: firstName.trim(),
        email: normalizedEmail,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    response.status(500).json({
      message: "Impossible de créer le compte",
    });
  }
}

export async function login(request: Request, response: Response) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      response.status(400).json({
        message: "Email et mot de passe obligatoires",
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [users] = await pool.query<UserRow[]>(
      `
        SELECT user_id, first_name, email, password_hash
        FROM users
        WHERE email = ?
        LIMIT 1
      `,
      [normalizedEmail],
    );

    const user = users[0];

    if (!user) {
      response.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
      return;
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      user.password_hash,
    );

    if (!passwordIsValid) {
      response.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET manque dans le fichier .env");
    }

    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: "24h",
      },
    );

    response.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.user_id,
        firstName: user.first_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    response.status(500).json({
      message: "Impossible de se connecter",
    });
  }
}
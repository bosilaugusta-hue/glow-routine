import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import "./Register.css";

type RegisterResponse = {
  message?: string;
};

function Register() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] =
    useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!firstName.trim()) {
      setError("Merci de renseigner votre prénom.");
      return;
    }

    if (!email.trim()) {
      setError("Merci de renseigner votre adresse e-mail.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères.",
      );
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName.trim(),
            email: email.trim(),
            password,
          }),
        },
      );

      const data = (await response.json()) as RegisterResponse;

      if (!response.ok) {
        throw new Error(
          data.message ?? "Impossible de créer le compte.",
        );
      }

      setMessage("Compte créé avec succès.");

      window.setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (registerError) {
      console.error(registerError);

      setError(
        registerError instanceof Error
          ? registerError.message
          : "Impossible de créer le compte.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="register-page">
      <section className="register-brand">
        <h1>
          Glow <span>✦</span>
          <br />
          Routine <span>♡</span>
        </h1>

        <p>Mon journal skincare & self-care</p>

        <section className="register-message">
          <Sparkles size={22} />

          <h2>Commencez votre routine</h2>

          <p>
            Créez votre espace personnel et organisez vos produits
            skincare en toute simplicité.
          </p>
        </section>
      </section>

      <section className="register-panel">
        <a className="register-back" href="/">
          <ArrowLeft size={18} />
          Retour à la connexion
        </a>

        <header className="register-header">
          <span>♡</span>

          <h2>
            Créer un compte <Sparkles size={20} />
          </h2>

          <p>Rejoignez votre espace Glow Routine</p>
        </header>

        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            Prénom

            <span className="register-field">
              <UserRound size={19} />

              <input
                type="text"
                value={firstName}
                placeholder="Ex : Augusta"
                autoComplete="given-name"
                onChange={(event) =>
                  setFirstName(event.target.value)
                }
              />
            </span>
          </label>

          <label>
            Adresse e-mail

            <span className="register-field">
              <Mail size={19} />

              <input
                type="email"
                value={email}
                placeholder="Ex : augusta@email.com"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </span>
          </label>

          <label>
            Mot de passe

            <span className="register-field">
              <LockKeyhole size={19} />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="8 caractères minimum"
                autoComplete="new-password"
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

              <button
                type="button"
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                onClick={() =>
                  setShowPassword((currentValue) => !currentValue)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </span>
          </label>

          <label>
            Confirmer le mot de passe

            <span className="register-field">
              <LockKeyhole size={19} />

              <input
                type={showConfirmation ? "text" : "password"}
                value={passwordConfirmation}
                placeholder="Répétez votre mot de passe"
                autoComplete="new-password"
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
              />

              <button
                type="button"
                aria-label={
                  showConfirmation
                    ? "Masquer la confirmation"
                    : "Afficher la confirmation"
                }
                onClick={() =>
                  setShowConfirmation(
                    (currentValue) => !currentValue,
                  )
                }
              >
                {showConfirmation ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </span>
          </label>

          {error && (
            <p className="register-feedback register-error">
              {error}
            </p>
          )}

          {message && (
            <p className="register-feedback register-success">
              {message}
            </p>
          )}

          <button
            className="register-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Création du compte..."
              : "Créer mon compte"}

            <Sparkles size={18} />
          </button>

          <p className="register-login-link">
            Vous avez déjà un compte ?
            <a href="/">Se connecter</a>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;
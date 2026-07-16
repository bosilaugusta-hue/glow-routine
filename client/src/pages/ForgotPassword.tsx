import {
  ArrowLeft,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Merci de renseigner votre adresse e-mail.");
      return;
    }

    try {
      setIsSubmitting(true);

      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      setMessage(
        "Si cette adresse correspond à un compte, les instructions de réinitialisation ont été envoyées.",
      );

      setEmail("");
    } catch (submitError) {
      console.error(submitError);

      setError(
        "Impossible de traiter votre demande pour le moment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="forgot-page">
      <section className="forgot-brand">
        <h1>
          Glow <span>✦</span>
          <br />
          Routine <span>♡</span>
        </h1>

        <p>Mon journal skincare & self-care</p>

        <section className="forgot-brand-message">
          <Sparkles size={24} />

          <h2>Pas d’inquiétude</h2>

          <p>
            Indiquez votre adresse e-mail pour retrouver
            l’accès à votre espace Glow Routine.
          </p>
        </section>
      </section>

      <section className="forgot-panel">
        <a className="forgot-back" href="/">
          <ArrowLeft size={18} />
          Retour à la connexion
        </a>

        <header className="forgot-header">
          <span>♡</span>

          <h2>
            Mot de passe oublié
            <Sparkles size={20} />
          </h2>

          <p>
            Saisissez l’adresse associée à votre compte
          </p>
        </header>

        <form className="forgot-form" onSubmit={handleSubmit}>
          <label>
            Adresse e-mail

            <span className="forgot-field">
              <Mail size={19} />

              <input
                type="email"
                value={email}
                placeholder="Ex : augusta@email.com"
                autoComplete="email"
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />
            </span>
          </label>

          {error && (
            <p className="forgot-feedback forgot-error">
              {error}
            </p>
          )}

          {message && (
            <p className="forgot-feedback forgot-success">
              {message}
            </p>
          )}

          <button
            className="forgot-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Envoi en cours..."
              : "Recevoir les instructions"}

            <Send size={18} />
          </button>

          <p className="forgot-login-link">
            Vous vous souvenez de votre mot de passe ?
            <a href="/">Se connecter</a>
          </p>
        </form>
      </section>
    </main>
  );
}

export default ForgotPassword;
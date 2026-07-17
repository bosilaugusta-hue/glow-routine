import {
  Eye,
  EyeOff,
  Globe2,
  LockKeyhole,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import collectionIcon from "../assets/icons/collection_bubble.png";
import favoriteIcon from "../assets/icons/favorite_bubble.png";
import morningIcon from "../assets/icons/morning_bubble.png";
import nightIcon from "../assets/icons/night_bubble.png";
import skincareTray from "../assets/images/skincare-tray.png";

import "./Login.css";

const features = [
  {
    title: "Ma Collection",
    description: "Organisez vos produits préférés",
    icon: collectionIcon,
    tone: "collection",
  },
  {
    title: "Favoris",
    description: "Vos coups de cœur skincare",
    icon: favoriteIcon,
    tone: "favorite",
  },
  {
    title: "Routine Matin",
    description: "Créez votre routine du matin",
    icon: morningIcon,
    tone: "morning",
  },
  {
    title: "Routine Soir",
    description: "Créez votre routine du soir",
    icon: nightIcon,
    tone: "night",
  },
];

type LoginResponse = {
  message: string;
  token?: string;
  user?: {
    id: number;
    firstName: string;
    email: string;
  };
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        },
      );

      const data = (await response.json()) as LoginResponse;

      if (!response.ok || !data.token || !data.user) {
        setMessage(data.message || "La connexion a échoué.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      window.location.assign("/dashboard");
    } catch (loginError) {
      console.error("Login error:", loginError);
      setMessage("Impossible de contacter le serveur.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-page">
      <button className="language-button" type="button">
        <Globe2 size={19} />
        <span>FR</span>
        <span aria-hidden="true">⌄</span>
      </button>

      <section className="login-showcase">
        <header className="login-brand">
          <h1>
            Glow <span className="brand-sparkle">✦</span>
            <br />
            Routine <span className="brand-heart">♡</span>
          </h1>

          <p>Mon journal skincare & self-care</p>
        </header>

        <section className="login-quote">
          <section className="login-quote-line" aria-hidden="true">
            <span />
            <i>✦</i>
            <span />
          </section>

          <p>
            Prenez soin de votre peau,
            <br />
            de votre bien-être et de vous,
          </p>

          <strong>chaque jour ♡</strong>
        </section>

        <img
          className="login-tray"
          src={skincareTray}
          alt="Plateau de produits skincare accompagné d’un bouquet de fleurs"
        />

        <section className="login-features">
          {features.map((feature) => (
            <article className="login-feature" key={feature.title}>
              <span className={`feature-icon ${feature.tone}`}>
                <img src={feature.icon} alt="" />
              </span>

              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </article>
          ))}
        </section>
      </section>

      <section className="login-panel">
        <header className="login-panel-header">
          <span className="welcome-icon">♡</span>

          <h2>
            Bienvenue
            <Sparkles size={22} />
          </h2>

          <p>Connectez-vous à votre espace</p>
        </header>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email ou nom d’utilisateur

            <span className="login-field">
              <UserRound size={20} />

              <input
                type="email"
                placeholder="Ex : augusta@email.com"
                value={email}
                autoComplete="email"
                required
                onChange={(event) => setEmail(event.target.value)}
              />

              <Sparkles size={17} />
            </span>
          </label>

          <label>
            Mot de passe

            <span className="login-field">
              <LockKeyhole size={20} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ex : ••••••••••••"
                value={password}
                autoComplete="current-password"
                required
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
                  setShowPassword(
                    (currentValue) => !currentValue,
                  )
                }
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </span>
          </label>

          <section className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) =>
                  setRememberMe(event.target.checked)
                }
              />

              <span>Se souvenir de moi</span>
            </label>

            <a
              className="forgot-password"
              href="/forgot-password"
            >
              Mot de passe oublié ?
            </a>
          </section>

          {message && (
            <p className="login-message">
              {message}
            </p>
          )}

          <button
            className="login-submit"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Connexion..." : "Se connecter"}
            <Sparkles size={18} />
          </button>

          <section className="login-separator">
            <span />
            <p>ou</p>
            <span />
          </section>

          <p className="register-question">
            Pas encore de compte ?
          </p>

          <a className="register-button" href="/register">
            <UserRound size={19} />
            Créer mon compte
          </a>
        </form>
      </section>
    </main>
  );
}

export default Login;
import {
  Bell,
  Globe2,
  LogOut,
  Moon,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import Sidebar from "../components/Sidebar";

import "./Settings.css";

function Settings() {
  const [firstName, setFirstName] = useState("Augusta");
  const [email, setEmail] = useState("augusta@email.com");
  const [language, setLanguage] = useState("fr");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState("");

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("Paramètres enregistrés avec succès.");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <main className="settings-page">
      <Sidebar />

      <section className="settings-main">
        <header className="settings-header">
          <h1>Paramètres ✦</h1>
          <p>Personnalisez votre espace Glow Routine</p>
        </header>

        <form className="settings-form" onSubmit={handleSave}>
          <section className="settings-card">
            <header className="settings-card-header">
              <span>
                <UserRound size={22} />
              </span>

              <section>
                <h2>Informations personnelles</h2>
                <p>Modifiez vos informations de profil</p>
              </section>
            </header>

            <section className="settings-fields">
              <label>
                Prénom

                <input
                  type="text"
                  value={firstName}
                  onChange={(event) =>
                    setFirstName(event.target.value)
                  }
                />
              </label>

              <label>
                Adresse e-mail

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                />
              </label>
            </section>
          </section>

          <section className="settings-card">
            <header className="settings-card-header">
              <span>
                <Globe2 size={22} />
              </span>

              <section>
                <h2>Langue</h2>
                <p>Choisissez la langue de l’application</p>
              </section>
            </header>

            <label>
              Langue de l’interface

              <select
                value={language}
                onChange={(event) =>
                  setLanguage(event.target.value)
                }
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </label>
          </section>

          <section className="settings-card">
            <header className="settings-card-header">
              <span>
                <Bell size={22} />
              </span>

              <section>
                <h2>Préférences</h2>
                <p>Gérez vos options d’utilisation</p>
              </section>
            </header>

            <label className="settings-switch">
              <section>
                <Bell size={19} />

                <span>
                  <strong>Notifications</strong>
                  <small>
                    Recevoir les rappels de votre routine
                  </small>
                </span>
              </section>

              <input
                type="checkbox"
                checked={notifications}
                onChange={(event) =>
                  setNotifications(event.target.checked)
                }
              />
            </label>

            <label className="settings-switch">
              <section>
                <Moon size={19} />

                <span>
                  <strong>Mode sombre</strong>
                  <small>
                    Activer une apparence plus sombre
                  </small>
                </span>
              </section>

              <input
                type="checkbox"
                checked={darkMode}
                onChange={(event) =>
                  setDarkMode(event.target.checked)
                }
              />
            </label>
          </section>

          <section className="settings-card">
            <header className="settings-card-header">
              <span>
                <ShieldCheck size={22} />
              </span>

              <section>
                <h2>Sécurité</h2>
                <p>Gérez votre session et votre compte</p>
              </section>
            </header>

            <button
              className="logout-button"
              type="button"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Se déconnecter
            </button>
          </section>

          {message && (
            <p className="settings-message">
              {message}
            </p>
          )}

          <button className="save-settings-button" type="submit">
            <Save size={18} />
            Enregistrer les modifications
          </button>
        </form>
      </section>
    </main>
  );
}

export default Settings;
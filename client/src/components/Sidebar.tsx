import {
  BarChart3,
  Heart,
  Home,
  Moon,
  Settings,
  Sun,
} from "lucide-react";

import "./Sidebar.css";

const menuItems = [
  {
    label: "Ma Collection",
    icon: Home,
    active: true,
  },
  {
    label: "Routine Matin",
    icon: Sun,
    active: false,
  },
  {
    label: "Routine Soir",
    icon: Moon,
    active: false,
  },
  {
    label: "Favoris",
    icon: Heart,
    active: false,
  },
  {
    label: "Statistiques",
    icon: BarChart3,
    active: false,
  },
  {
    label: "Paramètres",
    icon: Settings,
    active: false,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <header className="sidebar-brand">
        <h2>
          Glow <span>✦</span>
          <br />
          Routine <span>♡</span>
        </h2>

        <p>Mon journal skincare & self-care</p>
      </header>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label}>
                <button
                  className={`sidebar-link ${item.active ? "active" : ""}`}
                  type="button"
                >
                  <Icon size={25} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <section className="sidebar-profile">
        <span className="profile-avatar">A</span>

        <section>
          <h3>Augusta ✦</h3>
          <p>Prenez soin de vous</p>
          <span>♥</span>
        </section>
      </section>
    </aside>
  );
}

export default Sidebar;
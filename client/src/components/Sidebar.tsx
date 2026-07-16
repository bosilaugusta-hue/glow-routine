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
    path: "/dashboard",
  },
  {
    label: "Routine Matin",
    icon: Sun,
    path: "/routine-matin",
  },
  {
    label: "Routine Soir",
    icon: Moon,
    path: "/routine-soir",
  },
  {
    label: "Favoris",
    icon: Heart,
    path: "/favoris",
  },
  {
    label: "Statistiques",
    icon: BarChart3,
    path: "/statistiques",
  },
  {
    label: "Paramètres",
    icon: Settings,
    path: "/parametres",
  },
];

function Sidebar() {
  const currentPath = window.location.pathname;

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

      <nav className="sidebar-nav" aria-label="Navigation principale">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;

            return (
              <li key={item.path}>
                <a
                  className={
                    isActive
                      ? "sidebar-link active"
                      : "sidebar-link"
                  }
                  href={item.path}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={25} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </a>
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
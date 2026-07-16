import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Statistics from "./pages/Statistics";

import "./App.css";

function App() {
  const currentPath = window.location.pathname;
  const token = localStorage.getItem("token");

  if (currentPath === "/register") {
    return <Register />;
  }

  if (currentPath === "/forgot-password") {
    return <ForgotPassword />;
  }

  if (currentPath === "/" && !token) {
    return <Login />;
  }

  if (!token) {
    return <Login />;
  }

  if (
    currentPath === "/" ||
    currentPath === "/dashboard"
  ) {
    return <Dashboard view="collection" />;
  }

  if (currentPath === "/routine-matin") {
    return <Dashboard view="morning" />;
  }

  if (currentPath === "/routine-soir") {
    return <Dashboard view="night" />;
  }

  if (currentPath === "/favoris") {
    return <Dashboard view="favorites" />;
  }

  if (currentPath === "/statistiques") {
    return <Statistics />;
  }

  if (currentPath === "/parametres") {
    return <Settings />;
  }

  return <NotFound />;
}

export default App;
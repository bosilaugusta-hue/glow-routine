import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import "./App.css";

function App() {
  const currentPath = window.location.pathname;
  const token = localStorage.getItem("token");

  if (!token) {
    return <Login />;
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

  return <Dashboard view="collection" />;
}

export default App;
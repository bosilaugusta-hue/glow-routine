import DashboardHeader from "../components/DashboardHeader";
import ProductForm from "../components/ProductForm";
import ProductGrid from "../components/ProductGrid";
import Sidebar from "../components/Sidebar";
import StatsCards from "../components/StatsCards";

function Dashboard() {
  return (
    <main className="dashboard">
      <Sidebar />

      <section className="dashboard-main">
        <DashboardHeader />

        <section className="dashboard-layout">
          <section className="dashboard-center">
            <StatsCards />
            <ProductGrid />
          </section>

          <ProductForm />
        </section>
      </section>
    </main>
  );
}

export default Dashboard;
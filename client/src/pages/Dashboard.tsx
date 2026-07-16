import DashboardHeader from "../components/DashboardHeader";
import ProductForm from "../components/ProductForm";
import ProductGrid, {
  type ProductView,
} from "../components/ProductGrid";
import Sidebar from "../components/Sidebar";
import StatsCards from "../components/StatsCards";

import "./Dashboard.css";

type DashboardProps = {
  view?: ProductView;
};

function Dashboard({
  view = "collection",
}: DashboardProps) {
  return (
    <main className="dashboard">
      <Sidebar />

      <section className="dashboard-main">
        <DashboardHeader />

        <section className="dashboard-layout">
          <section className="dashboard-center">
            <StatsCards />
            <ProductGrid view={view} />
          </section>

          <ProductForm />
        </section>
      </section>
    </main>
  );
}

export default Dashboard;
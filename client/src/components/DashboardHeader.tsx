import skincareBanner from "../assets/images/skincare-banner.png";

function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <section>
        <h1>
          Bonjour, <span>Augusta</span> ♡
        </h1>

        <p>Prenez soin de vous aujourd’hui ✦</p>
      </section>

      <img
        className="dashboard-banner"
        src={skincareBanner}
        alt="Produits skincare et fleurs roses"
      />
    </header>
  );
}

export default DashboardHeader;
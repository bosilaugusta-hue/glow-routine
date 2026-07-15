import collectionIcon from "../assets/icons/collection.png";
import favoriteIcon from "../assets/icons/favorite.png";
import morningIcon from "../assets/icons/morning.png";
import nightIcon from "../assets/icons/night.png";

const stats = [
  {
    value: 24,
    label: "Produits",
    description: "dans ma collection",
    icon: collectionIcon,
  },
  {
    value: 8,
    label: "Favoris",
    description: "coups de cœur",
    icon: favoriteIcon,
  },
  {
    value: 12,
    label: "Routine Matin",
    description: "produits",
    icon: morningIcon,
  },
  {
    value: 12,
    label: "Routine Soir",
    description: "produits",
    icon: nightIcon,
  },
];

function StatsCards() {
  return (
    <section className="stats">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <span className="stat-icon-box">
            <img className="stat-icon" src={stat.icon} alt="" />
          </span>

          <section className="stat-content">
            <h2>{stat.value}</h2>
            <p>{stat.label}</p>
            <small>{stat.description}</small>
          </section>
        </article>
      ))}
    </section>
  );
}

export default StatsCards;
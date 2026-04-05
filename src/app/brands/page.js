import styles from "./page.module.css";
import Link from "next/link";

export const metadata = {
  title: "Brands | Sterly",
  description: "Discover the world's finest jewellery brands, curated exclusively by Sterly.",
};

const brands = [
  {
    name: "Aurum Atelier",
    origin: "Geneva, Switzerland",
    specialty: "18K Solid Gold",
    tag: "Legacy",
    desc: "Founded in 1892, Aurum Atelier has been at the forefront of Swiss high jewellery for over a century. Their signature oxidised gold textures are instantly recognisable.",
  },
  {
    name: "Maison Eclat",
    origin: "Paris, France",
    specialty: "Diamond Cutting",
    tag: "Iconic",
    desc: "A Parisian house celebrated for revolutionary facet geometries. Maison Eclat diamonds catch light in ways never seen before — a result of three generations of diamond expertise.",
  },
  {
    name: "Riva Gioielli",
    origin: "Florence, Italy",
    specialty: "Pearl & Coral",
    tag: "Artisan",
    desc: "A family-run Florentine atelier that has preserved Renaissance jewellery techniques. Every Riva piece is a wearable work of art, hand-carved and hand-polished.",
  },
  {
    name: "Noor & Co.",
    origin: "Jaipur, India",
    specialty: "Kundan & Enamel",
    tag: "Heritage",
    desc: "Celebrating the rich Rajput jewellery heritage with contemporary wearability. Noor & Co. fuses centuries-old Kundan settings with modern silhouettes.",
  },
  {
    name: "Frost & Lux",
    origin: "Stockholm, Sweden",
    specialty: "Minimalist Gold",
    tag: "Modern",
    desc: "Scandinavian precision meets luxury materials. Frost & Lux are known for their architectural forms and negative space — jewellery as sculpture.",
  },
  {
    name: "Caldera Studio",
    origin: "Tokyo, Japan",
    specialty: "Titanium & Gold",
    tag: "Avant-garde",
    desc: "Pushing the boundaries of what jewellery can be. Caldera Studio blends aerospace-grade titanium with 24K gold plating for impossibly lightweight, futuristic adornments.",
  },
];

export default function BrandsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>CURATED HOUSES</p>
        <h1 className={styles.title}>
          The <span className="font-accent text-gold">Brands</span>
        </h1>
        <p className={styles.subtitle}>
          We partner exclusively with the world's finest ateliers — each selected
          for their uncompromising craft and unique heritage.
        </p>
      </header>

      <div className={styles.brandsGrid}>
        {brands.map((brand) => (
          <div key={brand.name} className={styles.brandCard}>
            <div className={styles.brandLogo}>
              <span className={styles.logoInitial}>{brand.name[0]}</span>
            </div>
            <div className={styles.brandInfo}>
              <div className={styles.brandMeta}>
                <span className={styles.brandTag}>{brand.tag}</span>
                <span className={styles.brandOrigin}>{brand.origin}</span>
              </div>
              <h2 className={styles.brandName}>{brand.name}</h2>
              <p className={styles.brandSpecialty}>{brand.specialty}</p>
              <p className={styles.brandDesc}>{brand.desc}</p>
              <Link href="/products" className={styles.shopLink}>
                VIEW PIECES →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

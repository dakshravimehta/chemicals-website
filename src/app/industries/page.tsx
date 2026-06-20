import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader/PageHeader";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./page.module.css";

export const metadata = {
  title: "Industries | Aurelis Chemicals",
  description:
    "Solvents, polymers and specialty chemicals for pharmaceuticals, personal care, coatings, water treatment, food, and agriculture.",
};

const industries = [
  {
    id: "pharmaceuticals",
    name: "Pharmaceuticals",
    img: "/images/ind_pharma.png",
    description:
      "High-purity solvents, APIs and excipients that clear stringent regulatory standards for global pharmaceutical manufacturing.",
    keyProducts: ["Isopropyl Alcohol", "Methylene Chloride", "Acetone", "Toluene"],
  },
  {
    id: "personal-care",
    name: "Personal Care & Cosmetics",
    img: "/images/ind_personal_care.png",
    description:
      "Surfactants, emollients and specialty chemicals for premium skincare, haircare and cosmetic formulations.",
    keyProducts: ["SLES / SLS", "Cetyl Alcohol", "Glycerin", "Propylene Glycol"],
  },
  {
    id: "coatings",
    name: "Paints, Coatings & Inks",
    img: "/images/ind_coatings.png",
    description:
      "Solvents, resins and additives that improve durability, color retention and application across coatings and inks.",
    keyProducts: ["Butyl Acetate", "Titanium Dioxide", "Xylene", "Ethyl Acetate"],
  },
  {
    id: "water-treatment",
    name: "Water Treatment",
    img: "/images/ind_water.png",
    description:
      "Coagulants, flocculants and disinfectants for clean, compliant water processing at industrial and municipal scale.",
    keyProducts: ["Poly Aluminium Chloride", "Sodium Hypochlorite", "Caustic Soda"],
  },
  {
    id: "food-beverage",
    name: "Food & Beverage",
    img: "/images/ind_food.png",
    description:
      "Food-grade ingredients, acidulants and preservatives for quality, safety and shelf-life in the nutrition sector.",
    keyProducts: ["Citric Acid", "Ascorbic Acid", "Sodium Benzoate"],
  },
  {
    id: "agriculture",
    name: "Agriculture & Agrochemicals",
    img: "/images/ind_agri.png",
    description:
      "Raw materials for fertilizers, pesticides and herbicides supporting global agricultural productivity.",
    keyProducts: ["Ammonium Sulfate", "Phosphoric Acid", "Potassium Nitrate"],
  },
];

export default function Industries() {
  return (
    <div>
      <PageHeader
        eyebrow="Industries"
        title="Where our chemistry goes to work."
        subtitle="We meet the technical and regulatory demands of each sector with an agile supply chain and a catalog built for industrial scale."
      />

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {industries.map((ind, i) => (
              <Reveal as="article" key={ind.id} className={styles.card} delay={(i % 2) * 80}>
                <div className={styles.imageWrap}>
                  <img src={ind.img} alt={ind.name} className={styles.image} />
                  <div className={styles.veil} />
                  <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                  <h2 className={styles.name}>{ind.name}</h2>
                </div>
                <div className={styles.body}>
                  <p className={styles.desc}>{ind.description}</p>
                  <p className={styles.kpLabel}>Key products</p>
                  <ul className={styles.kpList}>
                    {ind.keyProducts.map((p) => (
                      <li key={p} className={styles.kp}>{p}</li>
                    ))}
                  </ul>
                  <Link href="/products" className={styles.explore}>
                    Explore products <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className={styles.closing}>
        <div className={`container ${styles.closingInner}`}>
          <p className="eyebrow eyebrow--on-dark">Don&apos;t see your sector?</p>
          <h2 className={styles.closingTitle}>
            With 287+ products in stock, we likely supply it anyway.
          </h2>
          <p className={styles.closingText}>
            Our sourcing network reaches well beyond this list. Tell us the application and
            we&apos;ll point you to the right grade.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Speak with an expert <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

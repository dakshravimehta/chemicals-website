import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Droplets,
  Layers,
  FlaskConical,
  TestTube,
  Truck,
  Boxes,
  ShieldCheck,
  Globe,
} from "lucide-react";
import Reveal from "@/components/Reveal/Reveal";
import productsData from "@/data/products.json";
import styles from "./page.module.css";

const productCount = productsData.length;

const metrics = [
  { value: `${productCount}+`, label: "Products in catalog" },
  { value: "40+", label: "Markets served" },
  { value: "24h", label: "Quote turnaround" },
  { value: "100%", label: "Spec-compliant supply" },
];

const categories = [
  {
    icon: Droplets,
    name: "Solvents & Alcohols",
    desc: "Acetone, IPA, MEK, toluene, glycols and more, in drums to ISO tanks.",
  },
  {
    icon: Layers,
    name: "Polymers & Resins",
    desc: "PVC, PET, EVA and engineering resins for processors and compounders.",
  },
  {
    icon: FlaskConical,
    name: "Specialty & Fine Chemicals",
    desc: "Performance additives, intermediates and reagents for formulators.",
  },
  {
    icon: TestTube,
    name: "Acids & Intermediates",
    desc: "Organic and inorganic acids and building blocks for synthesis.",
  },
  {
    icon: FlaskConical,
    name: "Polyurethanes",
    desc: "TDI, MDI and polyols for rigid/flexible foams and coatings.",
  },
];

const capabilities = [
  {
    icon: Globe,
    title: "Sourcing without the lag",
    body: "A live network of vetted producers across Asia, the Gulf and Europe means we source fast and quote inside a day, not a week.",
  },
  {
    icon: Boxes,
    title: "Packaged to your line",
    body: "Drums, IBCs, ISO tanks, bulk bags, full or part loads. We supply in the format your process actually runs on.",
  },
  {
    icon: Truck,
    title: "Logistics, handled",
    body: "Hazardous and non-hazardous freight, documentation and customs coordinated end to end, port to plant.",
  },
  {
    icon: ShieldCheck,
    title: "Documented and compliant",
    body: "SDS, CoA and regulatory paperwork supplied up front, so QA signs off without chasing.",
  },
];

const industries = [
  { name: "Pharmaceuticals", img: "/images/ind_pharma.png" },
  { name: "Personal Care", img: "/images/ind_personal_care.png" },
  { name: "Paints & Coatings", img: "/images/ind_coatings.png" },
  { name: "Water Treatment", img: "/images/ind_water.png" },
  { name: "Agriculture", img: "/images/ind_agri.png" },
  { name: "Food & Nutrition", img: "/images/ind_food.png" },
];

export default function Home() {
  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={`eyebrow eyebrow--on-dark ${styles.heroEyebrow}`}>
              Global bulk chemical distribution
            </p>
            <h1 className={styles.heroTitle}>
              Bulk chemicals,
              <br />
              supplied without<br />
              the <span className={styles.heroAccent}>lag</span>.
            </h1>
            <p className={styles.heroLead}>
              Aurelis sources and ships solvents, polymers and specialty chemicals to
              industrial buyers worldwide, with the speed a modern supply chain should
              have.
            </p>
            <div className={styles.heroActions}>
              <Link href="/products" className="btn btn-primary">
                Explore the catalog <ArrowUpRight size={16} />
              </Link>
              <Link href="/contact" className="btn btn-on-dark">
                Request a quote
              </Link>
            </div>
            <ul className={styles.heroSpec}>
              <li>
                <span className={styles.heroSpecNum}>{productCount}+</span> products
              </li>
              <li>
                <span className={styles.heroSpecNum}>40+</span> markets
              </li>
              <li>
                <span className={styles.heroSpecNum}>Drum</span> to ISO-tank
              </li>
            </ul>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroFrame}>
              <Image
                src="/images/hero_bg.png"
                alt="Industrial chemical storage and process infrastructure"
                fill
                className={styles.heroImg}
                priority
              />
              <div className={styles.heroFrameTag}>
                <span>SUPPLY · 001</span>
                <span>EST. WORLDWIDE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Metrics band ---------- */}
      <section className={styles.metrics}>
        <div className={`container ${styles.metricsRow}`}>
          {metrics.map((m) => (
            <div key={m.label} className={styles.metricCell}>
              <div className={styles.metricValue}>{m.value}</div>
              <div className={styles.metricLabel}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- What we supply ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className={styles.blockHead}>
            <div>
              <p className="eyebrow">01 / What we supply</p>
              <h2 className={styles.blockTitle}>
                Five core lines, one organized catalog.
              </h2>
            </div>
            <p className={styles.blockIntro}>
              The full range of industrial chemistry, grouped so procurement teams find
              the right grade fast, not buried in an endless list.
            </p>
          </Reveal>

          <div className={styles.catList}>
            {categories.map((c, i) => (
              <Reveal as="article" key={c.name} className={styles.catRow} delay={i * 70}>
                <span className={styles.catIndex}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.catIcon}>
                  <c.icon size={22} strokeWidth={1.6} />
                </span>
                <div className={styles.catBody}>
                  <h3 className={styles.catName}>{c.name}</h3>
                  <p className={styles.catDesc}>{c.desc}</p>
                </div>
                <Link href="/products" className={styles.catLink} aria-label={`Browse ${c.name}`}>
                  Browse <ArrowRight size={16} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Capabilities ---------- */}
      <section className={styles.capSection}>
        <div className="container">
          <Reveal className={styles.blockHead}>
            <div>
              <p className="eyebrow eyebrow--on-dark">02 / Why Aurelis</p>
              <h2 className={`${styles.blockTitle} ${styles.onDark}`}>
                Built to move faster than the industry expects.
              </h2>
            </div>
            <p className={`${styles.blockIntro} ${styles.onDarkMuted}`}>
              We are the newer name on the supplier list, and we earn the order by being
              quicker, clearer and easier to work with than the incumbents.
            </p>
          </Reveal>

          <div className={styles.capGrid}>
            {capabilities.map((cap, i) => (
              <Reveal as="article" key={cap.title} className={styles.capCard} delay={i * 70}>
                <span className={styles.capIcon}>
                  <cap.icon size={24} strokeWidth={1.6} />
                </span>
                <h3 className={styles.capTitle}>{cap.title}</h3>
                <p className={styles.capBody}>{cap.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Operation / about preview ---------- */}
      <section className="section">
        <div className={`container ${styles.opGrid}`}>
          <Reveal className={styles.opVisual}>
            <Image
              src="/images/about_facility.png"
              alt="Aurelis Chemicals warehousing and distribution facility"
              fill
              className={styles.opImg}
            />
          </Reveal>
          <Reveal className={styles.opCopy} delay={80}>
            <p className="eyebrow">03 / The operation</p>
            <h2 className={styles.blockTitle}>
              A traditional trade, run on modern infrastructure.
            </h2>
            <p className={styles.opText}>
              Chemical distribution has long been slow and opaque. Aurelis was built to
              change that: a lean operation backed by a deep producer network, real-time
              stock visibility and logistics that move on your timeline.
            </p>
            <p className={styles.opText}>
              The result is a supplier that behaves less like a broker and more like an
              extension of your procurement team.
            </p>
            <Link href="/about" className="btn btn-outline">
              More about Aurelis <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Industries ---------- */}
      <section className={styles.indSection}>
        <div className="container">
          <Reveal className={styles.blockHead}>
            <div>
              <p className="eyebrow">04 / Industries</p>
              <h2 className={styles.blockTitle}>Where our chemistry goes to work.</h2>
            </div>
            <Link href="/industries" className={styles.viewAll}>
              All industries <ArrowRight size={16} />
            </Link>
          </Reveal>

          <div className={styles.indGrid}>
            {industries.map((ind, i) => (
              <Reveal as="div" key={ind.name} delay={i * 50}>
                <Link href="/industries" className={styles.indCard}>
                  <Image src={ind.img} alt={ind.name} fill className={styles.indImg} />
                  <div className={styles.indVeil} />
                  <span className={styles.indNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.indName}>
                    {ind.name}
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Target, Eye, ShieldCheck, Zap, Truck, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader/PageHeader";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./page.module.css";

export const metadata = {
  title: "About | Aurelis Chemicals",
  description:
    "Aurelis Chemicals is a modern bulk chemical distributor: agile sourcing, reliable supply, and documentation done right.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Quality, documented",
    body: "Every shipment ships with SDS and CoA, tested against spec and international standards before it leaves.",
  },
  {
    icon: Zap,
    title: "Agility as standard",
    body: "Modern logistics and live market intelligence let us re-route and re-quote in hours, not weeks.",
  },
  {
    icon: Truck,
    title: "Supply you can plan around",
    body: "A deep producer network across Asia, the Gulf and Europe keeps stock moving and lead times honest.",
  },
];

export default function About() {
  return (
    <div>
      <PageHeader
        eyebrow="About Aurelis"
        title="A modern operation in a traditional trade."
        subtitle="Chemical distribution has long been slow and opaque. Aurelis was built to run it differently: lean, fast, and straight with its buyers."
      />

      {/* Who we are */}
      <section className="section">
        <div className={`container ${styles.introGrid}`}>
          <Reveal className={styles.introCopy}>
            <div style={{ marginBottom: "2.5rem" }}>
              <Image 
                src="/images/logo.png" 
                alt="Aurelis Chemicals Full Logo" 
                width={280} 
                height={280} 
                style={{ objectFit: "contain", height: "auto", maxWidth: "100%" }} 
              />
            </div>
            <p className="eyebrow">01 / Who we are</p>
            <h2 className={styles.h2}>
              Built for buyers who can&apos;t wait on a slow supply chain.
            </h2>
            <div className={styles.prose}>
              <p>
                Aurelis Chemicals supplies the bulk trade and distribution of solvents,
                polymers and specialty chemicals to industrial buyers worldwide. We pair a
                deep global sourcing network with agile logistics to keep material moving.
              </p>
              <p>
                Our infrastructure lets us import, stock and distribute premium raw
                materials efficiently, so partners across 40+ markets get the grade they
                ordered, on the schedule they need.
              </p>
              <p>
                We behave less like a broker and more like an extension of your procurement
                team: quicker to answer, clearer on documentation, easier to plan around.
              </p>
            </div>
          </Reveal>
          <Reveal className={styles.introVisual} delay={80}>
            <img
              src="/images/about_facility.png"
              alt="Aurelis Chemicals warehousing and distribution facility"
              className={styles.introImg}
            />
            <div className={styles.introTag}>
              <span>OPERATION</span>
              <span>MUMBAI · WORLDWIDE</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.mvSection}>
        <div className={`container ${styles.mvGrid}`}>
          <Reveal as="article" className={styles.mvCard}>
            <span className={styles.mvIcon}>
              <Target size={26} strokeWidth={1.6} />
            </span>
            <p className="eyebrow eyebrow--on-dark">Mission</p>
            <h3 className={styles.mvTitle}>
              Redefine reliability in the chemical supply chain.
            </h3>
            <p className={styles.mvBody}>
              Modern, agile procurement and uncompromising quality assurance, delivered
              with service that treats every order as if our name is on the drum.
            </p>
          </Reveal>
          <Reveal as="article" className={styles.mvCard} delay={90}>
            <span className={styles.mvIcon}>
              <Eye size={26} strokeWidth={1.6} />
            </span>
            <p className="eyebrow eyebrow--on-dark">Vision</p>
            <h3 className={styles.mvTitle}>
              Become the distributor industrial buyers reach for first.
            </h3>
            <p className={styles.mvBody}>
              The most dynamic and dependable name on the supplier list, giving global
              manufacturers exactly the chemistry they need to keep producing.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">02 / What we stand on</p>
            <h2 className={styles.h2}>Three commitments behind every order.</h2>
          </Reveal>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <Reveal as="article" key={v.title} className={styles.valueItem} delay={i * 80}>
                <span className={styles.valueIcon}>
                  <v.icon size={28} strokeWidth={1.6} />
                </span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueBody}>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing link */}
      <section className={styles.closing}>
        <div className={`container ${styles.closingRow}`}>
          <h2 className={styles.closingTitle}>See what we keep in stock.</h2>
          <Link href="/products" className="btn btn-primary">
            Browse the catalog <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

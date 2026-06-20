"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const industries = [
  {
    id: 'pharmaceuticals',
    name: 'Pharmaceuticals',
    img: '/images/ind_pharma.png',
    description: 'We supply high-purity solvents, active pharmaceutical ingredients (APIs), and excipients that meet stringent regulatory standards for global pharmaceutical manufacturing.',
    keyProducts: ['Isopropyl Alcohol (IPA)', 'Methylene Chloride', 'Acetone', 'Toluene']
  },
  {
    id: 'personal-care',
    name: 'Personal Care & Cosmetics',
    img: '/images/ind_personal_care.png',
    description: 'Providing a wide range of surfactants, emollients, and specialty chemicals essential for formulating premium skincare, haircare, and cosmetic products.',
    keyProducts: ['SLES / SLS', 'Cetyl Alcohol', 'Glycerin', 'Propylene Glycol']
  },
  {
    id: 'coatings',
    name: 'Paints, Coatings & Inks',
    img: '/images/ind_coatings.png',
    description: 'Offering an extensive portfolio of solvents, resins, and additives that enhance durability, color retention, and application properties of coatings and inks.',
    keyProducts: ['Butyl Acetate', 'Titanium Dioxide', 'Xylene', 'Ethyl Acetate']
  },
  {
    id: 'water-treatment',
    name: 'Water Treatment',
    img: '/images/ind_water.png',
    description: 'Delivering effective coagulants, flocculants, and disinfectants to ensure clean, safe, and compliant water processing for industrial and municipal facilities.',
    keyProducts: ['Poly Aluminium Chloride (PAC)', 'Sodium Hypochlorite', 'Caustic Soda']
  },
  {
    id: 'food-beverage',
    name: 'Food & Beverage',
    img: '/images/ind_food.png',
    description: 'Sourcing food-grade ingredients, acidulants, and preservatives that guarantee quality, safety, and shelf-life extension for the food and nutrition sector.',
    keyProducts: ['Citric Acid', 'Ascorbic Acid', 'Sodium Benzoate']
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Agrochemicals',
    img: '/images/ind_agri.png',
    description: 'Supplying raw materials for the production of fertilizers, pesticides, and herbicides to support global agricultural productivity and sustainability.',
    keyProducts: ['Ammonium Sulfate', 'Phosphoric Acid', 'Potassium Nitrate']
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Industries() {
  return (
    <div className={styles.industriesPage}>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className={styles.headerBackground}></div>
        <div className={`container ${styles.headerContent}`}>
          <motion.h1 
            className={styles.pageTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Industries We Serve
          </motion.h1>
          <motion.p 
            className={styles.pageSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tailored chemical solutions for diverse global sectors
          </motion.p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className={`section ${styles.contentSection}`}>
        <div className="container">
          <motion.div 
            className={styles.introText}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p>
              Aurelis Chemicals leverages modern infrastructure to understand and meet the unique challenges of each industry. Our agile supply chain and extensive product portfolio ensure that we can rapidly meet the specific technical and regulatory requirements of your sector.
            </p>
          </motion.div>

          <motion.div 
            className={styles.grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {industries.map((industry) => (
              <motion.div key={industry.id} variants={fadeUp} className={styles.card} id={industry.id}>
                <div className={styles.cardImageWrapper}>
                  <img src={industry.img} alt={industry.name} className={styles.cardImage} />
                  <div className={styles.cardImageOverlay}>
                    <h2 className={styles.industryName}>{industry.name}</h2>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.description}>{industry.description}</p>
                  
                  <div className={styles.productsSection}>
                    <h3 className={styles.productsTitle}>Key Products:</h3>
                    <ul className={styles.productsList}>
                      {industry.keyProducts.map((product, idx) => (
                        <li key={idx}>{product}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href={`/products?category=${encodeURIComponent(industry.name)}`} className={styles.exploreLink}>
                    Explore Products <ArrowRight size={16} className={styles.exploreIcon} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${styles.ctaSection}`}>
        <motion.div 
          className={`container ${styles.ctaContainer}`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.ctaGlass}>
            <h2 className={styles.ctaTitle}>Don&apos;t see your industry?</h2>
            <p className={styles.ctaText}>
              We likely still have the chemicals you need. Our agile sourcing network includes over 300 products serving countless niche applications globally.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Speak with an Expert
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

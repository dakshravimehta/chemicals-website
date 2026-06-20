"use client";

import Link from 'next/link';
import { ArrowRight, Globe, Award, Users, Droplets, Target, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <img src="/images/hero_bg.png" alt="Premium abstract molecular background" className={styles.heroBgImage} />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContentContainer}`}>
          <motion.div 
            className={styles.heroGlassCard}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeIn} className={styles.heroBadge}>
              Next-Generation Global Distributor
            </motion.span>
            <motion.h1 variants={fadeIn} className={styles.heroTitle}>
              Powering Industries with<br/>
              <span className="text-gold">Modern Agility</span>
            </motion.h1>
            <motion.p variants={fadeIn} className={styles.heroDescription}>
              Aurelis Chemicals is your innovative new partner for the bulk trade and distribution of solvents, polymers, and specialty chemicals globally. We bring a fresh, agile approach to a traditional industry.
            </motion.p>
            <motion.div variants={fadeIn} className={styles.heroActions}>
              <Link href="/products" className="btn btn-primary">
                Explore Our Catalog
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Request a Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={`section ${styles.statsSection}`}>
        <div className="container">
          <motion.div 
            className={styles.statsGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { icon: Globe, num: "40+", label: "Target Markets" },
              { icon: Droplets, num: "300+", label: "Premium Products" },
              { icon: ShieldCheck, num: "100%", label: "Quality Compliant" },
              { icon: Target, num: "24/7", label: "Agile Sourcing" },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeIn} className={styles.statCard}>
                <div className={styles.statIconWrapper}>
                  <stat.icon size={32} className={styles.statIcon} />
                </div>
                <h3 className={styles.statNumber}>{stat.num}</h3>
                <p className={styles.statLabel}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className={`section ${styles.aboutPreview}`}>
        <div className={`container ${styles.aboutGrid}`}>
          <motion.div 
            className={styles.aboutContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className={styles.sectionTitle}>A New Era of Reliability</h2>
            <p className={styles.aboutText}>
              Aurelis Chemicals was founded with a single, clear vision: to modernize the chemical distribution landscape. In a fast-moving world, traditional supply chains can be slow. We leverage agile methodologies, global networks, and deep market intelligence to ensure you get what you need, exactly when you need it.
            </p>
            <p className={styles.aboutText}>
              Whether it&apos;s bulk solvents or rare specialty polymers, our dynamic infrastructure allows us to import and stock products efficiently, passing cost savings directly to our partners.
            </p>
            <Link href="/about" className={`btn btn-outline ${styles.aboutBtn}`}>
              Learn More About Us <ArrowRight size={16} />
            </Link>
          </motion.div>
          
          <motion.div 
            className={styles.aboutImageWrapper}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img src="/images/about_facility.png" alt="Aurelis Chemicals Premium Facility" className={styles.aboutImg} />
          </motion.div>
        </div>
      </section>

      {/* Industries Preview - Redesigned to use Images */}
      <section className={`section ${styles.industriesPreview}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Industries We Serve</h2>
            <Link href="/industries" className={styles.viewAllLink}>
              View All Industries <ArrowRight size={16} />
            </Link>
          </div>
          <motion.div 
            className={styles.industriesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { name: 'Pharmaceuticals', img: '/images/ind_pharma.png' },
              { name: 'Personal Care', img: '/images/ind_personal_care.png' },
              { name: 'Paints & Coatings', img: '/images/ind_coatings.png' },
              { name: 'Water Treatment', img: '/images/ind_water.png' },
            ].map((industry, idx) => (
              <motion.div key={idx} variants={fadeIn}>
                <Link href="/industries" className={styles.industryImageCard}>
                  <div className={styles.industryImageWrapper}>
                    <img src={industry.img} alt={industry.name} className={styles.industryPreviewImg} />
                  </div>
                  <div className={styles.industryOverlay}>
                    <h3 className={styles.industryImageName}>{industry.name}</h3>
                    <div className={styles.industryImageArrow}>
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`section ${styles.ctaSection}`}>
        <div className={styles.ctaOverlay}></div>
        <motion.div 
          className={`container ${styles.ctaContainer}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="glass-dark" style={{ padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
            <h2 className={styles.ctaTitle}>Ready to Source Premium Chemicals?</h2>
            <p className={styles.ctaText}>
              Connect with our experts today to discuss your requirements, request samples, or get a competitive quote.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn btn-secondary">Contact Our Team</Link>
              <Link href="/products" className="btn btn-outline" style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}>
                Browse Catalog
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

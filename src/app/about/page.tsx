"use client";

import Link from 'next/link';
import { Target, Eye, ShieldCheck, Truck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function About() {
  return (
    <div className={styles.aboutPage}>
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
            About Aurelis Chemicals
          </motion.h1>
          <motion.p 
            className={styles.pageSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A New Era in Modern Chemical Distribution
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section">
        <div className={`container ${styles.introGrid}`}>
          <motion.div 
            className={styles.introContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className={styles.sectionTitle}>Who We Are</h2>
            <div className={styles.introText}>
              <p>
                Aurelis Chemicals is a visionary new enterprise built for the modern era of chemical distribution. We recognized that the traditional supply chain was too slow and inflexible for today&apos;s fast-paced industries. 
              </p>
              <p>
                By combining deep market intelligence, robust global sourcing networks, and agile logistics, we provide comprehensive solutions for the bulk trade and distribution of chemicals, solvents, polymers, and specialty chemicals.
              </p>
              <p>
                Our modern infrastructure enables us to efficiently import, stock, and distribute premium raw materials, ensuring that our partners across 40+ countries receive uncompromising quality exactly when they need it.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className={styles.introImageWrapper}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="/images/about_facility.png" alt="Aurelis Chemicals Corporate Facility" className={styles.aboutImg} />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`section ${styles.missionSection}`}>
        <div className="container">
          <motion.div 
            className={styles.missionGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className={styles.missionCard}>
              <div className={styles.iconWrapper}>
                <Target size={36} />
              </div>
              <h3 className={styles.cardTitle}>Our Mission</h3>
              <p className={styles.cardText}>
                To redefine reliability in the chemical supply chain through modern, agile procurement, uncompromising quality assurance, and exceptional customer service.
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className={styles.missionCard}>
              <div className={styles.iconWrapper}>
                <Eye size={36} />
              </div>
              <h3 className={styles.cardTitle}>Our Vision</h3>
              <p className={styles.cardText}>
                To become the industry&apos;s most dynamic and innovative distributor, empowering global manufacturers with the exact chemical solutions they need to thrive.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container">
          <motion.h2 
            className={`${styles.sectionTitle} text-center`} 
            style={{marginBottom: 'var(--space-xl)'}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h2>
          
          <motion.div 
            className={styles.valuesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className={styles.valueItem}>
              <div className={styles.valueIconWrapper}>
                <ShieldCheck size={40} className={styles.valueIcon} />
              </div>
              <h3 className={styles.valueTitle}>Uncompromising Quality</h3>
              <p className={styles.valueText}>
                Rigorous testing and compliance with international standards for all our products.
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className={styles.valueItem}>
              <div className={styles.valueIconWrapper}>
                <Zap size={40} className={styles.valueIcon} />
              </div>
              <h3 className={styles.valueTitle}>Agility & Innovation</h3>
              <p className={styles.valueText}>
                Leveraging modern logistics and real-time market insights to adapt quickly to your needs.
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className={styles.valueItem}>
              <div className={styles.valueIconWrapper}>
                <Truck size={40} className={styles.valueIcon} />
              </div>
              <h3 className={styles.valueTitle}>Reliable Supply</h3>
              <p className={styles.valueText}>
                A robust global network ensuring uninterrupted supply and timely delivery worldwide.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <motion.div 
          className="container text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-dark" style={{ padding: 'var(--space-2xl) var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
            <h2 className={styles.ctaTitle}>Partner With Us Today</h2>
            <p className={styles.ctaText}>
              Experience the new standard of premium, agile chemical distribution.
            </p>
            <Link href="/contact" className="btn btn-secondary">
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

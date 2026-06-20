import Link from 'next/link';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerSection}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Aurelis</span>
            <span className={styles.logoSubtext}>Chemicals</span>
          </div>
          <p className={styles.aboutText}>
            Aurelis Chemicals is a leading global distributor of bulk chemicals, solvents, polymers, and specialty chemicals. We connect manufacturers and users with excellence and reliability.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink} aria-label="Website">
              <Globe size={20} />
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Quick Links</h3>
          <ul className={styles.linkList}>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/industries">Industries</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Our Products</h3>
          <ul className={styles.linkList}>
            <li><Link href="/products?category=solvents">Solvents</Link></li>
            <li><Link href="/products?category=polymers">Polymers</Link></li>
            <li><Link href="/products?category=specialty">Specialty Chemicals</Link></li>
            <li><Link href="/products?category=intermediates">Intermediates</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Contact Info</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <MapPin size={18} className={styles.contactIcon} />
              <span>123 Chemical Avenue, Industrial District, City, Country</span>
            </li>
            <li className={styles.contactItem}>
              <Phone size={18} className={styles.contactIcon} />
              <a href="tel:+917021065036">+91 7021065036</a>
            </li>
            <li className={styles.contactItem}>
              <Mail size={18} className={styles.contactIcon} />
              <a href="mailto:dakshravimehta@gmail.com">dakshravimehta@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className={`container ${styles.bottomContainer}`}>
          <p>&copy; {new Date().getFullYear()} Aurelis Chemicals. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

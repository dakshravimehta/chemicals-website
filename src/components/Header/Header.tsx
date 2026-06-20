"use client";

import Link from 'next/link';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContainer}`}>
          <div className={styles.contactInfo}>
            <a href="mailto:dakshravimehta@gmail.com" className={styles.contactItem}>
              <Mail size={14} /> dakshravimehta@gmail.com
            </a>
            <a href="tel:+917021065036" className={styles.contactItem}>
              <Phone size={14} /> +91 7021065036
            </a>
          </div>
          <div className={styles.topLinks}>
            <Link href="/contact" className={styles.topLink}>Request a Quote</Link>
          </div>
        </div>
      </div>
      
      <div className={`container ${styles.mainHeader}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Aurelis</span>
          <span className={styles.logoSubtext}>Chemicals</span>
        </Link>

        <nav className={styles.desktopNav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/about" className={styles.navLink}>About Us</Link>
          <Link href="/products" className={styles.navLink}>Products</Link>
          <Link href="/industries" className={styles.navLink}>Industries</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </nav>

        <div className={styles.headerActions}>
          <Link href="/products" className="btn btn-primary">Our Catalog</Link>
          
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileNav}>
          <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link href="/products" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
          <Link href="/industries" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Industries</Link>
          <Link href="/contact" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}

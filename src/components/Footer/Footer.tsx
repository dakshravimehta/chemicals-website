import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* CTA strip */}
      <div className={styles.ctaStrip}>
        <div className={`container ${styles.ctaRow}`}>
          <div>
            <p className={styles.ctaEyebrow}>Sourcing something specific?</p>
            <h2 className={styles.ctaTitle}>Tell us the spec. We&apos;ll quote the supply.</h2>
          </div>
          <Link href="/contact" className={`btn btn-primary ${styles.ctaBtn}`}>
            Request a Quote <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>

      <div className={`container ${styles.main}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
            <Image 
              src="/images/logo.png" 
              alt="Aurelis Chemicals Logo" 
              width={200} 
              height={200} 
              className={styles.fullLogoImage} 
            />
          </Link>
          <p className={styles.blurb}>
            Bulk supply of solvents, polymers, and specialty chemicals for industrial
            buyers. Reliable sourcing, flexible packaging, fast quotes.
          </p>
          <p className={styles.meta}>Drums · IBCs · ISO Tanks · Bulk Bags</p>
        </div>

        <nav className={styles.linksCol} aria-label="Sitemap">
          <p className={styles.colTitle}>Company</p>
          <Link href="/about">About</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <nav className={styles.linksCol} aria-label="Categories">
          <p className={styles.colTitle}>Catalog</p>
          <Link href="/products">Solvents</Link>
          <Link href="/products">Polymers &amp; Resins</Link>
          <Link href="/products">Specialty Chemicals</Link>
          <Link href="/products">Acids &amp; Intermediates</Link>
        </nav>

        <div className={styles.contactCol}>
          <p className={styles.colTitle}>Get in touch</p>
          <a href="mailto:dakshravimehta@gmail.com" className={styles.contactItem}>
            <Mail size={16} /> dakshravimehta@gmail.com
          </a>
          <a href="tel:+917021065036" className={styles.contactItem}>
            <Phone size={16} /> +91 70210 65036
          </a>
          <p className={styles.contactItem}>
            <MapPin size={16} /> Mumbai, India · Shipping worldwide
          </p>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Aurelis Chemicals. All rights reserved.
        </p>
        <div className={styles.legal}>
          <Link href="/privacy">Privacy</Link>
          <span aria-hidden="true">·</span>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

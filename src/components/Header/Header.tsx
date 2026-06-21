"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      {/* Utility bar */}
      <div className={styles.utility}>
        <div className={`container ${styles.utilityRow}`}>
          <div className={styles.utilityLeft}>
            <span className={styles.utilityTag}>Bulk Solvents · Polymers · Specialty</span>
          </div>
          <div className={styles.utilityContacts}>
            <a href="mailto:dakshravimehta@gmail.com" className={styles.utilityLink}>
              <Mail size={13} /> dakshravimehta@gmail.com
            </a>
            <a href="tel:+917021065036" className={styles.utilityLink}>
              <Phone size={13} /> +91 70210 65036
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label="Aurelis Chemicals home">
          <div className={styles.logoWrapper}>
            <Image 
              src="/images/logo.png" 
              alt="Aurelis Chemicals Logo" 
              width={200} 
              height={200} 
              className={styles.logoImage} 
              priority
            />
          </div>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${isActive(item.href) ? styles.navActive : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/contact" className={`btn btn-primary ${styles.cta}`}>
            Request a Quote <ArrowUpRight size={16} />
          </Link>
          <button
            className={styles.menuBtn}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}>
        <nav className={styles.drawerNav} aria-label="Mobile">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.drawerLink} ${isActive(item.href) ? styles.drawerActive : ""}`}
            >
              <span className={styles.drawerIndex}>{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={`btn btn-primary ${styles.drawerCta}`}>
            Request a Quote <ArrowUpRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
}

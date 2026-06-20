import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/PageHeader/PageHeader";
import ContactForm from "./ContactForm";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact | Aurelis Chemicals",
  description:
    "Request a quote or product sample from Aurelis Chemicals. Reach us by WhatsApp, email, or phone, with quotes turned around inside a day.",
};

const methods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message us instantly",
    href: "https://wa.me/917021065036",
    accent: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "dakshravimehta@gmail.com",
    href: "mailto:dakshravimehta@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 70210 65036",
    href: "tel:+917021065036",
  },
];

export default function Contact() {
  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title="Tell us the spec. We'll quote the supply."
        subtitle="Quotes, samples, or a question about availability, our team turns inquiries around inside a day."
      />

      <section className="section">
        <div className={`container ${styles.grid}`}>
          {/* Left: methods */}
          <div className={styles.infoCol}>
            <p className="eyebrow">Direct lines</p>
            <h2 className={styles.h2}>Reach the desk that handles your order.</h2>

            <ul className={styles.methods}>
              {methods.map((m) => (
                <li key={m.label}>
                  <a
                    href={m.href}
                    target={m.href.startsWith("http") ? "_blank" : undefined}
                    rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={styles.method}
                  >
                    <span
                      className={`${styles.methodIcon} ${m.accent ? styles.methodIconAccent : ""}`}
                    >
                      <m.icon size={22} strokeWidth={1.7} />
                    </span>
                    <span className={styles.methodText}>
                      <span className={styles.methodLabel}>{m.label}</span>
                      <span className={styles.methodValue}>{m.value}</span>
                    </span>
                    <ArrowUpRight size={18} className={styles.methodArrow} />
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.detailRow}>
              <div className={styles.detail}>
                <span className={styles.detailIcon}><MapPin size={18} /></span>
                <div>
                  <p className={styles.detailLabel}>Based in</p>
                  <p className={styles.detailValue}>Mumbai, India · Shipping worldwide</p>
                </div>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailIcon}><Clock size={18} /></span>
                <div>
                  <p className={styles.detailLabel}>Quote turnaround</p>
                  <p className={styles.detailValue}>Within 24 hours, business days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

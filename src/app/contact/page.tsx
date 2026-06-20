import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/PageHeader/PageHeader";
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
          <div className={styles.formPanel}>
            <h2 className={styles.formTitle}>Send an inquiry</h2>
            <p className={styles.formNote}>
              Share quantity and specification, the more detail, the sharper the quote.
            </p>
            <form className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Full name</label>
                <input id="name" type="text" className={styles.input} placeholder="Jane Doe" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="company" className={styles.label}>Company</label>
                <input id="company" type="text" className={styles.input} placeholder="Acme Manufacturing" required />
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input id="email" type="email" className={styles.input} placeholder="jane@acme.com" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="phone" className={styles.label}>Phone</label>
                  <input id="phone" type="tel" className={styles.input} placeholder="+91 00000 00000" />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="interest" className={styles.label}>Product interest</label>
                <select id="interest" className={styles.input} defaultValue="">
                  <option value="" disabled>Select a category</option>
                  <option value="solvents">Solvents &amp; Alcohols</option>
                  <option value="polymers">Polymers &amp; Resins</option>
                  <option value="specialty">Specialty &amp; Fine Chemicals</option>
                  <option value="acids">Acids &amp; Intermediates</option>
                  <option value="other">Other / Not sure</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>Requirements</label>
                <textarea
                  id="message"
                  className={styles.textarea}
                  rows={5}
                  placeholder="e.g. 5 MT Acetone, technical grade, drums, delivered Pune."
                  required
                />
              </div>
              <button type="submit" className={`btn btn-primary ${styles.submit}`}>
                Submit inquiry <ArrowUpRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

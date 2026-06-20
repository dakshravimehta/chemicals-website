import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'Contact Us | Aurelis Chemicals',
  description: 'Get in touch with Aurelis Chemicals for inquiries, quotes, or support. Connect via WhatsApp, Email, or Phone.',
};

export default function Contact() {
  return (
    <div className={styles.contactPage}>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Contact Us</h1>
          <p className={styles.pageSubtitle}>We are here to assist you with all your chemical sourcing needs</p>
        </div>
      </section>

      <section className={`section ${styles.contactSection}`}>
        <div className={`container ${styles.contactGrid}`}>
          
          {/* Contact Information */}
          <div className={styles.contactInfo}>
            <h2 className={styles.sectionTitle}>Get In Touch</h2>
            <p className={styles.contactText}>
              Whether you need to request a quote, ask for a product sample, or simply learn more about our distribution capabilities, our team is ready to help.
            </p>

            <div className={styles.methodsGrid}>
              {/* WhatsApp */}
              <a href="https://wa.me/917021065036" target="_blank" rel="noopener noreferrer" className={styles.methodCard}>
                <div className={`${styles.iconWrapper} ${styles.whatsappIcon}`}>
                  <MessageCircle size={28} />
                </div>
                <div>
                  <h3 className={styles.methodTitle}>WhatsApp</h3>
                  <p className={styles.methodDetail}>Message us instantly</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:dakshravimehta@gmail.com" className={styles.methodCard}>
                <div className={styles.iconWrapper}>
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className={styles.methodTitle}>Email</h3>
                  <p className={styles.methodDetail}>dakshravimehta@gmail.com</p>
                </div>
              </a>

              {/* Phone */}
              <a href="tel:+917021065036" className={styles.methodCard}>
                <div className={styles.iconWrapper}>
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className={styles.methodTitle}>Phone</h3>
                  <p className={styles.methodDetail}>+91 7021065036</p>
                </div>
              </a>
            </div>

            <div className={styles.officeBox}>
              <h3 className={styles.officeTitle}>
                <MapPin size={20} className={styles.officeIcon} /> Global Headquarters
              </h3>
              <p className={styles.officeAddress}>
                123 Chemical Avenue<br />
                Industrial District, Building B<br />
                Business City, 10001<br />
                Country
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Send an Inquiry</h2>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Full Name</label>
                <input type="text" id="name" className={styles.input} placeholder="John Doe" required />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="company" className={styles.label}>Company Name</label>
                <input type="text" id="company" className={styles.input} placeholder="Acme Corp" required />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input type="email" id="email" className={styles.input} placeholder="john@example.com" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Phone Number</label>
                  <input type="tel" id="phone" className={styles.input} placeholder="+1 234 567 8900" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="interest" className={styles.label}>Product Interest</label>
                <select id="interest" className={styles.input}>
                  <option value="">Select a category</option>
                  <option value="solvents">Solvents</option>
                  <option value="polymers">Polymers</option>
                  <option value="specialty">Specialty Chemicals</option>
                  <option value="other">Other / Not Sure</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message / Requirements</label>
                <textarea id="message" className={styles.textarea} placeholder="Please detail your quantity and specification requirements..." rows={5} required></textarea>
              </div>

              <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                Submit Inquiry
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}

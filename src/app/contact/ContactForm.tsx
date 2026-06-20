"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import styles from "./page.module.css";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send inquiry. Please try again later.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.formPanel} style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <CheckCircle2 size={48} color="#10b981" style={{ margin: "0 auto 1rem" }} />
        <h2 className={styles.formTitle}>Inquiry Sent!</h2>
        <p className={styles.formNote} style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
          Your inquiry was sent and you will get a response as soon as possible.
        </p>
        <button 
          className="btn btn-outline" 
          onClick={() => setIsSuccess(false)}
          style={{ marginTop: "2rem" }}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.formPanel}>
      <h2 className={styles.formTitle}>Send an inquiry</h2>
      <p className={styles.formNote}>
        Share quantity and specification, the more detail, the sharper the quote.
      </p>
      
      {error && (
        <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Full name</label>
          <input id="name" name="name" type="text" className={styles.input} placeholder="Jane Doe" required disabled={isSubmitting} />
        </div>
        <div className={styles.field}>
          <label htmlFor="company" className={styles.label}>Company</label>
          <input id="company" name="company" type="text" className={styles.input} placeholder="Acme Manufacturing" required disabled={isSubmitting} />
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input id="email" name="email" type="email" className={styles.input} placeholder="jane@acme.com" required disabled={isSubmitting} />
          </div>
          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>Phone</label>
            <input id="phone" name="phone" type="tel" className={styles.input} placeholder="+91 00000 00000" disabled={isSubmitting} />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="interest" className={styles.label}>Product interest</label>
          <select id="interest" name="interest" className={styles.input} defaultValue="" disabled={isSubmitting}>
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
            name="message"
            className={styles.textarea}
            rows={5}
            placeholder="e.g. 5 MT Acetone, technical grade, drums, delivered Pune."
            required
            disabled={isSubmitting}
          />
        </div>
        <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Submit inquiry"} {!isSubmitting && <ArrowUpRight size={16} />}
        </button>
      </form>
    </div>
  );
}

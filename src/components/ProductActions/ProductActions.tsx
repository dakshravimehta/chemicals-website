"use client";

import { useState } from "react";
import { FileText, X, CheckCircle2, AlertCircle } from "lucide-react";
import styles from "./ProductActions.module.css";

interface ProductActionsProps {
  productName: string;
  productCode: string;
}

export default function ProductActions({ productName, productCode }: ProductActionsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [docType, setDocType] = useState<"TDS" | "SDS" | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const openModal = (type: "TDS" | "SDS") => {
    setDocType(type);
    setModalOpen(true);
    setSuccess(false);
    setError("");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      interest: productName,
      message: `I would like to request the ${docType} (Data Sheet) for ${productName} (${productCode}).`,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send request");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.actionsContainer}>
        <button className={`btn btn-outline ${styles.actionBtn}`} onClick={() => openModal("TDS")}>
          <FileText size={16} /> Request TDS
        </button>
        <button className={`btn btn-outline ${styles.actionBtn}`} onClick={() => openModal("SDS")}>
          <FileText size={16} /> Request SDS
        </button>
      </div>

      <div className={`${styles.modalOverlay} ${modalOpen ? styles.modalOverlayOpen : ""}`}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={closeModal} aria-label="Close">
            <X size={24} />
          </button>

          {success ? (
            <div className={styles.successMsg}>
              <CheckCircle2 size={48} className={styles.successIcon} />
              <h3 className={styles.title}>Request Sent!</h3>
              <p className={styles.desc}>
                We have received your request for the {productName} {docType}. Our team will email it to you shortly.
              </p>
              <button className="btn btn-primary" onClick={closeModal} style={{ marginTop: "1rem" }}>
                Close
              </button>
            </div>
          ) : (
            <>
              <h3 className={styles.title}>Request {docType}</h3>
              <p className={styles.desc}>
                Please provide your details below to receive the {docType === "TDS" ? "Technical Data Sheet" : "Safety Data Sheet"} for <strong>{productName}</strong>.
              </p>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Full Name</label>
                  <input type="text" id="name" name="name" className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Business Email</label>
                  <input type="email" id="email" name="email" className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.label}>Company Name</label>
                  <input type="text" id="company" name="company" className={styles.input} />
                </div>

                {error && (
                  <div className={styles.error} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <AlertCircle size={14} /> {error}
                  </div>
                )}

                <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
                  {loading ? "Sending..." : `Request ${docType}`}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

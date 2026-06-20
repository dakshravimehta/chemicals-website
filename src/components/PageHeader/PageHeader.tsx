import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <p className={`eyebrow eyebrow--on-dark ${styles.eyebrow}`}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}

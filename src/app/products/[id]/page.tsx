import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import productsData from "@/data/products.json";
import ProductActions from "@/components/ProductActions/ProductActions";
import styles from "./page.module.css";

// Generate static params for all products so they are built statically
export function generateStaticParams() {
  return productsData.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = productsData.find((p) => p.id === resolvedParams.id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Aurelis Chemicals`,
    description: `Buy ${product.name} (${product.code}) wholesale from Aurelis Chemicals. Category: ${product.category}.`,
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = productsData.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <Link href="/products" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
        
        <div className={styles.grid}>
          {/* Main Info */}
          <div className={styles.main}>
            <div className={styles.categoryBadge}>{product.category}</div>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.code}>Product Code: {product.code}</p>
            
            <div className={styles.desc}>
              <p>Premium grade {product.name} available for bulk distribution and wholesale. Suitable for rigorous industrial applications requiring high purity and strict compliance.</p>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <ShieldCheck className={styles.featureIcon} />
                <div>
                  <strong>Quality Assured</strong>
                  <p>Ships with complete SDS and CoA documentation.</p>
                </div>
              </div>
              <div className={styles.feature}>
                <Truck className={styles.featureIcon} />
                <div>
                  <strong>Flexible Logistics</strong>
                  <p>Available in drums, IBCs, ISO tanks, and bulk loads.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar Inquiry */}
          <aside className={styles.sidebar}>
            <div className={styles.inquiryCard}>
              <h2 className={styles.inquiryTitle}>Request a Quote</h2>
              <p className={styles.inquiryText}>
                Need pricing or technical specifications for <strong>{product.name}</strong>? Our team responds within 24 hours.
              </p>
              <Link href={`/contact?interest=${encodeURIComponent(product.category)}&message=${encodeURIComponent(`I would like to request a quote for ${product.name} (${product.code}).`)}`} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Inquire Now <ArrowUpRight size={16} />
              </Link>
              <ul className={styles.inquiryList}>
                <li><CheckCircle2 size={14} /> Custom sourcing available</li>
                <li><CheckCircle2 size={14} /> Global shipping</li>
                <li><CheckCircle2 size={14} /> Tiered volume pricing</li>
              </ul>
              <ProductActions productName={product.name} productCode={product.code} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

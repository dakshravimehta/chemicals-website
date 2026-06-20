import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  FileText,
  ShieldCheck,
  Boxes,
  FlaskConical,
} from "lucide-react";
import { products, chemFor, industriesFor, relatedProducts } from "@/lib/products";
import styles from "./page.module.css";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Product not found | Aurelis Chemicals" };
  const chem = chemFor(product.name);
  return {
    title: `${product.name} | Aurelis Chemicals`,
    description: `Bulk supply of ${product.name}${
      chem?.cas ? ` (CAS ${chem.cas})` : ""
    }. Request a quote, sample, spec sheet, or SDS from Aurelis Chemicals.`,
  };
}

const packaging = ["Drums", "IBCs", "ISO Tanks", "Bulk Bags", "Carboys", "Bottles"];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const chem = chemFor(product.name);
  const industries = industriesFor(product.name);
  const related = relatedProducts(product);

  const quoteHref = `/contact?interest=${encodeURIComponent(
    product.category
  )}&message=${encodeURIComponent(
    `I would like to request a quote for ${product.name} (${product.code}).`
  )}`;

  const idFacts = [
    { label: "CAS Number", value: chem?.cas },
    { label: "Molecular Formula", value: chem?.formula },
    { label: "Molecular Weight", value: chem?.molarMass ? `${chem.molarMass} g/mol` : undefined },
    { label: "IUPAC Name", value: chem?.iupac },
  ].filter((f) => f.value);

  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.head}>
        <div className="container">
          <nav className={styles.crumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/products">Products</Link>
            <span aria-hidden="true">/</span>
            <span className={styles.crumbCurrent}>{product.name}</span>
          </nav>

          <div className={styles.headGrid}>
            <div>
              <p className={`eyebrow eyebrow--on-dark ${styles.headEyebrow}`}>
                {product.category}
              </p>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.code}>
                Product code <span>{product.code}</span>
              </p>
              <p className={styles.lead}>
                Bulk supply of {product.name} for industrial buyers, sourced to spec and
                shipped in the packaging your process runs on. Full specification, CoA and
                SDS provided on request.
              </p>
              <div className={styles.actions}>
                <Link href={quoteHref} className="btn btn-primary">
                  Request a quote <ArrowUpRight size={16} />
                </Link>
                <Link href={quoteHref} className="btn btn-on-dark">
                  Request a sample
                </Link>
              </div>
            </div>

            {/* Quick reference card */}
            <aside className={styles.idCard}>
              <p className={styles.idCardTitle}>
                <FlaskConical size={15} /> Identification
              </p>
              {idFacts.length > 0 ? (
                <dl className={styles.idList}>
                  {idFacts.map((f) => (
                    <div key={f.label} className={styles.idRow}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className={styles.idMuted}>
                  Specification, CAS and SDS available on request.
                </p>
              )}
              {chem?.source && (
                <p className={styles.idSource}>
                  {chem.source === "pubchem"
                    ? "Identity data: PubChem (NIH)"
                    : "Identity data: verified reference"}
                </p>
              )}
            </aside>
          </div>
        </div>
      </section>

      <div className={`container ${styles.body}`}>
        <div className={styles.main}>
          {/* Overview */}
          <section className={styles.block}>
            <p className="eyebrow">Overview</p>
            <h2 className={styles.h2}>About {product.name}</h2>
            <p className={styles.prose}>
              Aurelis Chemicals supplies {product.name} as a traded commodity for industrial
              processing and formulation. {chem?.iupac ? `Also known as ${chem.iupac}. ` : ""}
              We source from vetted producers and supply in flexible volumes, from drums to
              bulk, with documentation provided up front so QA signs off without chasing.
            </p>
          </section>

          {/* Applications */}
          {industries.length > 0 && (
            <section className={styles.block}>
              <p className="eyebrow">Applications</p>
              <h2 className={styles.h2}>Industries that use {product.name}</h2>
              <p className={styles.prose}>
                Based on our application index, {product.name} is used across the following
                sectors. Explore each to see the full chemistry it sits alongside.
              </p>
              <ul className={styles.indList}>
                {industries.map((ind) => (
                  <li key={ind.slug}>
                    <Link href={`/industries#${ind.slug}`} className={styles.indChip}>
                      {ind.name}
                      <ArrowUpRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Packaging */}
          <section className={styles.block}>
            <p className="eyebrow">Packaging & logistics</p>
            <h2 className={styles.h2}>Supplied your way</h2>
            <p className={styles.prose}>
              Available in a range of packaging for full or part loads, with hazardous and
              non-hazardous freight, documentation and customs coordinated port to plant.
            </p>
            <ul className={styles.tagList}>
              {packaging.map((p) => (
                <li key={p} className={styles.tag}>
                  <Boxes size={14} /> {p}
                </li>
              ))}
            </ul>
          </section>

          {/* Quality & safety */}
          <section className={styles.block}>
            <p className="eyebrow">Quality & documentation</p>
            <h2 className={styles.h2}>Documented and compliant</h2>
            <div className={styles.assureGrid}>
              <div className={styles.assure}>
                <FileText size={20} />
                <h3>Specs &amp; CoA</h3>
                <p>Technical data sheet and Certificate of Analysis supplied per batch.</p>
              </div>
              <div className={styles.assure}>
                <ShieldCheck size={20} />
                <h3>SDS on request</h3>
                <p>GHS-aligned Safety Data Sheet provided before dispatch. Handle per SDS.</p>
              </div>
              <div className={styles.assure}>
                <Boxes size={20} />
                <h3>Grades</h3>
                <p>Technical and higher grades sourced to your specification where available.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar CTA */}
        <aside className={styles.side}>
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>Need {product.name} in bulk?</h3>
            <p className={styles.ctaText}>
              Send your quantity, grade and destination. We quote inside a day.
            </p>
            <Link href={quoteHref} className={`btn btn-primary ${styles.ctaBtn}`}>
              Request a quote <ArrowUpRight size={16} />
            </Link>
            <Link href="/products" className={styles.backLink}>
              <ArrowLeft size={14} /> Back to catalog
            </Link>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className={styles.related}>
          <div className="container">
            <div className={styles.relatedHead}>
              <h2 className={styles.h2}>Related products</h2>
              <Link href="/products" className={styles.viewAll}>
                All products <ArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <Link key={r.id} href={`/products/${r.id}`} className={styles.relCard}>
                  <span className={styles.relCat}>{r.category}</span>
                  <span className={styles.relName}>{r.name}</span>
                  <span className={styles.relGo}>
                    View product <ArrowUpRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

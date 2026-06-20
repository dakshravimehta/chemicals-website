"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader/PageHeader";
import { applications } from "@/data/applications";
import styles from "./page.module.css";

type Group = "all" | "industry" | "resin";

const GROUPS: { key: Group; label: string }[] = [
  { key: "all", label: "All" },
  { key: "industry", label: "Industries" },
  { key: "resin", label: "Resin systems" },
];

const featured = applications.filter((a) => a.image);

export default function Industries() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<Group>("all");

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const matchesGroup = group === "all" || a.kind === group;
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.products.some((p) => p.toLowerCase().includes(q));
      return matchesGroup && matchesQuery;
    });
  }, [q, group]);

  const showFeatured = q === "" && group === "all";

  return (
    <div>
      <PageHeader
        eyebrow="Industries & Applications"
        title="What we supply, by application."
        subtitle="The grades each sector actually runs on, mapped across 40+ industries and resin systems. Search by industry or by chemical to see where it's used."
      />

      {/* Featured industries */}
      {showFeatured && (
        <section className={styles.featuredSection}>
          <div className="container">
            <p className="eyebrow">Featured sectors</p>
            <div className={styles.featuredGrid}>
              {featured.map((ind, i) => (
                <Link
                  href={`#${ind.slug}`}
                  key={ind.slug}
                  className={styles.featCard}
                  onClick={() => setQuery(ind.name)}
                >
                  <img src={ind.image} alt={ind.name} className={styles.featImg} />
                  <div className={styles.featVeil} />
                  <span className={styles.featNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.featName}>
                    {ind.name}
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Searchable index */}
      <section className={styles.indexSection}>
        <div className="container">
          <div className={styles.controls}>
            <div className={styles.searchWrap}>
              <Search size={18} className={styles.searchIcon} />
              <input
                className={styles.search}
                placeholder="Search by industry or chemical (e.g. Acetone, Textile)…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button className={styles.clear} onClick={() => setQuery("")} aria-label="Clear">
                  <X size={16} />
                </button>
              )}
            </div>
            <div className={styles.groupTabs} role="tablist" aria-label="Filter">
              {GROUPS.map((g) => (
                <button
                  key={g.key}
                  role="tab"
                  aria-selected={group === g.key}
                  className={`${styles.tab} ${group === g.key ? styles.tabActive : ""}`}
                  onClick={() => setGroup(g.key)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <p className={styles.count}>
            <strong>{filtered.length}</strong> {filtered.length === 1 ? "application" : "applications"}
            {q && (
              <>
                {" "}matching <span className={styles.countTerm}>“{query}”</span>
              </>
            )}
          </p>

          {filtered.length > 0 ? (
            <div className={styles.indexGrid}>
              {filtered.map((a) => (
                <article key={a.slug} id={a.slug} className={styles.appCard}>
                  <header className={styles.appHead}>
                    <h2 className={styles.appName}>{a.name}</h2>
                    <span className={`${styles.appTag} ${a.kind === "resin" ? styles.tagResin : ""}`}>
                      {a.kind === "resin" ? "Resin system" : `${a.products.length} products`}
                    </span>
                  </header>
                  <ul className={styles.chips}>
                    {a.products.map((p) => {
                      const match = q && p.toLowerCase().includes(q);
                      return (
                        <li key={p}>
                          <button
                            className={`${styles.chip} ${match ? styles.chipMatch : ""}`}
                            onClick={() => setQuery(p)}
                            title={`Show all applications using ${p}`}
                          >
                            {p}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <h3 className={styles.emptyTitle}>No applications match “{query}”</h3>
              <p className={styles.emptyText}>
                We may still supply it. Tell us the application and we&apos;ll point you to the right grade.
              </p>
              <div className={styles.emptyActions}>
                <button className="btn btn-dark" onClick={() => { setQuery(""); setGroup("all"); }}>
                  Clear search
                </button>
                <Link href="/contact" className="btn btn-outline">
                  Ask our team
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Closing */}
      <section className={styles.closing}>
        <div className={`container ${styles.closingInner}`}>
          <p className="eyebrow eyebrow--on-dark">Don&apos;t see your sector?</p>
          <h2 className={styles.closingTitle}>
            If it runs on industrial chemistry, we likely supply it.
          </h2>
          <p className={styles.closingText}>
            Our sourcing network reaches well beyond this list. Send us the application and target spec.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Speak with an expert <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

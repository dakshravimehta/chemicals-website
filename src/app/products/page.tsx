"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowUpRight, X, Package } from "lucide-react";
import PageHeader from "@/components/PageHeader/PageHeader";
import productsData from "@/data/products.json";
import styles from "./page.module.css";

const PAGE_SIZE = 24;

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Sync state from URL
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setCategory(cat);
  }, [searchParams]);

  // Update URL when category changes
  const updateCategory = (newCat: string) => {
    setCategory(newCat);
    resetPaging();
    const params = new URLSearchParams(searchParams.toString());
    if (newCat === "All") {
      params.delete("category");
    } else {
      params.set("category", newCat);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const categories = useMemo(() => {
    const set = new Set(productsData.map((p) => p.category));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return productsData.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q);
      const matchesCategory = category === "All" || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [search, category]);

  const shown = filtered.slice(0, visible);

  const resetPaging = () => setVisible(PAGE_SIZE);

  return (
    <div>
      <PageHeader
        eyebrow="Product catalog"
        title={`${productsData.length} products, organized to find fast.`}
        subtitle="Search by name or product code, or filter by category. Need something not listed? Our procurement team sources custom grades on request."
      />

      <section className={styles.catalog}>
        <div className="container">
          {/* Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.searchWrap}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.search}
                placeholder="Search by chemical name or product code…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  resetPaging();
                }}
              />
              {search && (
                <button
                  className={styles.clear}
                  onClick={() => {
                    setSearch("");
                    resetPaging();
                  }}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <p className={styles.count}>
              <strong>{filtered.length}</strong>{" "}
              {filtered.length === 1 ? "product" : "products"}
            </p>
          </div>

          {/* Category filter */}
          <div className={styles.filters} role="tablist" aria-label="Categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={category === cat}
                className={`${styles.chip} ${category === cat ? styles.chipActive : ""}`}
                onClick={() => updateCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {shown.length > 0 ? (
            <>
              <div className={styles.grid}>
                {shown.map((p) => (
                  <article key={p.id} className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.cardCat}>{p.category}</span>
                      <span className={styles.cardCode}>{p.code}</span>
                    </div>
                    <h3 className={styles.cardName}>{p.name}</h3>
                    <ul className={styles.specs}>
                      <li>Bulk &amp; drums</li>
                      <li>Global shipping</li>
                      <li>Spec sheet on request</li>
                    </ul>
                    <Link
                      href={`/products/${p.id}`}
                      className={styles.quote}
                      aria-label={`View details for ${p.name}`}
                    >
                      View details <ArrowUpRight size={15} />
                    </Link>
                  </article>
                ))}
              </div>

              {visible < filtered.length && (
                <div className={styles.loadMore}>
                  <p className={styles.loadMoreText}>
                    Showing {shown.length} of {filtered.length}
                  </p>
                  <button
                    className="btn btn-outline"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  >
                    Load more products
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>
                <Package size={28} strokeWidth={1.5} />
              </span>
              <h3 className={styles.emptyTitle}>No products match that search</h3>
              <p className={styles.emptyText}>
                Try a different term or clear the filters. We may still stock it, ask our
                team directly.
              </p>
              <div className={styles.emptyActions}>
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    setSearch("");
                    updateCategory("All");
                  }}
                >
                  Clear filters
                </button>
                <Link href="/contact" className="btn btn-outline">
                  Ask for custom sourcing
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function Products() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: "10vh 0", textAlign: "center" }}>Loading catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

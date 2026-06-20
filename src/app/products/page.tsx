"use client";

import { useState, useMemo } from 'react';
import { Search, Filter, ChevronRight, Download } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';

// Import the parsed products data
import productsData from '@/data/products.json';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories from data
  const categories = useMemo(() => {
    const cats = new Set(productsData.map(p => p.category));
    return ['All', ...Array.from(cats)].sort();
  }, []);

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.productsPage}>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className={styles.headerBackground}></div>
        <div className={`container ${styles.headerContent}`}>
          <motion.h1 
            className={styles.pageTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Product Catalog
          </motion.h1>
          <motion.p 
            className={styles.pageSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our extensive inventory of {productsData.length}+ premium chemicals and raw materials, sourced for excellence.
          </motion.p>
        </div>
      </section>

      {/* Catalog Section */}
      <section className={`section ${styles.catalogSection}`}>
        <div className={`container ${styles.catalogContainer}`}>
          
          {/* Sidebar / Filters */}
          <aside className={styles.sidebar}>
            <motion.div 
              className={styles.filterBox}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className={styles.filterTitle}>
                <Filter size={18} /> Categories
              </h3>
              <ul className={styles.categoryList}>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button 
                      className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              className={styles.helpBox}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>Need Custom Sourcing?</h3>
              <p>Can&apos;t find exactly what you need? Our global procurement team can source custom compounds and rare chemicals.</p>
              <Link href="/contact" className={`btn btn-secondary ${styles.helpBtn}`}>
                Contact Our Experts
              </Link>
            </motion.div>
          </aside>

          {/* Main Content */}
          <main className={styles.mainContent}>
            
            {/* Search Bar */}
            <motion.div 
              className={styles.searchContainer}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.searchInputWrapper}>
                <Search className={styles.searchIcon} size={20} />
                <input 
                  type="text" 
                  className={styles.searchInput}
                  placeholder="Search by chemical name or CAS / product code..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className={styles.resultActions}>
                <span className={styles.resultCount}>
                  Showing <strong>{filteredProducts.length}</strong> products
                </span>
                <button className={`btn btn-outline ${styles.downloadBtn}`}>
                  <Download size={16} style={{ marginRight: '0.5rem' }} /> Download PDF Catalog
                </button>
              </div>
            </motion.div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div 
                className={styles.productGrid}
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } }
                }}
              >
                <AnimatePresence>
                  {filteredProducts.slice(0, 50).map((product) => (
                    <motion.div 
                      key={product.id} 
                      className={styles.productCard}
                      variants={fadeUp}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={styles.productBadge}>{product.category}</div>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productCode}>Product Code: <span className="text-gold">{product.code}</span></p>
                      <div className={styles.productFeatures}>
                        <span className={styles.featureBadge}>📦 Bulk & Drums</span>
                        <span className={styles.featureBadge}>🌐 Global Shipping</span>
                        <span className={styles.featureBadge}>🔬 Premium Grade</span>
                      </div>
                      <div className={styles.productActions}>
                        <Link href={`/contact?subject=Quote Request for ${encodeURIComponent(product.name)}`} className={styles.quoteBtn}>
                          Request Quote <ChevronRight size={16} className={styles.quoteIcon} />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {filteredProducts.length > 50 && (
                  <div className={styles.loadMoreContainer}>
                    <p className={styles.loadMoreText}>Showing top 50 results. Please refine your search to see more specific products.</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                className={styles.noResults}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className={styles.noResultsIcon}>🔍</div>
                <h3>No chemicals found</h3>
                <p>We couldn&apos;t find any products matching your current search criteria.</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                  style={{marginTop: '1.5rem'}}
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
            
          </main>
        </div>
      </section>
    </div>
  );
}

import productsData from "@/data/products.json";
import chemDataRaw from "@/data/chem-data.json";
import { applications, type Application } from "@/data/applications";

export type Product = {
  id: string;
  name: string;
  category: string;
  code: string;
  description: string;
};

export type ChemData = {
  formula?: string;
  molarMass?: string;
  cas?: string;
  iupac?: string;
  source?: "pubchem" | "fixed";
};

export const products = productsData as Product[];
const chemData = chemDataRaw as Record<string, ChemData>;

/** URL-safe slug from a chemical name (drops parentheticals). */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Unique product slug: name-slug + numeric id (e.g. caustic-soda-lye-12). */
export function productSlug(p: Product): string {
  return `${slugify(p.name)}-${p.id}`;
}

export function findProductBySlug(slug: string): Product | undefined {
  const m = slug.match(/-(\d+)$/);
  if (m) {
    const byId = products.find((p) => p.id === m[1]);
    if (byId) return byId;
  }
  return products.find((p) => productSlug(p) === slug);
}

export function chemFor(name: string): ChemData | undefined {
  return chemData[name];
}

/** Common trade-abbreviation <-> name bridges for industry matching. */
const SYNONYMS: Record<string, string[]> = {
  ipa: ["isopropyl alcohol", "iso propanol", "isopropanol"],
  mek: ["methyl ethyl ketone"],
  mibk: ["methyl isobutyl ketone", "methy isobutyl ketone"],
  meg: ["mono ethylene glycol", "monoethylene glycol", "ethylene glycol"],
  deg: ["diethylene glycol"],
  dmf: ["dimethyl formamide"],
  dmso: ["dimethyl sulfoxide"],
  thf: ["tetrahydrofuran"],
  nmp: ["n methyl 2 pyrrolidone", "n methyl pyrrolidone"],
  tea: ["triethanolamine"],
  pg: ["propylene glycol"],
  dpg: ["dipropylene glycol"],
  mdc: ["methylene chloride", "dichloromethane"],
  edc: ["ethylene dichloride"],
  mma: ["methyl methacrylate"],
  maa: ["methacrylic acid"],
  vam: ["vinyl acetate"],
  mdi: ["methylene diphenyl diisocyanate"],
  tdi: ["toluene diisocyanate"],
  "2eha": ["2 ethyl hexyl acrylate", "2 ethyl hexanol", "2 ethyl hexyl acetate"],
  pma: ["propylene glycol mono methyl ether acetate"],
  pm: ["propylene glycol mono methyl ether"],
};

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** All comparable forms of a product name: base, parentheticals, synonyms. */
function aliasSet(name: string): Set<string> {
  const lower = name.toLowerCase();
  const parens = [...lower.matchAll(/\(([^)]*)\)/g)].map((m) => norm(m[1]));
  const base = norm(lower.replace(/\([^)]*\)/g, " "));
  const stripped = base
    .replace(/\b\d+(\.\d+)?%?\b/g, " ")
    .replace(/\b(technical|usp|food grade|grade|anhydrous|monohydrate|monomer|resin|oil|powder|granular|flakes|lye)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const set = new Set<string>([base, stripped, ...parens].filter(Boolean));
  for (const key of [...set]) {
    if (SYNONYMS[key]) SYNONYMS[key].forEach((s) => set.add(norm(s)));
    for (const [abbr, names] of Object.entries(SYNONYMS)) {
      if (names.map(norm).includes(key)) set.add(abbr);
    }
  }
  return set;
}

/** Industries/applications whose product list includes this chemical. */
export function industriesFor(name: string): Application[] {
  const aliases = aliasSet(name);
  return applications.filter((app) =>
    app.products.some((prod) => {
      const p = norm(prod);
      if (aliases.has(p)) return true;
      // allow synonym expansion of the application product too
      if (SYNONYMS[p]?.some((s) => aliases.has(norm(s)))) return true;
      return false;
    })
  );
}

export function relatedProducts(p: Product, n = 4): Product[] {
  const sameCat = products.filter((x) => x.category === p.category && x.id !== p.id);
  // de-duplicate by name to avoid repeated catalog entries
  const seen = new Set<string>();
  const unique = sameCat.filter((x) => {
    if (seen.has(x.name)) return false;
    seen.add(x.name);
    return true;
  });
  return unique.slice(0, n);
}

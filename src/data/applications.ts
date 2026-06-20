// Industry / application -> chemicals classification.
// Source: client-provided "Products" classification sheet (6 pages).
// Product names preserve the source document's trade spelling/abbreviations.

export type Application = {
  name: string;
  slug: string;
  kind: "industry" | "resin";
  /** Optional hero image for featured industries (in /public/images). */
  image?: string;
  products: string[];
};

export const applications: Application[] = [
  // ---- Page 1 ----
  {
    name: "Cosmetics",
    slug: "cosmetics",
    kind: "industry",
    image: "/images/ind_personal_care.png",
    products: ["Glycerine", "Urea", "TEA", "PG Tech", "Citric Anhydrous", "Salicylic Acid"],
  },
  {
    name: "Flavours & Fragrances",
    slug: "flavours-fragrances",
    kind: "industry",
    products: ["PG", "DPG", "Methanol", "Citric Acid", "Toluene", "Methyl Aceto Acetate", "Vanillin", "Ethyl Vanillin"],
  },
  {
    name: "Construction Chemicals",
    slug: "construction-chemicals",
    kind: "industry",
    products: ["Sodium Gluconate", "Sodium Ligno", "Triethylamine", "2 EHA"],
  },
  {
    name: "Fire Fighting",
    slug: "fire-fighting",
    kind: "industry",
    products: ["Butyl Carbitol", "Xanthan Gum 800 Mesh", "Urea", "MEG", "N Heptane"],
  },
  {
    name: "Dyes & Pigments",
    slug: "dyes-pigments",
    kind: "industry",
    products: ["Soda Ash", "Caustic Soda Flakes", "Sodium Bicarbonate", "Aniline Oil", "Ortho Dichloro Benzene (ODCB)", "Acetone"],
  },
  {
    name: "Inks",
    slug: "inks",
    kind: "industry",
    products: ["Cyclohexanone", "MEK", "MIBK", "Toluene", "Acetone", "N Propanol", "IPA"],
  },
  {
    name: "Lubricants",
    slug: "lubricants",
    kind: "industry",
    products: ["MEG", "TEA"],
  },
  {
    name: "Leather Chemicals",
    slug: "leather-chemicals",
    kind: "industry",
    products: ["Methyl Acrylate", "2 Ethyl Hexyl Acetate", "Acrylonitrile", "Butyl Glycol Acetate", "N Methyl 2 Pyrrolidone", "Butyl Glycol", "Styrene", "DMF", "DMSO", "Toluene", "IPA", "MEK"],
  },
  {
    name: "Laminates & Plywoods",
    slug: "laminates-plywoods",
    kind: "industry",
    products: ["Melamine", "Urea", "Caustic Soda Flakes", "Phenol", "Methanol", "PVA"],
  },

  // ---- Page 2 ----
  {
    name: "Menthol",
    slug: "menthol",
    kind: "industry",
    products: ["DMSO", "Mix Xylene", "Acetic Acid", "Iodine", "EDC", "Acetone", "Propanoldehyde", "Di N Butyl Amine", "DMF", "MDC"],
  },
  {
    name: "Oil Drilling Chemicals",
    slug: "oil-drilling-chemicals",
    kind: "industry",
    products: ["TETA", "TEPA", "Acetic Acid", "EDA", "DMA", "MEG", "DEG"],
  },
  {
    name: "Paints & Coatings",
    slug: "paints-coatings",
    kind: "industry",
    image: "/images/ind_coatings.png",
    products: ["MIBK", "Toluene", "IPA", "Acrylic Acid", "2EHA", "MMA", "Mix Xylene", "Butyl Acetate"],
  },
  {
    name: "PVC Solvent & Cement",
    slug: "pvc-solvent-cement",
    kind: "industry",
    products: ["Acetone", "Cyclohexanone", "MEK", "Toluene", "Hexane", "THF"],
  },
  {
    name: "Paper Chemicals",
    slug: "paper-chemicals",
    kind: "industry",
    products: ["Epichloro", "Styrene", "BAM", "DETA", "TEPA"],
  },
  {
    name: "Polyurethane Industry",
    slug: "polyurethane-industry",
    kind: "industry",
    products: ["MDI", "TDI", "Polyol", "MDC", "MTO"],
  },
  {
    name: "Pharma & API",
    slug: "pharma-api",
    kind: "industry",
    image: "/images/ind_pharma.png",
    products: ["Methanol", "IPA", "Acetone", "Toluene", "THF", "Diiso Propyl Ether", "Acetonitrile", "Isovaleraldehyde", "Sodium Borohydride", "DMF", "1,4 Dioxane", "HH 80%", "Ethyl Acetate"],
  },
  {
    name: "Packaging",
    slug: "packaging",
    kind: "industry",
    products: ["IPA", "Toluene", "NPAC", "N Propanol", "MIBK", "MEK", "PEG 400"],
  },

  // ---- Page 3 (Resin systems) ----
  {
    name: "Alkyd Resins",
    slug: "alkyd-resins",
    kind: "resin",
    products: ["Phthalic", "Maleic", "Penta", "Styrene", "Mix Xylene", "Fumaric Acid"],
  },
  {
    name: "Saturated / Unsaturated Resins",
    slug: "saturated-unsaturated-resins",
    kind: "resin",
    products: ["Propylene Glycol", "MEG", "DEG", "MP Diol", "Phthalic", "Maleic", "Styrene", "Neo Pentyl Glycol"],
  },
  {
    name: "Polyethylene Resins",
    slug: "polyethylene-resins",
    kind: "resin",
    products: ["Phthalic", "Maleic", "MEG", "Mix Xylene", "N Butanol", "Styrene"],
  },
  {
    name: "Polycarbonate Resins",
    slug: "polycarbonate-resins",
    kind: "resin",
    products: ["Phthalic", "Maleic", "MEG", "Mix Xylene", "N Butanol", "Styrene"],
  },
  {
    name: "Acrylic Resins",
    slug: "acrylic-resins",
    kind: "resin",
    products: ["Mix Xylene", "Styrene", "BAM", "Phthalic", "2EHA", "Penta", "Acrylic Acid", "Butyl Acetate", "Benzoic Acid", "Butyl Cellosolve", "C-9", "DTBP", "Ethyl Cellosolve Acetate", "Glycerine", "Hypophosphorous Acid", "MMA", "Octanol"],
  },
  {
    name: "Polyurethane Resins",
    slug: "polyurethane-resins",
    kind: "resin",
    products: ["MDI", "TDI", "Polyol", "MDC", "MTO", "DEG", "Butyl Glycol"],
  },
  {
    name: "Polyamide Resin",
    slug: "polyamide-resin",
    kind: "resin",
    products: ["Mix Xylene", "Phthalic", "Maleic", "Penta", "DEG", "C9", "Butyl Glycol"],
  },
  {
    name: "Silicone Resins",
    slug: "silicone-resins",
    kind: "resin",
    products: ["Mix Xylene", "Phthalic", "Maleic", "Penta", "DEG", "C9", "Butyl Glycol"],
  },
  {
    name: "Polystyrene Resins",
    slug: "polystyrene-resins",
    kind: "resin",
    products: ["Mix Xylene", "Phthalic", "Maleic", "Penta", "DEG", "C9", "Butyl Glycol", "Styrene"],
  },

  // ---- Page 4 ----
  {
    name: "Polypropylene Resins",
    slug: "polypropylene-resins",
    kind: "resin",
    products: ["Mix Xylene", "Phthalic", "Maleic", "Penta", "DEG", "C9", "Butyl Glycol"],
  },
  {
    name: "Phenolic Resins",
    slug: "phenolic-resins",
    kind: "resin",
    products: ["Mix Xylene", "Iso Butanol", "Phthalic", "Maleic", "Bisphenol", "Formaldehyde", "Paraformaldehyde", "Butanol", "Para Tertiary Butyl Phenol", "Meta Cresol"],
  },
  {
    name: "Rubber Chemicals",
    slug: "rubber-chemicals",
    kind: "industry",
    products: ["Hexane", "Toluene", "MEK", "Benzene", "Methanol", "Acetone", "Polyethylene Glycol", "PVC Resin", "MIBK"],
  },
  {
    name: "Surfactants",
    slug: "surfactants",
    kind: "industry",
    products: ["Nonyl Phenol", "Styrene", "Lauryl Alcohol", "Caustic Potash", "Methanol", "Toluene"],
  },
  {
    name: "Speciality Chemicals",
    slug: "speciality-chemicals",
    kind: "industry",
    products: ["Cyclopentanone", "2 Methyl THF", "Thiourea", "Cyclohexanone", "Iso Propylamine", "Butyl Cellosolve", "THF", "Ethyl Aceto Acetate", "Methyl Ester", "All Solvents"],
  },
  {
    name: "Textile Chemicals",
    slug: "textile-chemicals",
    kind: "industry",
    products: ["Acetic Acid", "Citric Mono", "Hydrogen Peroxide", "Methanol", "Butyl Glycol", "DCDA", "Acrylamide", "PEG 400", "Caustic Potash", "Stearic Acid", "DEA", "Butyl Carbitol", "Urea", "Formic Acid", "Caustic Soda Lye", "Oxalic Acid"],
  },
  {
    name: "Sugar Chemicals",
    slug: "sugar-chemicals",
    kind: "industry",
    products: ["Phosphoric Acid", "Caustic Soda Flakes"],
  },

  // ---- Page 5 ----
  {
    name: "Water Treatment",
    slug: "water-treatment",
    kind: "industry",
    image: "/images/ind_water.png",
    products: ["Acrylamide", "Acrylic Acid", "Epichloro", "DCDA", "Cyclohexylamine", "Morpholine", "Caustic Soda Lye", "Hydrazine Hydrate"],
  },
  {
    name: "Wire Enamel",
    slug: "wire-enamel",
    kind: "industry",
    products: ["Phenol", "Mix Xylene", "1,6 Hexanediol", "C9", "Butyl Glycol", "NMP", "Di Methyl Terephthalate (DMT)"],
  },

  // ---- Page 6 ----
  {
    name: "Adhesives",
    slug: "adhesives",
    kind: "industry",
    products: ["VAM", "BAM", "Styrene", "Acrylic Acid", "2EHA", "MMA", "MAA"],
  },
  {
    name: "Electro Plating",
    slug: "electro-plating",
    kind: "industry",
    products: ["Sodium Cyanide", "Caustic Potash", "Caustic Soda", "Propyl Alcohol", "MEA", "DEA", "Methane Sulfonic Acid", "IPA", "EDC"],
  },
  {
    name: "Agro Chemicals",
    slug: "agro-chemicals",
    kind: "industry",
    image: "/images/ind_agri.png",
    products: ["C9", "Urea", "Cyclohexanone", "MIPA", "DIPE", "DMA", "NMP"],
  },
  {
    name: "Explosives",
    slug: "explosives",
    kind: "industry",
    products: ["Sodium Nitrite", "Sodium Nitrate", "Penta", "Thiourea", "Butyl Acetate"],
  },
  {
    name: "Cleaning & Detergents",
    slug: "cleaning-detergents",
    kind: "industry",
    products: ["Acetone", "Butyl Acetate", "DAA", "DEA", "DPG", "IPA", "Iso Butanol", "Methyl Acetate", "MDC", "Monoethanolamine", "NBA", "N Propanol", "Toluene", "Mix Xylene", "Triethanolamine"],
  },
  {
    name: "Food Colours",
    slug: "food-colours",
    kind: "industry",
    image: "/images/ind_food.png",
    products: ["Citric Acid", "Butyl Carbitol", "Propylene Glycol Mono Methyl Ether", "Iso Propanol", "DMSO", "Xanthan Gum", "Ethyl Diamine", "Acetone", "Caustic Soda", "Hexane", "Glycerine"],
  },
  {
    name: "Bio Diesel",
    slug: "bio-diesel",
    kind: "industry",
    products: ["Methanol", "Caustic Potash Flakes", "Sodium Methoxide"],
  },
  {
    name: "Glass Industry",
    slug: "glass-industry",
    kind: "industry",
    products: ["Sodium Nitrite", "Sodium Nitrate", "Soda Ash Dense"],
  },
];

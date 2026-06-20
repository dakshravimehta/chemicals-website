"""
Fetch verified chemical identity data (formula, molecular weight, CAS) from
PubChem (NIH) for the catalog's recognizable commodity chemicals.

- Only curated, confidently-identified compounds are queried, so the TARGET
  compound is correct; PubChem then supplies the verified formula/MW/CAS.
- Known isomer mixtures / ambiguous names use a fixed authoritative CAS.
- Output: src/data/chem-data.json keyed by exact catalog product name.
- Anything not mapped here is intentionally omitted (page shows "on request").
"""
import json, urllib.request, urllib.parse, re, time, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROP = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{}/property/MolecularFormula,MolecularWeight,IUPACName/JSON"
SYN = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{}/synonyms/JSON"
CASRE = re.compile(r"^\d{2,7}-\d{2}-\d$")

# catalog name -> PubChem query name
MAP = {
    "2-ethyl Hexanol": "2-ethylhexanol",
    "2-ethyl Hexanoic Acid": "2-ethylhexanoic acid",
    "2-ethyl Hexyl Acrylate": "2-ethylhexyl acrylate",
    "2-methyl Tetrahydrofuran (2-mthf)": "2-methyltetrahydrofuran",
    "Acetic Acid": "acetic acid",
    "Acetone": "acetone",
    "Acetonitrile": "acetonitrile",
    "Acetophenone": "acetophenone",
    "Acetyl Acetone": "acetylacetone",
    "Acrylamide": "acrylamide",
    "Acrylic Acid": "acrylic acid",
    "Acrylonitrile": "acrylonitrile",
    "Adipic Acid": "adipic acid",
    "Allyl Alcohol": "allyl alcohol",
    "Aniline Oil": "aniline",
    "Benzoic Acid": "benzoic acid",
    "Benzophenone": "benzophenone",
    "Benzylamine": "benzylamine",
    "Bisphenol-a": "bisphenol a",
    "Butyl Acetate": "butyl acetate",
    "Butyl Acrylate": "butyl acrylate",
    "Butyl Acrylate Monomer": "butyl acrylate",
    "Chloroform": "chloroform",
    "Citric Acid Anhydrous": "citric acid",
    "Citric Acid Monohydrate": "citric acid monohydrate",
    "Cyclohexane": "cyclohexane",
    "Cyclohexanol": "cyclohexanol",
    "Cyclohexanone": "cyclohexanone",
    "Cyclohexylamine": "cyclohexylamine",
    "Diacetone Alcohol": "diacetone alcohol",
    "Diethanolamine": "diethanolamine",
    "Diethyl Carbonate": "diethyl carbonate",
    "Diethylamine": "diethylamine",
    "Diethylene Triamine (Deta)": "diethylenetriamine",
    "Dimethyl Carbonate": "dimethyl carbonate",
    "Dimethyl Formamide": "n,n-dimethylformamide",
    "Dimethyl Acetamide": "n,n-dimethylacetamide",
    "Dimethyl Sulfoxide": "dimethyl sulfoxide",
    "Dipropylene Glycol": "dipropylene glycol",
    "Epichlorohydrine (Ech)": "epichlorohydrin",
    "Ethyl Acetate": "ethyl acetate",
    "Ethyl Acetoacetate": "ethyl acetoacetate",
    "Ethyl Acrylate": "ethyl acrylate",
    "Ethylenediamine (Eda)": "ethylenediamine",
    "Ethylene Dichloride": "1,2-dichloroethane",
    "Ethylene Vinyl Acetate (Eva)": "ethylene vinyl acetate",
    "Formic Acid 85%": "formic acid",
    "Formic Acid 99%": "formic acid",
    "Fumaric Acid": "fumaric acid",
    "Furfuryl Alcohol": "furfuryl alcohol",
    "Gamma Butyrolactone": "gamma-butyrolactone",
    "Glycerine": "glycerol",
    "Glycine": "glycine",
    "Heptane": "heptane",
    "Hexane": "hexane",
    "Hexamine": "hexamethylenetetramine",
    "Hexylene Glycol": "hexylene glycol",
    "Hydrogen Peroxide": "hydrogen peroxide",
    "Hydroquinone (Hq)": "hydroquinone",
    "Imidazole": "imidazole",
    "Iodine": "iodine",
    "Iso Butanol": "isobutanol",
    "Isobutanol": "isobutanol",
    "Isobutyraldehyde": "isobutyraldehyde",
    "Isophorone": "isophorone",
    "Isophthalic Acid": "isophthalic acid",
    "Isophthalic acid": "isophthalic acid",
    "Isopropyl Acetate": "isopropyl acetate",
    "Isopropyl Alcohol": "2-propanol",
    "Maliec Anhydride": "maleic anhydride",
    "Melamine": "melamine",
    "Meta Cresol": "m-cresol",
    "Meta Xylene": "m-xylene",
    "Methanol": "methanol",
    "Methyl Acetoacetate": "methyl acetoacetate",
    "Methyl Acrylate": "methyl acrylate",
    "Methyl Ethyl Ketone": "2-butanone",
    "Methyl Ethyl Ketone (Mek)": "2-butanone",
    "Methy Isobutyl Ketone": "4-methyl-2-pentanone",
    "Methyl Isobutyl Ketone (Mibk)": "4-methyl-2-pentanone",
    "Methyl Methacrylate (Mma)": "methyl methacrylate",
    "Methyl Tertiary Butyl Ether (Mtbe)": "methyl tert-butyl ether",
    "Methylcyclohexane": "methylcyclohexane",
    "Methylene Chloride": "dichloromethane",
    "Monochlorobenzene": "chlorobenzene",
    "Monoethanolamine": "ethanolamine",
    "Monoethylene Glycol (Meg)": "ethylene glycol",
    "Morpholine": "morpholine",
    "N-butanol": "1-butanol",
    "N-butyraldehyde": "butyraldehyde",
    "N-heptane": "heptane",
    "N-hexane 99%": "hexane",
    "N-methyl-2-pyrrolidone (Nmp)": "1-methyl-2-pyrrolidinone",
    "N-pentane": "pentane",
    "N-propanol": "1-propanol",
    "N-propyl Acetate": "propyl acetate",
    "Neopentyl Glycol": "neopentyl glycol",
    "Nitromethane": "nitromethane",
    "Ortho Xylene (Ox)": "o-xylene",
    "Penta erythritol": "pentaerythritol",
    "Perchloroethylene": "tetrachloroethylene",
    "Phenol": "phenol",
    "Phosphoric Acid (Technical)": "phosphoric acid",
    "Phosphoric Acid (Food Grade)": "phosphoric acid",
    "Phthalic Anhydride": "phthalic anhydride",
    "Piperazine Anhydrous": "piperazine",
    "Piperidine": "piperidine",
    "Polyethylene Terephthalate (Pet Resin)": "polyethylene terephthalate",
    "Polyvinyl Alcohol": "polyvinyl alcohol",
    "Propionic Acid": "propionic acid",
    "Propylene Glycol (Technical)": "propylene glycol",
    "Propylene Glycol (Usp)": "propylene glycol",
    "Propylene Glycol Mono Methyl Ether (Pm)": "1-methoxy-2-propanol",
    "Pyridine": "pyridine",
    "Resorcinol": "resorcinol",
    "Soda Ash": "sodium carbonate",
    "Sodium Bicarbonate": "sodium bicarbonate",
    "Sodium Cyanide": "sodium cyanide",
    "Sodium Gluconate": "sodium gluconate",
    "Sodium Nitrate": "sodium nitrate",
    "Sodium Nitrite": "sodium nitrite",
    "Styrene Monomer": "styrene",
    "Tetrahydrofuran": "tetrahydrofuran",
    "Thiourea": "thiourea",
    "Toluene": "toluene",
    "Triethanolamine 85% & 99%": "triethanolamine",
    "Triethylamine": "triethylamine",
    "Urea (Technical Grade)": "urea",
    "Vinyl Acetate Monomer": "vinyl acetate",
    "Diethylene glycol (DEG)": "diethylene glycol",
    "Caustic Soda Lye": "sodium hydroxide",
    "Caustic Potash Flakes": "potassium hydroxide",
    "Potassium Carbonate": "potassium carbonate",
    "Potassium Permanganate": "potassium permanganate",
    "Phenol": "phenol",
}

# Known mixtures / ambiguous names -> fixed authoritative (formula, MW, CAS)
FIXED = {
    "Mix Xylene (Mx)": ("C8H10", "106.16", "1330-20-7"),
    "Mix Xylene": ("C8H10", "106.16", "1330-20-7"),
    "Toluene Diisocyanate (Tdl)": ("C9H6N2O2", "174.16", "26471-62-5"),
    "Toluene Diisocyanate (TDI)": ("C9H6N2O2", "174.16", "26471-62-5"),
    "Methylene Diphenyl Diisocyante (Mdi)": ("C15H10N2O2", "250.25", "26447-40-5"),
    "Methylene diphenyl diisocyanate (MDI)": ("C15H10N2O2", "250.25", "26447-40-5"),
    "Polyvinyl Chloride Resin (Pvc Resin)": ("(C2H3Cl)n", "—", "9002-86-2"),
    "PVC Resin": ("(C2H3Cl)n", "—", "9002-86-2"),
    "Nonylphenol": ("C15H24O", "220.35", "25154-52-3"),
    "Titanium Dioxide": ("O2Ti", "79.87", "13463-67-7"),
}

def get(url):
    try:
        with urllib.request.urlopen(url, timeout=25) as r:
            return json.load(r)
    except Exception as e:
        return {"_err": str(e)[:60]}

def cas_of(query):
    s = get(SYN.format(urllib.parse.quote(query)))
    try:
        for syn in s["InformationList"]["Information"][0]["Synonym"]:
            if CASRE.match(syn):
                return syn
    except Exception:
        pass
    return None

def fetch(query):
    p = get(PROP.format(urllib.parse.quote(query)))
    try:
        pr = p["PropertyTable"]["Properties"][0]
        return pr["MolecularFormula"], str(pr["MolecularWeight"]), pr.get("IUPACName"), cas_of(query)
    except Exception:
        return None

products = json.load(open(os.path.join(ROOT, "src/data/products.json"), encoding="utf-8"))
catalog_names = sorted({p["name"] for p in products})

out, ok, fail = {}, [], []
for name in catalog_names:
    if name in FIXED:
        f, mw, cas = FIXED[name]
        out[name] = {"formula": f, "molarMass": mw, "cas": cas, "source": "fixed"}
        ok.append(name); continue
    q = MAP.get(name)
    if not q:
        continue
    res = fetch(q)
    time.sleep(0.18)
    if res and res[3]:
        f, mw, iupac, cas = res
        out[name] = {"formula": f, "molarMass": mw, "iupac": iupac, "cas": cas, "source": "pubchem", "query": q}
        ok.append(name)
    else:
        fail.append(name)

with open(os.path.join(ROOT, "src/data/chem-data.json"), "w", encoding="utf-8") as fh:
    json.dump(out, fh, indent=2, ensure_ascii=False)

print(f"VERIFIED: {len(ok)}   FAILED: {len(fail)}   (of {len(catalog_names)} distinct names)")
if fail:
    print("FAILED:", ", ".join(fail))

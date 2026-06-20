const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

try {
  const workbook = xlsx.readFile('product list excel.xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  // Read as 2D array
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  const products = [];
  let idCounter = 1;

  for (const row of data) {
    if (row && row.length > 0 && row[0]) {
      const name = String(row[0]).trim();
      if (!name) continue;

      let category = 'Chemicals';
      const nameLower = name.toLowerCase();
      
      if (nameLower.includes('poly') || nameLower.includes('resin') || nameLower.includes('eva')) {
        category = 'Polymers';
      } else if (nameLower.includes('acetate') || nameLower.includes('alcohol') || nameLower.includes('ketone') || nameLower.includes('solvent') || nameLower.includes('benzene') || nameLower.includes('hexane')) {
        category = 'Solvents';
      } else if (nameLower.includes('acid') && (nameLower.includes('citric') || nameLower.includes('ascorbic'))) {
        category = 'Food & Nutrition';
      } else if (nameLower.includes('surfactant') || nameLower.includes('sulfate') || nameLower.includes('sulphate')) {
        category = 'Surfactants';
      }

      // Generate a simple code
      const code = 'AUR-' + name.substring(0, 3).toUpperCase() + '-' + String(idCounter).padStart(3, '0');

      products.push({
        id: String(idCounter),
        name: name,
        category: category,
        code: code,
        description: `High-quality ${name} suitable for various industrial applications.`
      });
      idCounter++;
    }
  }

  const targetDir = path.join(__dirname, 'src', 'data');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(path.join(targetDir, 'products.json'), JSON.stringify(products, null, 2));
  console.log(`Successfully parsed Excel and created products.json with ${products.length} products`);
} catch (error) {
  console.error('Error parsing excel:', error);
}

// utils/getFilterMetadataFromProducts.js
export function getFilterMetadataFromProducts(products, fields) {
    const result = {};
  
    fields.forEach((field) => {
      const values = new Set();
  
      products.forEach((p) => {
        const raw = p[field];
        if (Array.isArray(raw)) {
          raw.forEach((v) => values.add(v));
        } else if (typeof raw === "string") {
          raw.split(",").forEach((v) => values.add(v.trim()));
        } else if (raw) {
          values.add(raw);
        }
      });
  
      result[field] = Array.from(values).sort();
    });
  
    return result;
  }
  
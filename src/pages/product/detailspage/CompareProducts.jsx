import React from "react";

const CompareProducts = ({ products, formatCurrency, addToCart }) => {
  const productsToCompare = products.slice(0, 3);

  // Dynamically extract keys from compareAttributes of the first product
  const attributeKeys = Object.keys(productsToCompare[0]?.compareAttributes || {});

  return (
    <div className="mt-5 px-3">
      <h4 className="mb-3">Compare with Similar Items</h4>
      <div className="table-responsive">
        <table className="table align-middle table-hover border rounded shadow-sm overflow-hidden">
          <thead className="table-light">
            <tr>
              <th className="text-muted">Feature</th>
              {productsToCompare.map((p) => (
                <th key={p.id} className="text-dark fw-semibold">{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Image Row */}
            <tr>
              <td>Image</td>
              {productsToCompare.map((p) => (
                <td key={p.id} className="text-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="img-fluid rounded"
                    style={{ maxHeight: "80px", objectFit: "contain" }}
                  />
                </td>
              ))}
            </tr>

            {/* Dynamic Attribute Rows */}
            {attributeKeys.map((key) => (
              <tr key={key}>
                <td className="text-capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
                {productsToCompare.map((p) => (
                  <td key={p.id}>{p.compareAttributes?.[key] ?? "—"}</td>
                ))}
              </tr>
            ))}

            {/* Price Row (Optional: if not already part of compareAttributes) */}
            {!attributeKeys.includes("price") && (
              <tr>
                <td>Price</td>
                {productsToCompare.map((p) => (
                  <td key={p.id} className="text-danger">
                    {formatCurrency(p.price, p.currency)}
                  </td>
                ))}
              </tr>
            )}

            {/* Add to Cart Row */}
            <tr>
              <td></td>
              {productsToCompare.map((p) => (
                <td key={p.id}>
                  <button
                    className="btn btn-outline-primary btn-sm w-100"
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareProducts;

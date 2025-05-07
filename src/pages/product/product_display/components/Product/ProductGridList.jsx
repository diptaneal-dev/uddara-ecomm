import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import { IconButton } from "react-vector";
import { LayoutList, Columns2, Columns3, Columns4 } from 'lucide-react';

import "./ProductGridList.css";

export const ProductGridList = ({ products, onProductClick, onAddToCart }) => {
    const [layout, setLayout] = useState("grid-3"); // list, grid-2, grid-3, grid-4

    const renderLayoutButtons = () => (
        <div className="layout-toggle">
            <IconButton onClick={() => setLayout("list")} active={layout === "list"}>
                <LayoutList stroke="currentColor" size={20} />
            </IconButton>

            <IconButton onClick={() => setLayout("grid-2")} title="2 Columns" active={layout === "grid-2"}>
                <Columns2 stroke="currentColor" size={20} />
            </IconButton>

            <IconButton onClick={() => setLayout("grid-3")} title="3 Columns" active={layout === "grid-3"}>
                <Columns3 stroke="currentColor" size={20} />
            </IconButton>

            <IconButton onClick={() => setLayout("grid-4")} title="4 Columns" active={layout === "grid-4"}>
                <Columns4 stroke="currentColor" size={20} />
            </IconButton>
        </div>
    );

    return (
        <div className="product-grid-wrapper">
            {renderLayoutButtons()}
            <div className={`product-grid ${layout}`}>
                {products.length ? (
                    products.map((product) => (
                        <ProductCard
                            key={[product.name, product.flavour, product.unit].filter(Boolean).join("|")}
                            product={product}
                            onClick={() => onProductClick(product)}
                            onAddToCart={onAddToCart}
                            layout={layout}
                        />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

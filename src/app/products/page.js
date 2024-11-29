"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Add to cart function from the context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-6">Products</h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg p-4 flex flex-col"
              >
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain mb-4 cursor-pointer"
                  />
                </Link>
                <h2 className="text-lg font-semibold truncate mb-2">
                  {product.title}
                </h2>
                <p className="text-blue-500 font-medium mb-4">${product.price}</p>
                <div className="flex justify-between gap-2">
                  {/* View Details Button */}
                  <Link
                    href={`/products/${product.id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full text-center"
                  >
                    View Details
                  </Link>
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">Loading products...</p>
          </div>
        )}
      </div>
    </div>
  );
}

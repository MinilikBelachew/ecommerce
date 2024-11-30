"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const allProducts = await res.json();
        const filteredProducts = allProducts.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    if (query) fetchProducts();
  }, [query]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-slate-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Search Results for "{query}"
      </h1>
      {products.length === 0 ? (
        <p className="text-gray-600 text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-cover rounded-t-lg transition-all duration-300"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-xl font-semibold">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

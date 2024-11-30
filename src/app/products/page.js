"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context";
import Image from "next/image"; // Using Next.js Image for better performance

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500">Error loading products: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Products</h1>
        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg p-4 flex flex-col transition-transform hover:scale-[1.02]"
              >
                <Link href={`/products/${product.id}`} className="block h-48 relative mb-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>
                <h2 className="text-lg font-semibold truncate mb-2" title={product.title}>
                  {product.title}
                </h2>
                <p className="text-blue-500 font-medium mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  <Link
                    href={`/products/${product.id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-center"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => {
                      addToCart(product);
                      // Optional: Add success feedback here
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
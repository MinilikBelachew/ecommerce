"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/app/context";

export default function ProductDetailsPage() {
  const pathname = usePathname();
  const { addToCart } = useCart();

  const productId = pathname.split("/").pop(); // Extract product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {product ? (
        <div className="container mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <div className="text-gray-600 mb-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            &gt;{" "}
            <Link href="/products" className="hover:underline">
              Products
            </Link>{" "}
            &gt; <span className="capitalize">{product.title}</span>
          </div>

          {/* Product Details */}
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
              <p className="text-2xl font-medium text-blue-500 mb-4">
                ${product.price}
              </p>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <p className="text-gray-500 mb-4">
                <strong>Category:</strong> {product.category}
              </p>
              <button
                      onClick={() => addToCart(product)}

               className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500">Loading product details...</p>
        </div>
      )}
    </div>
  );
}

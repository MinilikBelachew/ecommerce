"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context";

export default function ProductDetailsPage() {
  const pathname = usePathname();
  const { addToCart } = useCart();
  const productId = pathname.split("/").pop();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!res.ok) throw new Error(`Product not found (${res.status})`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000); // Reset after 2 seconds
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link 
            href="/products" 
            className="text-blue-500 hover:underline"
          >
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : product ? (
        <div className="container pt-16 mx-auto px-4 sm:px-6 py-10">
          {/* Breadcrumb */}
          {/* <nav className="text-gray-600 mb-6 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-blue-500 transition">
              Home
            </Link>
            <span>&gt;</span>
            <Link href="/products" className="hover:text-blue-500 transition">
              Products
            </Link>
            <span>&gt;</span>
            <span className="text-gray-800 truncate max-w-[200px]">
              {product.title}
            </span>
          </nav> */}

          {/* Product Details */}
          <div className="flex flex-col md:flex-row gap-10 bg-white rounded-lg shadow-lg p-6">
            <div className="md:w-1/2 relative min-h-[400px]">
              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
            
            <div className="md:w-1/2 flex flex-col">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                {product.title}
              </h1>
              <p className="text-2xl font-medium text-blue-500 mb-4">
                ${product.price.toFixed(2)}
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <span className="font-semibold">Category:</span>
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm capitalize">
                  {product.category}
                </span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{product.rating?.rate || 'N/A'}</span>
                </div>
                <span className="text-gray-500">
                  ({product.rating?.count || 0} reviews)
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`px-6 py-3 rounded-lg transition-all ${
                  addedToCart 
                    ? 'bg-green-600 text-white cursor-default'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {addedToCart ? 'Added to Cart! ✓' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
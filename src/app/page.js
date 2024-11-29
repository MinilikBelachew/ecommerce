"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "./context";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { cart, addToCart } = useCart(); // Use the cart context

  // Fetch categories and products from the FakeStoreAPI
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      setCategories(data);
    };

    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products?limit=8");
      const data = await res.json();
      setProducts(data);
    };

    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20 mt-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-extrabold leading-tight">
            Shop the Future <span className="text-yellow-300">Today</span>
          </h2>
          <p className="mt-6 text-lg">
            Discover the latest trends in electronics, fashion, and more!
          </p>
          <button className="mt-8 px-6 py-3 bg-yellow-300 text-blue-700 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition">
            Start Shopping
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <section className="container mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center mb-10">Explore Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categories/${category}`}
              className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-2 transform transition"
            >
              <h2 className="text-lg font-medium capitalize text-center">{category}</h2>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-10">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-2 transform transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <h4 className="text-lg font-medium truncate">{product.title}</h4>
                <p className="text-gray-500 mt-2">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="container mx-auto px-6 text-center">
          <h4 className="text-lg font-semibold text-gray-300">
            E-Shop<span className="text-blue-500">.io</span>
          </h4>
          <p className="mt-4">
            &copy; {new Date().getFullYear()} E-Shop.io. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

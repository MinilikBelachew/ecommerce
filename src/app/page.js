"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "./context";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { cart, addToCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen bg-[#0a0a1f] text-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3f] to-[#0a0a1f]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden py-32 mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 backdrop-blur-3xl"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-7xl font-black leading-tight tracking-tighter mb-8 bg-gradient-to-r from-violet-400 via-fuchsia-500 to-orange-500 text-transparent bg-clip-text animate-fadeIn">
              The Future of Shopping is Here
            </h2>
            <p className="text-2xl text-gray-300 mb-12 animate-slideUp">
              Experience the next generation of e-commerce
            </p>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(167,139,250,0.5)]">
              <span className="relative z-10">Explore Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-fuchsia-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="container mx-auto px-6 py-24">
        <h3 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-fuchsia-500 text-transparent bg-clip-text">
          Browse Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category}
              href={`/categories/${category}`}
              className="group animate-fadeIn relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h2 className="text-xl font-semibold capitalize text-center relative z-10">
                  {category}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-900/10 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <h3 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-fuchsia-500 text-transparent bg-clip-text">
            Featured Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group animate-fadeIn relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 p-6 hover:border-violet-500/50 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 p-4 mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-lg font-medium truncate">{product.title}</h4>
                <p className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 text-transparent bg-clip-text mt-2">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(167,139,250,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-400">
            <div>
              <h4 className="text-xl font-bold text-white mb-4">About Us</h4>
              <p>Your premier destination for online shopping, offering quality products and exceptional service.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <Link href={`/category/${category}`} className="hover:text-violet-400 transition-colors">
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Contact</h4>
              <p>Email: support@eshop.io</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} E-Shop.io. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
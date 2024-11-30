"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

// Custom icons for categories
const CategoryIcons = {
  "electronics": (
    <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      <path d="M16 7l-1.41-1.41L10.5 10.17 12 11.59 16 7zm4 0l-1.41-1.41L14.5 10.17 16 11.59 20 7z"/>
    </svg>
  ),
  "jewelery": (
    <svg className="w-16 h-16 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
    </svg>
  ),
  "men's clothing": (
    <svg className="w-16 h-16 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 5v14h18V5H3zm8 12H5V7h6v10zm10 0h-6V7h6v10zm-5-9h-4V6h4v2z"/>
    </svg>
  ),
  "women's clothing": (
    <svg className="w-16 h-16 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M15.55 11.5c.23 0 .45-.1.6-.25l4.43-4.43-1.41-1.41-3.62 3.62-2.19-2.19h-2.66l2.75 2.75-2.54 2.54c-.63.63-.18 1.71.71 1.71.23 0 .45-.1.6-.25l2.74-2.74 1.95 1.95c.15.15.36.25.6.25z"/>
    </svg>
  )
};

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500"></div>
          <p className="mt-4 text-xl text-indigo-600 font-semibold">
            Loading Categories...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Shop by Category
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category}
              href={`/categories/${category}`}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-xl transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl p-6 text-center">
                <div className="flex justify-center mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {CategoryIcons[category]}
                </div>
                <h2 className="text-xl font-bold text-gray-800 capitalize mb-2 group-hover:text-indigo-600 transition-colors">
                  {category}
                </h2>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  Explore our wide range of {category} products
                </p>
                <div className="flex justify-center">
                  <span className="text-indigo-500 font-semibold group-hover:underline">
                    Browse Collection →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
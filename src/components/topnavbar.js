"use client";

import { useCart } from "@/app/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TopNavBar() {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-blue-500 hover:text-blue-600 transition-all duration-300">
          ShopEase
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-gray-700 hover:text-blue-500 transition-all duration-300">
            Home
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-blue-500 transition-all duration-300">
            Products
          </Link>
          <Link href="/categories" className="text-gray-700 hover:text-blue-500 transition-all duration-300">
            Categories
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-500 transition-all duration-300">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-500 transition-all duration-300">
            Contact
          </Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="px-4 py-2 rounded-l-lg text-black border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
          />
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded-r-lg text-white hover:bg-blue-600 transition-all duration-300"
          >
            Search
          </button>
        </form>

        {/* User and Cart Icons */}
        <div className="flex items-center gap-6">
          <Link href="/profile" className="text-gray-700 hover:text-blue-500 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zm0 0v1.8a7.5 7.5 0 01-7.5 7.5v0a7.5 7.5 0 01-7.5-7.5V9a7.5 7.5 0 0115 0z"
              />
            </svg>
          </Link>
          <Link href="/cart" className="text-gray-700 hover:text-blue-500 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-.4 2m13-2l-.4 2m0 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0M7 15a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {cart.length}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 hover:text-blue-500 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-gray-50 md:hidden">
          <nav className="flex flex-col gap-4 p-4">
            <Link href="/" className="text-gray-700 hover:text-blue-500 transition-all duration-300">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-500 transition-all duration-300">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-500 transition-all duration-300">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-500 transition-all duration-300">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-500 transition-all duration-300">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

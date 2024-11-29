"use client"

import { useState, useEffect } from "react";

export default function ElectronicsPage() {
  const [products, setProducts] = useState([]);

  // Fetch electronics products
  useEffect(() => {
    const fetchElectronicsProducts = async () => {
      try {
        const res = await fetch(
          "https://fakestoreapi.com/products/category/electronics"
        );
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching electronics:", error);
      }
    };

    fetchElectronicsProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-6">
          <nav className="text-gray-600">
            <a href="/" className="hover:underline">
              Home
            </a>{" "}
            &gt;{" "}
            <a href="/categories" className="hover:underline">
              Categories
            </a>{" "}
            &gt; <span className="capitalize">Electronics</span>
          </nav>
        </div>
      </div>

      {/* Electronics Title */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center">Electronics</h2>
        <p className="text-center text-gray-600 mt-2">
          Discover the latest gadgets and electronics at unbeatable prices.
        </p>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-2 transform transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-lg font-medium truncate">{product.title}</h3>
                <p className="text-gray-500 mt-2">${product.price}</p>
                <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-gray-500">
                No products found in the Electronics category. Please try again later.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

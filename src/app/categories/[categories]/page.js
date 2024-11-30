"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const pathname = usePathname();
  const category = pathname.split("/").pop(); // Extract category from URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        );
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Breadcrumb */}
      {/* <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <nav className="text-gray-600">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            &gt;{" "}
            <Link href="/category" className="hover:underline">
              Categories
            </Link>{" "}
            &gt; <span className="capitalize">{category}</span>
          </nav>

          <Link href="/category">
            <button className="text-blue-500 hover:underline">
              Back to Categories
            </button>
          </Link>
        </div>
      </div> */}

      {/* Category Title */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center capitalize">
          {category}
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Browse the best products in {category}.
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
                No products found in the {category} category. Please try again
                later.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

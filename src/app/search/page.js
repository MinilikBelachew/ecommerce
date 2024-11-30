import Link from "next/link";

async function fetchProducts(query) {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const allProducts = await res.json();
  return allProducts.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.query || "";
  const products = query ? await fetchProducts(query) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-6 bg-indigo-600 text-white">
            <h1 className="text-4xl font-extrabold text-center tracking-tight">
              Search Results 
              {query && <span className="ml-2 text-indigo-100">"{query}"</span>}
            </h1>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center">
              <svg 
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" 
                />
              </svg>
              <p className="mt-4 text-xl text-gray-500">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="relative h-64 w-full">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="absolute inset-0 h-full w-full object-contain p-4 transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="p-5 bg-gray-50">
                      <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                        {product.title}
                      </h2>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-extrabold text-indigo-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <div className="flex items-center text-yellow-500">
                          <svg 
                            className="h-5 w-5" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-gray-600">
                            {product.rating.rate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
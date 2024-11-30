"use client";

import { useCart } from "../context";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh]  flex flex-col items-center justify-center p-4">
        <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
        <Link
          href="/products"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId, itemTitle) => {
    if (window.confirm(`Remove "${itemTitle}" from cart?`)) {
      removeFromCart(itemId);
    }
  };

  return (
    <div className="container  mx-auto p-4 sm:p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden ">
        <div className="p-6 pt-24">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
            Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
          </h1>

          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div
                key={item.id}
                className="py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain rounded-lg"
                    sizes="96px"
                  />
                </div>

                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mb-2">${item.price.toFixed(2)} each</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-12 text-center border-x py-1"
                        aria-label="Quantity"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id, item.title)}
                  className="text-red-500 hover:text-red-600 transition"
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="space-y-2 text-right">
              <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
              <p className="text-gray-600">Tax (10%): ${tax.toFixed(2)}</p>
              <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                  }
                }}
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={() => alert('Checkout functionality coming soon!')}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
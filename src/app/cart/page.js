"use client";

import { useCart } from "../context";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0)
    return (
      <div className="p-4 text-center text-xl text-gray-500">
        Your cart is empty.
      </div>
    );

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
        Your Cart
      </h1>
      <ul>
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-4 mb-4 border-b border-gray-200 hover:bg-gray-50 rounded-lg transition ease-in-out duration-300"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-sm text-gray-600">${item.price}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition duration-300"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
        >
          Clear Cart
        </button>
        <div className="text-right">
          <p className="text-xl font-semibold text-gray-800">
            Total: $
            {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

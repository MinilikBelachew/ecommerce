// app/profile/page.tsx
'use client';

import { useState } from 'react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Premium Member',
    joinDate: 'March 2024',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2U2ZTZlNiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMzYiIHI9IjIwIiBmaWxsPSIjOTk5Ii8+PHBhdGggZD0iTTIwLDg1IGMwLC0zMCA2MC0zMCA2MCwwIiBmaWxsPSIjOTk5Ii8+PC9zdmc+',
    stats: {
      orders: 12,
      wishlist: 8,
      reviews: 4,
      points: 1250
    },
    orders: [
      { id: 1, date: '2024-03-28', status: 'Delivered', total: '$129.99', items: 3 },
      { id: 2, date: '2024-03-25', status: 'Processing', total: '$79.99', items: 1 },
      { id: 3, date: '2024-03-20', status: 'Delivered', total: '$199.99', items: 2 },
    ],
    wishlist: [
      { id: 1, name: 'Premium Headphones', price: '$199.99', inStock: true, image: '🎧' },
      { id: 2, name: 'Wireless Mouse', price: '$49.99', inStock: true, image: '🖱️' },
      { id: 3, name: 'Mechanical Keyboard', price: '$159.99', inStock: false, image: '⌨️' },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative h-60 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 flex justify-center">
              <div className="relative group">
                <div className="w-36 h-36 rounded-full border-4 border-white shadow-lg overflow-hidden transition-transform group-hover:scale-105">
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-2 right-2 bg-white text-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 opacity-0 group-hover:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.name}</h1>
            <p className="text-gray-500 mb-4">{user.email}</p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 text-purple-600 text-sm font-medium">
              {user.role} · Joined {user.joinDate}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mt-8">
              {Object.entries(user.stats).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  <div className="text-sm text-gray-500 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="max-w-3xl mx-auto px-4">
              <nav className="flex justify-center -mb-px space-x-8">
                {['profile', 'orders', 'wishlist'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-6 px-3 border-b-2 font-medium text-sm capitalize transition-all duration-200`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto px-4 py-8">
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Personal Information
                    </h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                        isEditing
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'text-purple-600 hover:bg-purple-50'
                      }`}
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          disabled={!isEditing}
                          defaultValue={user.name}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          disabled={!isEditing}
                          defaultValue={user.email}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                {user.orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-gray-900">
                            Order #{order.id}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {order.date} · {order.items} items
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          {order.total}
                        </p>
                        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-2">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl text-2xl">
                        {item.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-purple-600 font-medium">{item.price}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            item.inStock
                              ? 'bg-purple-600 text-white hover:bg-purple-700'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          } transition-all duration-200`}
                          disabled={!item.inStock}
                        >
                          {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
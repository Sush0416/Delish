import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Truck, Clock, Home } from "lucide-react";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurant, cartItems, totalPrice, orderId, estimatedDelivery } = location.state || {};

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Order Found</h2>
          <button 
            onClick={() => navigate("/restaurants")}
            className="bg-[#ff6b6b] text-white px-6 py-3 rounded-lg"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">Thank you for your order</p>
          <p className="text-gray-500 mb-8">We've sent a confirmation to your email</p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold text-gray-900">{orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Restaurant</p>
                <p className="font-semibold text-gray-900">{restaurant.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-semibold text-[#ff6b6b]">₹{totalPrice?.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery</p>
                <p className="font-semibold text-gray-900">{estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center">
              <Truck className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm text-gray-600">Preparing your order</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-orange-500 mr-2" />
              <span className="text-sm text-gray-600">{estimatedDelivery}</span>
            </div>
          </div>

          {/* Order Items Preview */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Your Order</h3>
            <div className="space-y-2">
              {cartItems?.slice(0, 3).map((item) => (
                <div key={item.item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.item.name} × {item.quantity}
                  </span>
                  <span className="text-gray-900">₹{item.item.price * item.quantity}</span>
                </div>
              ))}
              {cartItems && cartItems.length > 3 && (
                <p className="text-sm text-gray-500">+{cartItems.length - 3} more items</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/restaurants")}
              className="flex-1 bg-[#ff6b6b] text-white py-3 rounded-lg hover:bg-[#ff5252] transition font-semibold flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Order Again
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
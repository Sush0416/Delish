import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Wallet, Shield } from "lucide-react";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurant, cartItems, totalPrice, deliveryFee, tax } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  if (!restaurant || !cartItems) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">💳</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Order Information</h2>
          <p className="text-gray-600 mb-6">Please go back and complete your order first.</p>
          <button 
            onClick={() => navigate("/restaurants")}
            className="bg-[#ff6b6b] text-white px-6 py-3 rounded-lg hover:bg-[#ff5252] transition font-semibold"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  const subtotal = totalPrice - deliveryFee - tax;
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      navigate("/thank-you", {
        state: {
          restaurant,
          cartItems,
          totalPrice,
          orderId: `ORD${Date.now()}`,
          estimatedDelivery: "30-40 mins"
        }
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-[#ff6b6b] transition-colors mr-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Payment</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-12 h-12 rounded-lg object-cover mr-3"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {cartItems.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{cartItem.item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {cartItem.quantity}</p>
                      {cartItem.customizations && Object.keys(cartItem.customizations).length > 0 && (
                        <p className="text-xs text-gray-500">
                          {Object.entries(cartItem.customizations).map(([key, value]) => 
                            `${key}: ${value}`
                          ).join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{cartItem.item.price * cartItem.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (5% GST)</span>
                  <span className="text-gray-900">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total Amount</span>
                  <span className="text-[#ff6b6b]">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h2>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="font-semibold text-gray-900">John Doe</p>
                <p className="text-gray-600">123 Main Street, Apartment 4B</p>
                <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
                <p className="text-gray-600">Phone: +91 98765 43210</p>
              </div>
              <button className="mt-3 text-[#ff6b6b] font-semibold hover:text-[#ff5252] transition-colors">
                Change Address
              </button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
              
              {/* Payment Options */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    paymentMethod === "card" 
                      ? "border-[#ff6b6b] bg-red-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <CreditCard className={`w-5 h-5 mr-3 ${
                      paymentMethod === "card" ? "text-[#ff6b6b]" : "text-gray-400"
                    }`} />
                    <div>
                      <p className="font-semibold text-gray-900">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Pay with your card</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    paymentMethod === "upi" 
                      ? "border-[#ff6b6b] bg-red-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <Smartphone className={`w-5 h-5 mr-3 ${
                      paymentMethod === "upi" ? "text-[#ff6b6b]" : "text-gray-400"
                    }`} />
                    <div>
                      <p className="font-semibold text-gray-900">UPI Payment</p>
                      <p className="text-sm text-gray-600">Google Pay, PhonePe, etc.</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    paymentMethod === "cod" 
                      ? "border-[#ff6b6b] bg-red-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <Wallet className={`w-5 h-5 mr-3 ${
                      paymentMethod === "cod" ? "text-[#ff6b6b]" : "text-gray-400"
                    }`} />
                    <div>
                      <p className="font-semibold text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center p-3 bg-green-50 border border-green-200 rounded-lg mb-6">
                <Shield className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-green-700 font-medium">Secure SSL Encryption</span>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={processing}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
                  processing 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-[#ff6b6b] hover:bg-[#ff5252] shadow-lg shadow-[#ff6b6b]/25"
                }`}
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Pay ₹${totalPrice.toFixed(2)}`
                )}
              </button>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-4">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
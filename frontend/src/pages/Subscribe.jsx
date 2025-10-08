import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Subscribe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTiffin } = location.state || {};
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);

  if (!selectedTiffin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">No subscription selected.</p>
      </div>
    );
  }

  const handlePayment = () => {
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      navigate('/thankyou', { state: { selectedTiffin } });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Confirm Subscription</h1>

        <p className="text-gray-700 mb-1 text-center">You selected:</p>
        <h2 className="text-xl font-semibold mb-4 text-center">{selectedTiffin.name}</h2>

        <p className="text-gray-600 mb-6 text-center">
          Price: <span className="font-medium">₹{selectedTiffin.price}/month</span>
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePayment();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              pattern="\d{16}"
              title="Enter 16 digit card number"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Expiry</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                pattern="(0[1-9]|1[0-2])\/\d{2}"
                title="Enter expiry in MM/YY format"
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 mb-1">CVC</label>
              <input
                type="text"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                pattern="\d{3,4}"
                title="Enter 3 or 4 digit CVC"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
          >
            {loading && (
              <div className="loader mr-2 border-t-2 border-b-2 border-white w-4 h-4 rounded-full animate-spin"></div>
            )}
            {loading ? 'Processing...' : 'Confirm Payment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;

import React from 'react';

const TiffinPlanCard = ({ plan }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <img
        src={plan.image || '/placeholder-food.png'}
        alt={plan.name}
        className="w-full h-48 object-cover"
      />

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h2>
          {plan.type && (
            <p className="text-sm text-gray-500 mb-2 capitalize">{plan.type}</p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-orange-500 font-bold text-lg">₹{plan.price}</span>
          <button className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default TiffinPlanCard;

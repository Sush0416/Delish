import React from 'react';

const TiffinPlanCard = ({ plan }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image with restaurant overlay */}
      <div className="relative h-48 w-full">
        <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
        <p className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
          {plan.restaurant}
        </p>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
        <p className="mt-2 font-bold text-orange-500 text-lg">₹{plan.price}</p>
      </div>
    </div>
  );
};

export default TiffinPlanCard;

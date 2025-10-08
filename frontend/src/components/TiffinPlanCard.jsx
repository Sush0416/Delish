import { useNavigate } from "react-router-dom";

const TiffinPlanCard = ({ plan }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img src={plan.image} alt={plan.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{plan.name}</h3>
        <p className="text-sm text-gray-500">{plan.restaurant}</p>
        <p className="font-bold text-orange-500 mt-2">₹{plan.price}</p>
        <button
          onClick={() => navigate("/subscribe", { state: { plan } })}
          className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

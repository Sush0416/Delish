import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TiffinServices.css';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

const TiffinServices = () => {
  const [tiffins, setTiffins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscribing, setSubscribing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTiffins();
  }, []);

  const fetchTiffins = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/tiffins');
      const plans = response.data.plans.map(t => ({ ...t, available: true }));
      setTiffins(plans);
      setError(null);
    } catch (err) {
      console.error('Error fetching tiffins:', err);
      setError();
      setTiffins(getDemoTiffins());
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (tiffinId) => {
    try {
      setSubscribing(tiffinId);

      // Simulate a short delay for processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      const tiffin = tiffins.find(t => t._id === tiffinId);
      if (!tiffin) throw new Error('Tiffin not found');

      // Navigate to Subscribe page with selected tiffin
      navigate('/subscribe', { state: { selectedTiffin: tiffin } });

    } catch (error) {
      alert('❌ Subscription failed. Please try again.');
      console.error(error);
    } finally {
      setSubscribing(null);
    }
  };

  const getDemoTiffins = () => [
    {
      _id: '1',
      name: 'Veg Delight',
      description: 'Healthy vegetarian meals with fresh vegetables, dal, roti, rice, and salad. Perfect for balanced nutrition.',
      price: 150,
      category: 'vegetarian',
      image: '/images/tiffins/veg-delight.jpg',
      available: true
    },
    {
      _id: '2',
      name: 'Protein Packed',
      description: 'High protein meals with paneer, soy, legumes, sprouts and healthy grains. Build muscle and stay full.',
      price: 200,
      category: 'vegetarian',
      image: '/images/tiffins/protein-packed.jpg',
      available: true
    },
    {
      _id: '3',
      name: 'Non-Veg Special',
      description: 'Delicious non-vegetarian meals with chicken curry, fish fry, or mutton options. Rich in flavor.',
      price: 220,
      category: 'non-vegetarian',
      image: '/images/tiffins/non-veg-special.jpg',
      available: true
    },
    {
      _id: '4',
      name: 'Jain Meals',
      description: 'Pure vegetarian Jain meals without onion and garlic. Prepared with rootless vegetables only.',
      price: 180,
      category: 'jain',
      image: '/images/tiffins/jain-meals.jpg',
      available: true
    },
    {
      _id: '5',
      name: 'Eggetarian Delight',
      description: 'Vegetarian meals with egg options like boiled eggs, egg curry, and omelets. Rich in protein.',
      price: 170,
      category: 'eggetarian',
      image: '/images/tiffins/eggetarian-delight.jpg',
      available: true
    },
    {
      _id: '6',
      name: 'Weight Loss Diet',
      description: 'Specially curated low-calorie meals for weight management. Balanced nutrition with portion control.',
      price: 250,
      category: 'vegetarian',
      image: '/images/tiffins/weight-loss-diet.jpg',
      available: true
    },
    {
      _id: '7',
      name: 'South Indian Meals',
      description: 'Authentic South Indian meals with sambar, rasam, curd rice, and variety of chutneys.',
      price: 190,
      category: 'vegetarian',
      image: '/images/tiffins/south-indian-meals.jpg',
      available: true
    },
    {
      _id: '8',
      name: 'Punjabi Tadka',
      description: 'North Indian specialities with butter naan, paneer butter masala, dal tadka, and lassi.',
      price: 210,
      category: 'vegetarian',
      image: '/images/tiffins/punjabi-tadka.jpg',
      available: true
    },
    {
      _id: '9',
      name: 'Seafood Lovers',
      description: 'Fresh seafood delights including fish curry, prawn masala, and crab preparations.',
      price: 280,
      category: 'non-vegetarian',
      image: '/images/tiffins/seafood-lovers.jpg',
      available: true
    },
    {
      _id: '10',
      name: 'Keto Diet Plan',
      description: 'Low-carb, high-fat keto meals perfect for weight loss and maintaining ketosis.',
      price: 300,
      category: 'non-vegetarian',
      image: '/images/tiffins/keto-diet-plan.jpg',
      available: true
    }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tiffin services...</p>
      </div>
    );
  }

  return (
    <div className="tiffin-services pt-28">

      <div className="container">
        <h1 className="page-title">Our Tiffin Services</h1>
        <p className="page-subtitle">Fresh, homemade meals delivered daily to your doorstep</p>
        
        {error && (
          <div className="error-message">{error}</div>
        )}

        <div className="tiffin-grid">
          {tiffins.map((tiffin) => (
            <div key={tiffin._id} className="tiffin-card">
              <div className="tiffin-image-container">
                <img 
                  src={tiffin.image} 
                  alt={tiffin.name}
                  className="tiffin-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = e.target.nextElementSibling;
                    if (placeholder) {
                      placeholder.style.display = 'flex';
                      const colors = {
                        vegetarian: '#4CAF50',
                        'non-vegetarian': '#F44336',
                        jain: '#FF9800',
                        eggetarian: '#2196F3'
                      };
                      placeholder.style.background = colors[tiffin.category] || '#667eea';
                    }
                  }}
                />
                <div className="image-placeholder">
                  <div className="placeholder-icon">
                    {tiffin.category === 'vegetarian' && '🥗'}
                    {tiffin.category === 'non-vegetarian' && '🍗'}
                    {tiffin.category === 'jain' && '🪷'}
                    {tiffin.category === 'eggetarian' && '🥚'}
                  </div>
                  <div className="placeholder-text">{tiffin.name}</div>
                </div>
                <div className="tiffin-overlay">
                  <span className={`tiffin-badge ${tiffin.category}`}>
                    {tiffin.category}
                  </span>
                </div>
              </div>
              <div className="tiffin-info">
                <h3 className="tiffin-name">{tiffin.name}</h3>
                <p className="tiffin-description">{tiffin.description}</p>
                <div className="tiffin-features">
                  <span className="feature">🍛 Daily Fresh</span>
                  <span className="feature">🚚 Free Delivery</span>
                  <span className="feature">⏰ Timely Service</span>
                </div>
                <div className="tiffin-meta">
                  <span className="price">₹{tiffin.price}/month</span>
                  <span className="rating">⭐ 4.5/5</span>
                </div>
                <button 
                  className={`subscribe-btn ${!tiffin.available ? 'disabled' : ''}`}
                  onClick={() => handleSubscribe(tiffin._id)}
                  disabled={!tiffin.available || subscribing === tiffin._id}
                >
                  {subscribing === tiffin._id ? (
                    <>
                      <div className="btn-spinner"></div>
                      Processing...
                    </>
                  ) : tiffin.available ? (
                    'Subscribe Now'
                  ) : (
                    'Subscribed'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TiffinServices;

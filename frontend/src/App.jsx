import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

// Components
import AnimatedHeader from './components/layout/AnimatedHeader'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Restaurants from './pages/Restaurants'
import TiffinServices from './pages/TiffinServices'
import RestaurantDetail from './pages/RestaurantDetail'
import TiffinPlanDetail from './pages/TiffinPlanDetail'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <AnimatedHeader />
      
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route path="/tiffin-services" element={<TiffinServices />} />
            <Route path="/tiffin-plans/:id" element={<TiffinPlanDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  )
}

export default App
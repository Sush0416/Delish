# 🍔 Delish - Food Delivery App

A full-stack MERN food delivery application with restaurant and tiffin services.

## 🚀 Features

- Restaurant listings and menu management
- Tiffin service subscriptions
- User authentication and profiles
- Order management and tracking
- Real-time notifications
- Payment integration

## 🛠 Tech Stack

- **Frontend**: React, React Router, Framer Motion, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Payments**: Stripe/Razorpay (to be implemented)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sush0416/Delish.git
   cd Delish
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` in the root directory
   - Copy `.env.example` to `server/.env` for server-specific variables
   - Update the variables with your actual values

4. **Database Setup**
   - Make sure MongoDB is running on your system
   - Update `MONGODB_URI` in your environment variables

5. **Run the application**
   ```bash
   # Development mode (both client and server)
   npm run dev

   # Or run separately
   npm run server  # Backend only
   npm run client  # Frontend only
   ```

## 📁 Project Structure

```
Delish/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── App.js         # Main App component
│   └── package.json
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Database configuration
│   ├── utils/            # Utility functions
│   └── server.js         # Server entry point
└── package.json          # Root package.json
```

## 🔧 Available Scripts

- `npm run dev` - Run both client and server in development
- `npm run server` - Run only the backend server
- `npm run client` - Run only the frontend
- `npm run build` - Build the React app for production
- `npm start` - Run production server

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | User registration |
| POST | /api/auth/login | User login |
| GET | /api/restaurants | Get all restaurants |
| GET | /api/restaurants/:id | Get single restaurant |
| POST | /api/orders | Create new order |
| GET | /api/orders/:id | Get order details |

## 📝 Environment Variables

See `.env.example` for all required environment variables.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

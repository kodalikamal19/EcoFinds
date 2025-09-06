# 🌱 EcoFinds - Sustainable Second-Hand Marketplace

EcoFinds is a modern, sustainable second-hand marketplace built with React, FastAPI, and PostgreSQL. It empowers users to buy and sell pre-owned goods, promoting a circular economy and reducing waste.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure registration and login system
- **Product Management**: Create, read, update, and delete product listings
- **Search & Filter**: Find products by keywords and categories
- **Shopping Cart**: Add items to cart and manage quantities
- **Purchase System**: Complete purchases and track order history
- **User Dashboard**: Manage profile and view account information

### User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Category System**: Organized product categories for easy browsing
- **Image Support**: Product image placeholders (ready for real image uploads)

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **PostgreSQL**: Robust relational database
- **SQLAlchemy**: Python SQL toolkit and ORM
- **JWT Authentication**: Secure token-based authentication
- **Pydantic**: Data validation using Python type annotations

### Frontend
- **React**: Modern JavaScript library for building user interfaces
- **React Router**: Declarative routing for React
- **Axios**: HTTP client for API communication
- **CSS3**: Modern styling with responsive design

## 📋 Prerequisites

Before running the application, make sure you have:

- **Python 3.8+** installed
- **Node.js 16+** and npm installed
- **PostgreSQL** database server running
- **Git** for cloning the repository

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd odoo_hackathon
```

### 2. Set Up the Backend

#### Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Configure Database
1. Create a PostgreSQL database named `ecofinds`
2. Update the database URL in `backend/database.py` if needed:
   ```python
   DATABASE_URL = "postgresql://username:password@localhost/ecofinds"
   ```

#### Initialize Database
```bash
python init_db.py
```

#### Start the Backend Server
```bash
python main.py
```
The API will be available at `http://localhost:8000`

### 3. Set Up the Frontend

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start the Development Server
```bash
npm start
```
The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
ecofinds/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── auth.py              # Authentication utilities
│   ├── init_db.py           # Database initialization script
│   ├── requirements.txt     # Python dependencies
│   └── routers/
│       ├── auth.py          # Authentication routes
│       ├── users.py         # User management routes
│       ├── products.py      # Product CRUD routes
│       ├── cart.py          # Shopping cart routes
│       └── purchases.py     # Purchase history routes
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts (Auth)
│   │   ├── services/        # API service layer
│   │   └── App.js           # Main application component
│   └── package.json         # Node.js dependencies
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile

### Products
- `GET /api/products/` - List products (with search and filter)
- `GET /api/products/{id}` - Get product details
- `POST /api/products/` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/products/my/listings` - Get user's products
- `GET /api/products/categories` - List categories

### Cart
- `GET /api/cart/` - Get cart items
- `POST /api/cart/` - Add item to cart
- `PUT /api/cart/{id}` - Update cart item quantity
- `DELETE /api/cart/{id}` - Remove item from cart
- `DELETE /api/cart/` - Clear cart

### Purchases
- `GET /api/purchases/` - Get purchase history
- `POST /api/purchases/` - Complete purchase
- `GET /api/purchases/{id}` - Get purchase details

## 🎨 UI Components

### Pages
- **Home**: Landing page with feature highlights
- **Login/Register**: Authentication forms
- **Product List**: Browse products with search and filters
- **Product Detail**: Detailed product view with add to cart
- **Dashboard**: User profile management
- **Add Product**: Create new product listings
- **My Listings**: Manage user's products
- **Cart**: Shopping cart management
- **Purchase History**: View past purchases

### Key Features
- **Responsive Design**: Mobile-first approach
- **Modern Styling**: Clean, professional appearance
- **Interactive Elements**: Smooth hover effects and transitions
- **Form Validation**: Client-side validation with error handling
- **Loading States**: User feedback during API calls

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt password hashing
- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Server-side data validation
- **SQL Injection Protection**: SQLAlchemy ORM protection

## 🌱 Sustainability Focus

EcoFinds promotes sustainable consumption by:
- **Extending Product Lifecycle**: Giving items a second life
- **Reducing Waste**: Preventing items from ending up in landfills
- **Building Community**: Connecting like-minded sustainable consumers
- **Promoting Circular Economy**: Encouraging reuse over new purchases

## 🚀 Future Enhancements

- **Image Upload**: Real image upload functionality
- **Payment Integration**: Stripe/PayPal payment processing
- **Messaging System**: Communication between buyers and sellers
- **Reviews & Ratings**: User feedback system
- **Advanced Search**: More sophisticated filtering options
- **Mobile App**: React Native mobile application
- **Admin Panel**: Administrative interface for platform management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built for the Odoo Hackathon
- Inspired by sustainable consumption movements
- Thanks to the open-source community for the amazing tools and libraries

---

**EcoFinds** - Empowering Sustainable Consumption through Second-Hand Marketplace 🌱

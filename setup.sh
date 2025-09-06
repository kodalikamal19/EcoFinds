#!/bin/bash

echo "🌱 Setting up EcoFinds - Sustainable Second-Hand Marketplace"
echo "=========================================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ and try again."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL and try again."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Setup backend
echo ""
echo "🔧 Setting up backend..."
cd backend

# Create virtual environment
echo "Creating Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Initialize database
echo "Initializing database..."
python init_db.py

echo "✅ Backend setup completed!"

# Setup frontend
echo ""
echo "🔧 Setting up frontend..."
cd ../frontend

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

echo "✅ Frontend setup completed!"

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "To start the application:"
echo "1. Start the backend server:"
echo "   cd backend && source venv/bin/activate && python main.py"
echo ""
echo "2. Start the frontend server (in a new terminal):"
echo "   cd frontend && npm start"
echo ""
echo "3. Open your browser and go to: http://localhost:3000"
echo ""
echo "🌱 Happy sustainable shopping with EcoFinds!"

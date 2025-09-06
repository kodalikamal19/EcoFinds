#!/usr/bin/env python3
"""
Database initialization script for EcoFinds
This script creates the database tables and populates initial data
"""

import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import Base, engine
from models import Category

def init_database():
    """Initialize the database with tables and initial data"""
    
    # Create all tables
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
    
    # Create session
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        # Check if categories already exist
        existing_categories = db.query(Category).count()
        if existing_categories > 0:
            print("✅ Categories already exist, skipping...")
            return
        
        # Create initial categories
        print("Creating initial categories...")
        categories = [
            Category(name="Electronics", description="Electronic devices and gadgets"),
            Category(name="Clothing", description="Fashion and apparel"),
            Category(name="Furniture", description="Home and office furniture"),
            Category(name="Books", description="Books, magazines, and educational materials"),
            Category(name="Sports & Outdoors", description="Sports equipment and outdoor gear"),
            Category(name="Home & Garden", description="Home improvement and gardening items"),
            Category(name="Toys & Games", description="Toys, games, and entertainment"),
            Category(name="Automotive", description="Car parts and automotive accessories"),
            Category(name="Health & Beauty", description="Health and beauty products"),
            Category(name="Art & Crafts", description="Art supplies and craft materials"),
            Category(name="Jewelry", description="Jewelry and accessories"),
            Category(name="Other", description="Miscellaneous items")
        ]
        
        for category in categories:
            db.add(category)
        
        db.commit()
        print("✅ Initial categories created successfully!")
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_database()
    print("\n🎉 Database initialization completed!")
    print("\nTo start the backend server, run:")
    print("cd backend && python main.py")
    print("\nTo start the frontend, run:")
    print("cd frontend && npm start")

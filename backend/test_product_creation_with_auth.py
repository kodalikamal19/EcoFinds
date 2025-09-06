#!/usr/bin/env python3
"""
Test script to check product creation with authentication
"""

import requests
import json

def test_product_creation_with_auth():
    base_url = "http://localhost:8000"
    
    # First, let's try to get a token by logging in
    login_data = {
        'username': 'test@example.com',  # Replace with actual email
        'password': 'password123'        # Replace with actual password
    }
    
    try:
        # Try to login first
        print("Attempting to login...")
        login_response = requests.post(f"{base_url}/api/auth/login", data=login_data)
        print(f"Login response: {login_response.status_code}")
        
        if login_response.status_code == 200:
            token_data = login_response.json()
            token = token_data['access_token']
            print("✅ Login successful, got token")
            
            # Now try to create a product
            headers = {'Authorization': f'Bearer {token}'}
            
            # Test with form data (like the frontend sends)
            product_data = {
                'title': 'Test Product',
                'description': 'Test description',
                'price': 100.0,
                'category_id': 1
            }
            
            print("Attempting to create product...")
            response = requests.post(f"{base_url}/api/products/", data=product_data, headers=headers)
            print(f"Product creation response: {response.status_code}")
            print(f"Response text: {response.text}")
            
            if response.status_code == 200:
                print("✅ Product created successfully!")
                product = response.json()
                print(f"Product ID: {product.get('id')}")
                print(f"Image URL: {product.get('image_url')}")
            else:
                print("❌ Product creation failed")
                try:
                    error_data = response.json()
                    print(f"Error details: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"Raw error: {response.text}")
        else:
            print("❌ Login failed")
            print(f"Login response: {login_response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend server. Make sure it's running on http://localhost:8000")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_product_creation_with_auth()

#!/usr/bin/env python3
"""
Test script to verify product creation with FormData
"""
import requests
import json

# Test data
test_data = {
    'title': 'Test Product',
    'description': 'This is a test product',
    'price': '100.50',
    'category_id': '1'
}

# Test image (create a simple test file)
test_image_content = b'fake image content'
test_image_filename = 'test.jpg'

# Create FormData
files = {
    'image': (test_image_filename, test_image_content, 'image/jpeg')
}

data = {
    'title': test_data['title'],
    'description': test_data['description'],
    'price': test_data['price'],
    'category_id': test_data['category_id']
}

print("Testing product creation with FormData...")
print(f"Data: {data}")
print(f"Files: {list(files.keys())}")

try:
    # Test without authentication first
    response = requests.post('http://localhost:8000/products/', data=data, files=files)
    print(f"Response status: {response.status_code}")
    print(f"Response data: {response.json()}")
except Exception as e:
    print(f"Error: {e}")

print("\nTesting with authentication...")
# You'll need to get a token first
# This is just to show the format
print("Note: You need to be logged in to create products")

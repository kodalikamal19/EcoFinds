from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from database import get_db
from models import Product, Category, User
from schemas import Product as ProductSchema, ProductCreate, ProductUpdate, Category as CategorySchema
from auth import get_current_user

router = APIRouter()

@router.get("/categories", response_model=List[CategorySchema])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()

@router.post("/categories", response_model=CategorySchema)
def create_category(name: str, description: Optional[str] = None, db: Session = Depends(get_db)):
    # Check if category already exists
    existing_category = db.query(Category).filter(Category.name == name).first()
    if existing_category:
        raise HTTPException(
            status_code=400,
            detail="Category already exists"
        )
    
    category = Category(name=name, description=description)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

@router.get("/", response_model=List[ProductSchema])
def get_products(
    skip: int = 0,
    limit: int = 100,
    category_id: Optional[int] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Product).filter(Product.is_available == True)
    
    if category_id:
        query = query.filter(Product.category_id == category_id)
    
    if search:
        query = query.filter(
            or_(
                Product.title.ilike(f"%{search}%"),
                Product.description.ilike(f"%{search}%")
            )
        )
    
    return query.offset(skip).limit(limit).all()

@router.get("/{product_id}", response_model=ProductSchema)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
    return product

@router.post("/", response_model=ProductSchema)
def create_product(
    product: ProductCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verify category exists
    category = db.query(Category).filter(Category.id == product.category_id).first()
    if not category:
        raise HTTPException(
            status_code=400,
            detail="Category not found"
        )
    
    db_product = Product(
        title=product.title,
        description=product.description,
        price=product.price,
        image_url=product.image_url,
        category_id=product.category_id,
        seller_id=current_user.id
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/{product_id}", response_model=ProductSchema)
def update_product(
    product_id: int,
    product_update: ProductUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
    
    # Check if user owns the product
    if product.seller_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to update this product"
        )
    
    # Update fields
    if product_update.title is not None:
        product.title = product_update.title
    if product_update.description is not None:
        product.description = product_update.description
    if product_update.price is not None:
        product.price = product_update.price
    if product_update.image_url is not None:
        product.image_url = product_update.image_url
    if product_update.category_id is not None:
        # Verify category exists
        category = db.query(Category).filter(Category.id == product_update.category_id).first()
        if not category:
            raise HTTPException(
                status_code=400,
                detail="Category not found"
            )
        product.category_id = product_update.category_id
    if product_update.is_available is not None:
        product.is_available = product_update.is_available
    
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
    
    # Check if user owns the product
    if product.seller_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to delete this product"
        )
    
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}

@router.get("/my/listings", response_model=List[ProductSchema])
def get_my_products(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Product).filter(Product.seller_id == current_user.id).all()

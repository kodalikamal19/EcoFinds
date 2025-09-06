from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Purchase, PurchaseItem, CartItem, Product, User
from schemas import Purchase as PurchaseSchema, PurchaseCreate
from auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[PurchaseSchema])
def get_purchase_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Purchase).filter(Purchase.buyer_id == current_user.id).all()

@router.post("/", response_model=PurchaseSchema)
def create_purchase(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get all cart items for the user
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    
    if not cart_items:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty"
        )
    
    # Calculate total amount
    total_amount = 0
    purchase_items = []
    
    for cart_item in cart_items:
        product = db.query(Product).filter(Product.id == cart_item.product_id).first()
        if not product or not product.is_available:
            raise HTTPException(
                status_code=400,
                detail=f"Product {cart_item.product_id} is not available"
            )
        
        item_total = product.price * cart_item.quantity
        total_amount += item_total
        
        purchase_items.append({
            "product_id": cart_item.product_id,
            "quantity": cart_item.quantity,
            "price_at_purchase": product.price
        })
    
    # Create purchase
    purchase = Purchase(
        buyer_id=current_user.id,
        total_amount=total_amount,
        status="completed"
    )
    db.add(purchase)
    db.flush()  # Get the purchase ID
    
    # Create purchase items
    for item_data in purchase_items:
        purchase_item = PurchaseItem(
            purchase_id=purchase.id,
            product_id=item_data["product_id"],
            quantity=item_data["quantity"],
            price_at_purchase=item_data["price_at_purchase"]
        )
        db.add(purchase_item)
    
    # Mark products as unavailable and clear cart
    for cart_item in cart_items:
        product = db.query(Product).filter(Product.id == cart_item.product_id).first()
        if product:
            product.is_available = False
        db.delete(cart_item)
    
    db.commit()
    db.refresh(purchase)
    return purchase

@router.get("/{purchase_id}", response_model=PurchaseSchema)
def get_purchase(
    purchase_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    purchase = db.query(Purchase).filter(
        Purchase.id == purchase_id,
        Purchase.buyer_id == current_user.id
    ).first()
    
    if not purchase:
        raise HTTPException(
            status_code=404,
            detail="Purchase not found"
        )
    
    return purchase

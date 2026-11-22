import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const getPrice = (cost) => Number(String(cost).replace(/[^0-9.]/g, '')) || 0;

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + getPrice(item.cost) * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => dispatch(removeItem(item.name));

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Plants in Cart: {totalQuantity}</h2>
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${totalAmount.toFixed(2)}</h2>

      {cart.length === 0 ? (
        <p style={{ color: 'black' }}>Your shopping cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: {item.cost}</div>
              <div className="cart-item-quantity">
                <button type="button" className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button type="button" className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${(getPrice(item.cost) * item.quantity).toFixed(2)}</div>
              <button type="button" className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))
      )}

      <div className="total_cart_amount" style={{ marginTop: 20, color: 'black' }}>
        Total: ${totalAmount.toFixed(2)}
      </div>
      <div className="continue_shopping_btn">
        <button type="button" className="get-started-button" onClick={() => onContinueShopping?.()}>
          Continue Shopping
        </button>
        <br />
        <button type="button" className="get-started-button1" onClick={() => alert('Coming Soon!')}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;

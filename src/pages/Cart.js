import React, { useContext, useState } from 'react';
import { CartProvider } from '../contexts/CartContext';
import { Link, Navigate } from 'react-router-dom';
import { WishlistProvider } from '../contexts/WishlistContext';
import '../styles/Cart.css';

function Cart() {
  const [checkoutClick, setCheckoutClick] = useState(false);

  const { handleAddToWishlist } = useContext(WishlistProvider);
  const { cartProds, removeFromCart, clearCart, setCartProds } = useContext(CartProvider);

  const calculateTotalPrice = (product) => {
    return product.price * product.quantity;
  };

  const handleQuantityChange = (product, quantity) => {
    const updatedCart = cartProds.map((prod) => {
      if (prod.id === product.id) {
        return { ...prod, quantity: quantity };
      }
      return prod;
    });

    setCartProds(updatedCart);
  };

  const subtotal = cartProds.reduce((total, product) => total + calculateTotalPrice(product), 0);

  return (
    <div className="cart">
      <h1>My Cart</h1>
      {cartProds.length === 0 ? (
        <p>
          Your Cart is Empty <span><Link to='/productlistingpage'>See Products</Link></span>
        </p>
      ) : (
        <div className="cart__details">
          {cartProds.map((product) => (
            <div key={product.id} className="cart__product">
              <div className="cart__product-image">
                <img style={{width:"200px", height:"200px", objectFit:"cover"}} src={product.thumbnail} alt={product.title} />
              </div>
              <div className="cart__product-details">
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
                <div className="cart__quantity">
                  <button
                    onClick={() => handleQuantityChange(product, product.quantity - 1)}
                    disabled={product.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => handleQuantityChange(product, product.quantity + 1)}>+</button>
                </div>

                <div className="cart__actions">
                  <button onClick={() => removeFromCart(product)}>Remove</button>
                  <button onClick={() => handleAddToWishlist(product)}>Move to Wishlist</button>
                </div>

              </div>
            </div>
          ))}
          <div className="cart__subtotal">
            <h3>Subtotal: ${subtotal}</h3>
            <button onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      )}
      {cartProds.length > 0 && (
        <>
          <button onClick={() => setCheckoutClick(true)} className="cart__checkout-link">
            Checkout
          </button>
          {checkoutClick && <Navigate to="/checkout" state={{ total: subtotal }} />}
        </>
      )}
    </div>
  );
}

export default Cart;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/WishlistCard.css';

function WishlistCard({ product, handleAddToCart, handleRemoveFromWishlist, cart }) {
  const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);

  return (
    <div className="wishlist__card">
      <div className="wishlist__image__container">
        <img src={product.thumbnail} alt={product.title} className="wishlist__thumbnail" />
      </div>
      <div className="wishlist__content">
        <h3 className="wishlist__title">{product.title}</h3>
        <p className="wishlist__desc">{product.description}</p>
        <div className="wishlist__price__container">
          <span className="wishlist__discounted__price">${discountedPrice}</span>
          <span className="wishlist__original__price">${product.price.toFixed(2)}</span>
        </div>
        <p className="wishlist__rating">Rating: {product.rating}</p>
        <p className="wishlist__category">Category: {product.category}</p>
      </div>
      <div className="wishlist__actions">
        {cart.includes(product) ? (
          <Link className="wishlist__add__to__cart__button" to="/cart">
            Go To Cart
          </Link>
        ) : (
          <button className="wishlist__add__to__cart__button" onClick={() => handleAddToCart(product)}>
            Add to Cart
          </button>
        )}
        <button className="wishlist__remove__button" onClick={() => handleRemoveFromWishlist(product)}>
          Remove from Wishlist
        </button>
      </div>
    </div>
  );
}

export default WishlistCard;

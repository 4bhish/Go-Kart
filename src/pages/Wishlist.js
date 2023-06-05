import React, { useContext } from 'react';
import { WishlistProvider } from '../contexts/WishlistContext';
import { CartProvider } from '../contexts/CartContext';
import WishlistCard from '../components/WishlistCard';
import '../styles/Wishlist.css';
import { Link } from 'react-router-dom';

function Wishlist() {
  const { wishlistProds, removeFromWishlist } = useContext(WishlistProvider);
  const { cartProds, handleAddToCart } = useContext(CartProvider);

  return (
    <div className="wishlist">
      {wishlistProds.length <= 0 ? (
        <h1 className="wishlist__empty">
          No Products in Wishlist. <Link to="/productlistingpage">See Products</Link>
        </h1>
      ) : (
        <>
          <h1 className="wishlist__title">Wishlist ({wishlistProds.length})</h1>
          <div className="wishlist__products">
            {wishlistProds.map((product) => (
              <WishlistCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
                handleRemoveFromWishlist={removeFromWishlist}
                cart={cartProds}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Wishlist;

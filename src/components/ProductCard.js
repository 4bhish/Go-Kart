import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '../styles/ProductCard.css'
import { LoginProvider } from '../contexts/LoginContext';



 function ProductCard  ({ id,product, handleAddToCart, handleAddToWishlist, cart, wishlist,removeFromWishList })  {

  const {loginStatus} = useContext(LoginProvider)
  
  
  function alertFunc(){
    return toast.error(`You are not Logged-In`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
      className: 'product-removed-toast',
    });
  }
  return (
    
    <div style={{textAlign:"left"}} className="product__card">
      <img src={product.thumbnail} alt={product.title} className="product__thumbnail" />
      <div className="product__details">
        
        <div className='details'>
        <Link  style={{textDecoration:"none", color:"inherit",textAlign:"center"}} to={`/productlistingpage/${id}`}>
        <h3>{product.title}</h3>
        <p className='desc'>{product.description}</p>
        <div className="price__container">
          <span className="discounted__price">Price :
            ${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}
          </span>{""}<span className="original__price"> ${product.price.toFixed(2)}</span>
        </div>
        <p>Rating: {product.rating}</p>
        <p>Category: {product.category}</p>
        </Link>
        </div>

        <div className="actions">

          {
            cart.includes(product) ? <Link style={{backgroundColor:'green',textAlign:'center'}} className="action__button" to="/cart">Go to Cart</Link> : <button className="action__button" onClick={loginStatus ? () => handleAddToCart(product) : alertFunc}>Add to Cart</button>
          }
          
          {
            wishlist.includes(product) ? <button onClick={() => removeFromWishList(product)}  style={{backgroundColor:'red' ,textAlign:'center'}} className="action__button" >Remove From Wishlist</button> : <button className="action__button" onClick={loginStatus ? () => handleAddToWishlist(product) : alertFunc}>Add to Wishlist</button>
          }
          
        </div>
      </div>
      
    </div>
    
  );
};

export default ProductCard
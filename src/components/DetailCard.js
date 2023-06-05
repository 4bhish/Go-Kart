import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import '../styles/DetailCard.css'
import { LoginProvider } from '../contexts/LoginContext';

function DetailCard({product,handleAddToCart,cart}) {

    const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);
    const {loginStatus} = useContext(LoginProvider)

    function alertFunc(){
      return alert("You are not Logged-In")
    }
  return (
    <div className="product__detail__content">
        <img src={product.thumbnail} alt={product.title} className="product__detail__image" />
        <div className="product__detail__info">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${discountedPrice}</p>
          <p>Rating: {product.rating}</p>
          <p>Category: {product.category}</p>
          {
            cart.includes(product) ? <Link style={{backgroundColor:'green',textAlign:'center'}} className="action__button" to="/cart">Go to Cart</Link> : <button className="action__button" onClick={loginStatus ? () => handleAddToCart(product) : alertFunc}>Add to Cart</button>
          }
        </div>
      </div>
  )
}

export default DetailCard

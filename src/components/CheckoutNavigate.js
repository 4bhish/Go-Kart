import React, { useContext } from 'react'
import { CartProvider } from '../contexts/CartContext'
import { Navigate } from 'react-router'

function CheckoutNavigate({children}) {
    const {cartProds} = useContext(CartProvider)
  return cartProds.length > 0 ? children : <Navigate to='/productlistingpage' />
}

export default CheckoutNavigate

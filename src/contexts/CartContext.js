import React, { createContext,  useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const  CartProvider = createContext()

function CartContext({children}) {
    const [cartProds,setCartProds] = useState([])
    

    

    function handleAddToCart(product){

       setCartProds(prevState => [...prevState,product])

       toast.success(`Product  added to cart`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
        className: 'product-added-toast',
      })
       
    }

    function removeFromCart(product) {
      setCartProds((prevState) => prevState.filter((prod) => prod !== product));

      toast.error(`Product removed from cart`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
        className: 'product-removed-toast',
      });
    }
  function clearCart(){
    setCartProds([])
  }
  return (
    <CartProvider.Provider value={{cartProds ,handleAddToCart,removeFromCart,clearCart,setCartProds}}>
        {children}
    </CartProvider.Provider>
  )
}

export default CartContext

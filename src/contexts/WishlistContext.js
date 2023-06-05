import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const WishlistProvider = createContext()

function WishlistContext({children}) {
    const [wishlistProds,setWishlistProds] = useState([])

    function handleAddToWishlist(product){
        setWishlistProds(prevState => [...prevState,product])

        toast.success(`Product  added to Wishlist`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
          className: 'product-added-toast',
        })
    }

    function removeFromWishlist(product) {
      setWishlistProds((prevState) => prevState.filter((prod) => prod !== product));

      toast.error(`Product removed from Wishlist`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
        className: 'product-removed-toast',
      });
    }

  return (
    <WishlistProvider.Provider value={{wishlistProds,handleAddToWishlist,removeFromWishlist}}>
        {children}
    </WishlistProvider.Provider>
  )
}

export default WishlistContext

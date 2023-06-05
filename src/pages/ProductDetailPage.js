import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fakeFetch } from '../FakeFetch'
import '../styles/ProductDetailPage.css'
import DetailCard from '../components/DetailCard'
import { CartProvider } from '../contexts/CartContext'
import Loader from '../components/Loader'


function ProductDetailPage() {
  const {id} = useParams()

  const {cartProds,handleAddToCart} = useContext(CartProvider)

  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(false)

  const getProducts = async() => {
    setLoading(true)
    try{
      const {data} = await fakeFetch('https://example.com/api/products')
      setProducts(data.products)
    }
    catch(e){
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  },[])

  const product = products.find((product) => Number(product.id )=== Number(id))



 
  console.log(product)
  return (
    product ? <div className="product__detail__container">
    <DetailCard
    product={product}
    cart={cartProds}
    handleAddToCart={handleAddToCart}
    />
  </div> : <Loader/>
  )
}

export default ProductDetailPage

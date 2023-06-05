import React from 'react'
import '../styles/HomePage.css'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div className='homepage'>

    <div className="banner">
      <div className="banner__gradient"></div>
      <Link style={{textDecoration:"none", color:"inherit"}} to='/productlistingpage' className="banner__button">See Products</Link>
    </div>

    <div className="middle-section">

      
      <div className="category-card">
      <Link style={{textDecoration:"none", color:"inherit"}} to='/productlistingpage?category=fragrances'>
        <div className="card-background bg1"></div>
        <div className="card-content">
          <h3>Fragrance</h3>
          <p>a pleasant scent, especially a somewhat strong one. Fragrance is especially associated with flowers.</p>
        </div>
        </Link>
      </div>
      

      <div className="category-card">
      <Link style={{textDecoration:"none", color:"inherit"}} to='/productlistingpage?category=smartphones'>
        <div className="card-background bg2"></div>
        <div className="card-content">
          <h3>Smartphones</h3>
          <p>The phone that can do it all. All kinds of phones for every need. Go mobile.</p>
        </div>
        </Link>
      </div>

      <div className="category-card">
      <Link style={{textDecoration:"none", color:"inherit"}} to='/productlistingpage?category=laptops'>
        <div className="card-background bg3"></div>
        <div className="card-content">
          <h3>Laptops</h3>
          <p> A laptop you can count on! · It's more than a laptop – it's a way of life · </p>
        </div>
        </Link>
      </div>

    </div>
       <Footer />
    </div>
  )
}

export default HomePage

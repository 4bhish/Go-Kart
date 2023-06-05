import React, { useContext } from 'react'
import '../styles/Navbar.css'

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {  Link, NavLink } from 'react-router-dom';
import { Badge } from '@mui/material';
import {  PermIdentityOutlined } from '@mui/icons-material';
import { CartProvider } from '../contexts/CartContext';
import { WishlistProvider } from '../contexts/WishlistContext';

function Navbar() {

    const {cartProds} = useContext(CartProvider)
    const {wishlistProds} = useContext(WishlistProvider)

   
  return (
    <nav className="navbar">
        <Link  style={{textDecoration:"none" ,color:'#2196f3'}} to='/'>
        <div className='navbar__logo'>
            Go Kart
        </div>
        </Link>
        <div className='navbar__menus'>

           <NavLink className='navbar__cart navbar__menu' to='/cart'>
            <Badge  badgeContent = { cartProds.length} color='primary'>
                <ShoppingCartOutlinedIcon fontSize='medium' color='primary' />
            </Badge>
           </NavLink>

           <NavLink className='navbar__wishlist navbar__menu' to='/wishlist'>
            <Badge badgeContent={wishlistProds.length} color='primary'>
                <FavoriteBorderOutlinedIcon fontSize='medium' color='primary' />
            </Badge>
           </NavLink>

           <NavLink className='Navbar__loginDetails navbar__menu' to='/logindetails'>
            <Badge >
                <PermIdentityOutlined fontSize='medium' color='primary' />
            </Badge>
           </NavLink>
        </div>
    </nav>
  )
}

export default Navbar

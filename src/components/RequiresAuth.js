import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router'
import { LoginProvider } from '../contexts/LoginContext'

function RequiresAuth({children}) {
    const location = useLocation()

    const {loginStatus} = useContext(LoginProvider)
  return ( loginStatus ? children : <Navigate  to='/logindetails' state={{from:location}}/>)
}

export default RequiresAuth

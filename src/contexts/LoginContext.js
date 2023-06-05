import React, { createContext,  useState } from 'react'

export const LoginProvider = createContext()


function LoginContext({children}) {
    const [loginStatus,setLoginStatus] = useState(false)

  return (
    <LoginProvider.Provider value={{loginStatus,setLoginStatus}}>
        {children}
    </LoginProvider.Provider>
  )
}

export default LoginContext

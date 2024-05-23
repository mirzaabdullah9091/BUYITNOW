"use client"
import React, { useState } from 'react'
import UserContext from '@/context/UserContext'
const UserProvider = ({children}) => {
    const[user,setUser] = useState({})
  return (
    <div>
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
      
    </div>
  )
}

export default UserProvider

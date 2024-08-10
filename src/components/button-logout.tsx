"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const ButtonLogout = () => {
  return (
    <button onClick={() => signOut() } className='text-white hover:underline' >
        logout
    </button>
  )
}

export default ButtonLogout
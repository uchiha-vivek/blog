import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async() => {
    const session= await getServerSession(authOptions)

     if(session?.user){
        return (
            <h2 className='text-2xl'> Admin-Page welcome back {session?.user.username} </h2>
        )
     }

    
  return (
   <h2 className='text-2xl'> Please Login to see this admin Page  </h2>
  )
}

export default page
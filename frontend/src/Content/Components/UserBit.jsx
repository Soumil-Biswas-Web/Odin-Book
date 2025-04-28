import React from 'react'
import { Link } from 'react-router-dom'

export default function UserBit({user}) {
  return (
    <Link 
      className='flex items-center gap-4'
      to={`/home/profile/${user.id}`}
    >
        <img 
          className='w-10 image-style'
          src={user.profilePicture?.url || "66f-1.jpg"} 
          alt={user.username + "Pic"} 
        />
        <p className='font-bold'>{user.username}</p>
    </Link>
  )
}

// On clicking on Userbit it should takeyou to the user's profile
import React from 'react'
import UserProfile from './UserProfile.jsx';

export default function LeftSide() {


  return (
    <div className="sm:p-2 md:p-5 lg:p-10 md:w-full max-w-96">
        <div className="hidden lg:flex flex-col items-end gap-5">
            <UserProfile/>                   
        </div>
    </div>
  )
}

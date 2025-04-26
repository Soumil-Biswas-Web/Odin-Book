import React, { useState } from 'react'
import LightMode from './LightMode'
import Heading from './Heading'
import MobileMenuToggle from '../../Components/MobileMenuToggle'
import UserProfile from './UserProfile';

export default function MobileHeader() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

  return (
    <>
        <div className='flex md:hidden justify-between w-full border-b-2 border-contrast-color p-3'>
            <MobileMenuToggle isOpen={isOpen} onClick={toggleMenu}/>
            <Heading isSmol={true}/>
            <LightMode/>
        </div>
        <div className={`absolute transform bg-background-color top-0 z-20 md:hidden duration-1000 overflow-hidden min-h-screen flex flex-col items-end gap-5 p-10 w-[50vw] max-w-[300px] ${
          isOpen ? "left-0" : "left-[-50vw]"
        }`}>
            <MobileMenuToggle isOpen={isOpen} onClick={toggleMenu}/>
            <UserProfile/>
        </div>
    </>
  )
}

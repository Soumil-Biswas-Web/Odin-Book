import React from 'react'
import FollowButton from '../../Components/FollowButton'
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import catchError from '../../../assets/js/catchError';
import axios from 'axios';
import UserBit from '../../Components/UserBit';

export default function Followsection() {
    
    const data = useLoaderData();
    // console.log(data);

    const user = useSelector((state) => state.userReducer);

  return (
    <>
        <p className='text-lg'>People you might know</p>
        {data.map((contact, index) => {
            if ((user.username !== null) && (contact.username == user.username)) return null
            else return (
                <div className="flex justify-between" key={index}>
                    <UserBit user={contact}/>
                    <span className='w-5 bg-background-color'></span>
                    <FollowButton contact={contact}/>
                </div>                
            )
        })}    
    </>
  )
}

Followsection.loader = async () => {
    try {              
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_SERVER_URL}/user/all`);
        // console.log(response.data);
        return response.data;
    } 
    catch (e) {
      catchError(e);
    }    
}

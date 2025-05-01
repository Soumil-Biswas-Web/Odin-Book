import React from 'react'
import FollowButton from '../../Components/FollowButton'
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import catchError from '../../../assets/js/catchError';
import axios from 'axios';
import UserBit from '../../Components/UserBit';

export default function Users({side}) {
    
  const data = useLoaderData();
  // console.log(data);

  const user = useSelector((state) => state.userReducer);

  if (data == undefined) return (<div>No user fetched</div>)

  return (
    <div className="flex flex-col gap-5">
        {data.map((contact, index) => {
            if ((user.username !== null) && (contact.username == user.username)) return null
            // For the side panel, truncate entries 
            else if (side && (index > 2)) return null
            //  Show all entries for Main Index page
            else return (
                <div className={`flex justify-between ${!side && "border-b-[1px] border-contrast-color-offset p-5"}`} key={index}>
                    <UserBit user={contact}/>
                    <span className='w-5 bg-background-color'></span>
                    <FollowButton contact={contact}/>
                </div>                
            )
        })}    
    </div>
  )
}

Users.loader = async () => {
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

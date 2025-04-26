import React from 'react'
import UserBit from '../../Components/UserBit';
import axios from 'axios';
import catchError from '../../../assets/js/catchError';
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FollowButton from '../../Components/FollowButton';

export default function RightSide() {
    
    const data = useLoaderData();
    console.log(data);

    const user = useSelector((state) => state.userReducer);

  return (
    <div className="sm:p-2 lg:p-10 md:w-full max-w-96">
        <div className="hidden md:flex flex-col gap-5">
            <div className="magic-border text-gray-500 p-2">There is Nothing to seacrh</div>

            <div className="magic-border p-5">
                <p className='text-lg font-bold'>There is no premium.</p>

                <p>Can't buy premium if there is no premium. :peeposmort:</p>

                <img className="magic-border" src="/1m06z4.jpg" alt="you_cant_if_you_dont.jpg" />
            </div>

            <p className='text-lg'>People you might know</p>
            {data.map((useritem, index) => {
                if ((user.username !== null) && (useritem.username == user.username)) return null
                else return (
                    <FollowButton user={useritem} key={index}/>
                )
            })}
        </div>  
    </div>
  )
}

RightSide.loader = async () => {
    try {              
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_SERVER_URL}/user/all`);
        console.log(response.data);
        return response.data;
    } 
    catch (e) {
      catchError(e);
    }    
}
import axios from 'axios';
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import catchError from '../../assets/js/catchError';
import Post from '../Components/Post';
import DropDown from '../Feed/components/DropDown';
import FollowButton from '../Components/FollowButton';

export default function Profile() {

  const user = useLoaderData();

  return (
    <div className="w-full h-full magic-center">
      <div className="flex p-5 items-center justify-start gap-5 w-full border-b-[1px] border-contrast-color-offset">
        <img 
          className='w-32 border-2 border-contrast-color rounded-full'
          src={user?.profilePicture || "logo-sb.png"} 
          alt={user.username + "Pic"} 
        />
        <div className="">
          <p className='font-bold'>{user.username}</p>
          <FollowButton contact={user}/>
        </div>
      </div>

      {
        user.posts.map((post, index) => (
          <div className="relative" key={index}>
            <DropDown post={post}/>
            <Post post={post}/>
          </div>
        ))
      }
    </div>
  )
}

Profile.loader = async ({params})  => {
  const{id} = params;
  
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_SERVER_URL}/user/profile`, {params: {id}}
    );
    console.log(response.data);
    return response.data;
  } 
  catch (e) {
    catchError(e);
  }
}
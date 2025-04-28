import axios from 'axios';
import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import catchError from '../../assets/js/catchError';
import Post from '../Components/Post';
import DropDown from '../Feed/components/DropDown';
import FollowButton from '../Components/FollowButton';
import { useSelector } from 'react-redux';
import ModalWindow from '../Components/ModalWindow';
import EditProfilePicture from './components/EditProfilePicture';

export default function Profile() {

  const profile = useLoaderData();
  const user = useSelector((state) => state.userReducer);

  const [showModal, setShowModal] = useState(false);

  const onEditImage = () => {
    console.log('Edit Image');
  }

  return (
    <div className="w-full h-full magic-center">
      <div className="flex p-5 items-center justify-start gap-5 w-full border-b-[1px] border-contrast-color-offset">
        <img 
          className='w-32 image-style'
          src={profile.profilePicture?.url || "66f-1.jpg"} 
          alt={profile.username + "Pic"} 
        />
        <div className="">
          <p className='font-bold'>{profile.username}</p>
          <FollowButton contact={profile}/>

          {/* If User's profile, allow editiing profile picture*/}
          {((user.username !== null) && (profile.username == user.username)) && 
            <ModalWindow
              buttonText="Edit Image"
            >
              <EditProfilePicture profile={profile}/>
            </ModalWindow>
          }
        </div>
      </div>

      {
        profile.posts.map((post, index) => (
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
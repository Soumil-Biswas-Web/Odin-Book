import React from 'react'
import Post from '../Components/Post';
import feedData from '../../assets/js/feedData';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import catchError from '../../assets/js/catchError';
import DropDown from './components/DropDown';

export default function Feed() {

  // const posts = feedData;
  const posts = useLoaderData();

  return (
    <div className=''>
      {
        posts.map((post, index) => (
          <div className="relative" key={index}>
            <DropDown post={post}/>
            <Post post={post}/>
          </div>
        ))
      }
    </div>
  )
}

Feed.loader = async ()  => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_SERVER_URL}/posts/feed`
    );
    console.log(response.data);
    return response.data;
  } 
  catch (e) {
    catchError(e);
  }
}


import React from 'react'
import Post from '../Components/Post'
import Comment from './components/Comment'
import { useLoaderData } from 'react-router-dom';
import catchError from '../../assets/js/catchError';
import axios from 'axios';
import WriteComment from './components/WriteComment';

export default function PostPage() {

  const post = useLoaderData();
  console.log(post);

  return (
    <div className="">
      <Post post={post}/>
      <WriteComment post={post}/>
      {
        post.comments.map((comment, index) => (
          <Comment comment={comment} key={index}/>
        ))
      }
    </div>
  )
}

PostPage.loader = async ({params}) => {
  // console.log(params);
  const{postId} = params;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_SERVER_URL}/posts/post`, {params: {postId}}
    );
    // console.log(response.data);
    return response.data;
  } 
  catch (e) {
    catchError(e);
  }  
}

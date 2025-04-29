import React from 'react'
import LikeIcon from '../../assets/Icons/LikeIcon'
import CommentIcon from '../../assets/Icons/CommentIcon'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import catchError from '../../assets/js/catchError';
import axios from 'axios';

export default function PostNumbserSection({item}) {

  console.log(item);
  
  const user = useSelector((state) => state.userReducer);

  const isLiked = (item.likes?.some(({ userId }) => userId === user.id));
  const isCommented = (item._count.comments > 0);;

  const token = localStorage.getItem('token');

  const navigate = useNavigate()

  const like = () => {
    // console.log("liked");

    if (user.username == null) {
      navigate("/login")
      return;
    }
    if (isLiked) {
      flash("Post Liked already")
    }
    else {
      apiLike();
    }
  }
  
  const apiLike = async() => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/posts/like`, {postId: item.id}, {
        headers: { 
          Authorization: `Bearer ${token}`, 
        },
      });
      // console.log(response.data);
      flash("Post Liked successfully");
      // refresh window or smth
    } catch (e) {
      catchError(e);
    }
  }

  return (
    <div className='flex w-full justify-evenly mt-3'>
        {/* Like, comment */}
        <button className='flex gap-2' onClick={like}>
          <LikeIcon isSelected={isLiked} />
          <p>{item._count.likes}</p>
        </button>
        <Link className='flex gap-2'>
          <CommentIcon isSelected={isCommented} />
          <p>{item._count.comments}</p>
        </Link>
    </div>
  )
}

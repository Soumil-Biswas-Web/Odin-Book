import React from 'react'
import LikeIcon from '../../assets/Icons/LikeIcon'
import CommentIcon from '../../assets/Icons/CommentIcon'
import { Link } from 'react-router-dom'

export default function PostNumbserSection({item}) {

  const isLiked = false;
  const isCommented = false;

  return (
    <div className='flex w-full justify-evenly mt-3'>
        {/* Like, comment */}
        <button className='flex gap-2'>
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

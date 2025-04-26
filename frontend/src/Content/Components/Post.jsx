import React from 'react'
import UserBit from './UserBit'
import PostNumbserSection from './PostNumbserSection'
import { Link } from 'react-router-dom'

export default function Post({post}) {
  return (
    <div className="p-3 border-b-[1px] border-contrast-color-offset">
        <UserBit user={post.user} />

        <Link className='ml-14' to={(`postPage/${post.id}`)}>
          <p>{post.text}</p>

          {post.image && (
              <img className='magic-border object-center w-full' src={post.image.url} alt={post.id+"img"} />
          )}
        </Link>

        <PostNumbserSection item={post}/>
    </div>
  )
}

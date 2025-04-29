import React from 'react'
import PostNumbserSection from '../../Components/PostNumbserSection'
import UserBit from '../../Components/UserBit'

export default function Comment({comment}) {
  // console.log(comment);
  return (
    <div className='p-5 flex border-t-[1px] border-contrast-color-offset flex-col gap-2'>
        <UserBit user={comment.user}/>
        <p>{comment.text}</p>

        {/* <PostNumbserSection item={comment}/> */}
    </div>
  )
}

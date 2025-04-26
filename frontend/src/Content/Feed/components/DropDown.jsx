import React, { useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function DropDown({post}) {

  const [dropDown, setDropDown] = useState(false);

  const apiDeletePost = async (post) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_SERVER_URL}/posts/delete`, post.id
      );
      console.log(response.data);
      flash("Post Deleted successfully");
    } 
    catch (e) {
      catchError(e);
    }
  }

  return (
    <div className="absolute top-4 right-4 flex flex-col items-end">
        {/* Drop down menu for edit / delete post */}
        <button className='' onClick={() => {setDropDown(!dropDown)}}><BsThreeDots /></button>
        {dropDown &&             
          <div className="flex flex-col p-4 bg-background-color shadow-md shadow-background-color-offset font-semibold">
              <Link to={(`editPost/${post.id}`)}>Edit Post</Link>
              <button onClick={() => {apiDeletePost(post)}}>Delete Post</button>
          </div>
        }
    </div>
  )
}

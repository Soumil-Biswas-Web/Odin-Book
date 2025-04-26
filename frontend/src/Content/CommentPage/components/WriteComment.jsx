import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import catchError from '../../../assets/js/catchError';

const schema = yup
  .object({
    postComment: yup
      .string()
      .required("Post text is required"),
  })
  .required();

export default function WriteComment({post}) {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.userReducer);

  // Sends POST Request to backend API to make a new post
  const apiComment = async(data) => {
    try {
      const formData = new FormData();
      formData.append('text', data.postComment);
      formData.append('userId', user.id);
      formData.append('postId', post.id);
      const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/posts/comment`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log(response.data);
      flash("Post Created successfully");
      navigate("/home");
    } catch (e) {
      catchError(e);
    }
  }  

  const onSubmit = (data) => { 
    // console.log(data);
    apiComment(data);
  }
  
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="new-post-form"
      className='flex flex-col gap-3 items-start w-full p-3'
    >
      <div className="w-full magic-border p-3 flex flex-col items-start gap-2">
        <Controller
          name="postComment"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              type="textArea"
              onChange={(e) => {
                  localStorage.setItem("postComment", e.target.value);
                  field.onChange(e); // Ensure react-hook-form handles the change
              }}
              placeholder="Add a comment..."
              className='bg-transparent w-full h-full min-h-12 flex-1 p-3'          
            ></textarea>
          )}
        />          

      </div>
      <button className='button-style' type='submit' >Post</button>
    </form>
  )
}


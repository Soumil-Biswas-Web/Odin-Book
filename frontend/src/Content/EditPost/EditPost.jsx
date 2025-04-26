import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import catchError from '../../assets/js/catchError';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const schema = yup
  .object({
    postText: yup
      .string()
      .required("Post text is required"),
    image: yup
      .mixed()
      .test("fileSize", "File is too large", (value) => {
        if (!value) return true; // skip if no file
        return value.size <= 50 * 1024 * 1024; // 50MB max
      })
      .nullable(),
  })
  .required();

export default function EditPost() {

  const navigate = useNavigate();

  const post = useLoaderData();

  const [filePreview, setFilePreview] = useState(post.image.url || null);

  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.userReducer);

  // Sends POST Request to backend API to edit a post
  const apiEditPost = async(data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.image); // 'file' is the key expected by your backend
      formData.append('text', data.postText);
      formData.append('userId', user.id);    
      const response = await axios.put(`${import.meta.env.VITE_REACT_SERVER_URL}/posts/editPost`, formData, {
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
    apiEditPost(data);
  }

  const [showImageInput, setShowImageInput] = useState(false);  
  
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="edit-post-form"
      className='flex flex-col gap-3 items-start w-full p-3'
    >
      <div className="w-full magic-border p-3 flex flex-col items-start gap-2">
        <Controller
          name="postText"
          control={control}
          defaultValue={post.text}
          render={({ field }) => (
            <textarea
              {...field}
              type="textArea"
              onChange={(e) => {
                  localStorage.setItem("postText", e.target.value);
                  field.onChange(e); // Ensure react-hook-form handles the change
              }}
              placeholder="What's on your mind?..."
              className='bg-transparent w-full h-full min-h-32 flex-1 p-3'
            ></textarea>
          )}
        />

          {/* Toggle Image Upload */}
          <button
            type="button"
            onClick={() => {
              setShowImageInput((prev) => !prev);
              if (!showImageInput) setFilePreview(null);
            }}
            className="font-semibold text-xs"
          >
            {(showImageInput || post.image) ? "Remove Image" : "Add Image"}
          </button>

          {(showImageInput || post.image) && (
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <div className='flex gap-5 items-start'>
                  <label htmlFor='image-upload' className='bg-background-color-offset rounded-full p-1 leading-tight'>&nbsp;+&nbsp;</label>
                  <input
                    id='image-upload'
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFilePreview(URL.createObjectURL(file));
                        field.onChange(file);
                      }
                    }}
                    className='hidden'
                  />
                  {filePreview && (
                    <img
                      src={filePreview}
                      alt="Selected preview"
                      className="magic-border object-cover w-10 rounded-[3px]"
                    />
                  )}                
                </div>
              )}
            />
          )}    

      </div>
      <button className='button-style' type='submit' >Post</button>
    </form>
  )
}

EditPost.loader = async ({params}) => {
  const{postId} = params;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_SERVER_URL}/posts/post`, {params: {postId}}
    );
    console.log(response.data);
    return response.data;
  } 
  catch (e) {
    catchError(e);
  }
}
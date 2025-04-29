import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from 'react-redux';
import catchError from '../../assets/js/catchError';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    postText: yup
      .string()
      .required("Post text is required"),
    image: yup
      .mixed()
      .test("fileSize", "File is too large", (value) => {
        if (!value) return true; // skip if no file
        return value.size <= 5 * 1024 * 1024; // 5MB max
      })
      .nullable(),
  })
  .required();

export default function NewPost() {

  const [filePreview, setFilePreview] = useState(null);

  const token = localStorage.getItem('token');

  const user = useSelector((state) => state.userReducer);

  const navigate = useNavigate()

  // Sends POST Request to backend API to make a new post
  const apiNewPost = async(data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.image); // 'file' is the key expected by your backend
      formData.append('text', data.postText);
      formData.append('userId', user.id);    
      const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/posts/newPost`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`, 
        },
      });
      // console.log(response.data);
      flash("Post Created successfully");
      navigate("/home");
    } catch (e) {
      catchError(e);
    }
  }  

  const onSubmit = (data) => { 
    // console.log(data);
    apiNewPost(data);
  }

  const [showImageInput, setShowImageInput] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="new-post-form"
      className='flex flex-col gap-3 items-start w-full p-3'
    >
      <div className="w-full magic-border p-3 flex flex-col items-start gap-2">
        <Controller
          name="postText"
          control={control}
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
          {showImageInput ? "Remove Image" : "Add Image"}
        </button>

        {showImageInput && (
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
      {/* <Editor
        apiKey='8nuck7966nokqwao4rzzpdks2us5ylqgzp3z1lpxxg54w421'
        init={{
          plugins: [
            // Core editing features
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'visualblocks',
          ],
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide'),
          content_css: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default')          
        }}
        initialValue="Welcome to TinyMCE!"
      />*/}
    </form>
  )
}

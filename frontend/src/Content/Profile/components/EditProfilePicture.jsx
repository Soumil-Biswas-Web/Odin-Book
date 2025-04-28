import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import catchError from '../../../assets/js/catchError';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { initializeApp } from '../../../utils/initialize';

const schema = yup
  .object({
    image: yup
      .mixed()
      .test("fileSize", "File is too large", (value) => {
        if (!value) return true; // skip if no file
        return value.size <= 5 * 1024 * 1024; // 5MB max
      })
      .required("A new image is required"),
  })
  .required();

export default function EditProfilePicture({profile}) {

  const navigate = useNavigate();
  
  const token = localStorage.getItem('token'); 
  
  const [filePreview, setFilePreview] = useState(profile?.profilePicture.url || "66f-1.jpg");

  const [save, setSave] = useState(false);

  // Sends POST Request to backend API to edit profile picture
  const apiEditPost = async(data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.image);    

      const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/user/picture`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log(response.data);
      flash("Profile Edited successfully");
      setSave(false);
      navigate(`/home/profile/${profile.id}`)
      initializeApp();
    } catch (e) {
      catchError(e);
    }
  }    

  const onSubmit = (data) => { 
    // console.log(data);
    apiEditPost(data);
  }
  
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  return (
    <div className="p-5 bg-background-color-offset rounded-xl aspect-video">
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="edit-profile-picture-form"
        className='h-full border-4 border-dashed p-6 gap-5 rounded-lg border-contrast-color-offset magic-center'
      >
        <h2 className='font-bold text-xl'>Edit Profile Picture</h2>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <>
            <label
                htmlFor="image"
                className="button-style"
            >
                + Choose Image
            </label>
              <input
                id='image'
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFilePreview(URL.createObjectURL(file));
                    setSave(true);
                    field.onChange(file);
                  }
                }}
                className='hidden'
              />
              {filePreview && (
                <img
                  src={filePreview}
                  alt="Selected preview"
                  className="w-32 image-style"
                />
              )}
            </>
          )}
        />
        {save && <button className='button-style' type='submit'>Save</button>}
      </form>        
    </div>    
  )
}

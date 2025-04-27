import React from 'react'
import { useSelector } from 'react-redux';
import isFollowing from '../../assets/js/isFollowing';
import catchError from '../../assets/js/catchError';
import axios from 'axios';

export default function FollowButton({contact}) {

    const user = useSelector((state) => state.userReducer);
    const token = localStorage.getItem('token');

    const onFollow = async(followId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/user/follow`, {followId}, {
              headers: { 
                Authorization: `Bearer ${token}`, 
              },
            });
            // console.log(response.data);
            flash("User Followed successfully");
        } catch (e) {
            catchError(e);
        }         
    }
    
    // console.log("contact:", contact);

    if ((user.username !== null) && (contact.username == user.username)) return null
    else 
    return (
        /* Show follow button only if logged in */
        (user.username !== null) && 
            isFollowing(user, contact) ? 
                // If already following disable button
                <div className='fake-button-style'>Following</div>
            : 
                // If not following,  show follow button
                <button className='button-style' onClick={() => onFollow(contact.id)}>Follow</button>        
    )
}

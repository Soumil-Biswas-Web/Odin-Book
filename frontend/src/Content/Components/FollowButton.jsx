import React from 'react'
import UserBit from './UserBit'

export default function FollowButton(user) {

    const onFollow = async(username) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/user/follow`, username, {
              headers: { 
                Authorization: `Bearer ${token}`, 
              },
            });
            console.log(response.data);
            flash("User Followed successfully");
        } catch (e) {
            catchError(e);
        }         
    }    

  return (
        <div className="flex justify-between">
            <UserBit user={user}/>
            <div className="flex">
                <span className='w-5 bg-background-color'></span>
                <button className='button-style' onClick={() => onFollow(user.username)}>Follow</button>
            </div>
        </div>
    )
}

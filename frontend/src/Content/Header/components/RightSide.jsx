import React from 'react'
import Users from './Users';
import { Link } from 'react-router-dom';

export default function RightSide() {
  return (
    <div className="sm:p-2 lg:p-10 md:w-full max-w-96">
        <div className="hidden lg:flex flex-col gap-5">
            <div className="magic-border text-gray-500 p-2">There is Nothing to seacrh</div>

            <div className="magic-border p-5">
                <p className='text-lg font-bold'>There is no premium.</p>

                <p>Can't buy premium if there is no premium. :peeposmort:</p>

                <img className="magic-border" src="/1m06z4.jpg" alt="you_cant_if_you_dont.jpg" />
            </div>

            <p className='text-lg'>People you might know</p>
            <Users side={true}/>

            <Link className='button-style self-start' to={'/home/users'}>Show All</Link>
        </div>  
    </div>
  )
}
import { GoogleLogin } from '@react-oauth/google';
import LightMode from './components/LightMode';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import MobileHeader from './components/MobileHeader';
import feedData from '../../assets/js/feedData';


export default function Header() {
    const user = useSelector((state) => state.userReducer);
    // const user = feedData[0].user;
    // console.log(user);

    return(
        <section className='fixed w-[100vw] h-screen bg- z-10 transition-theme'>
            <div className="flex justify-center h-full bg-background-color">
                {/* Left section */}
                <LeftSide/>

                {/* Outlet */}
                <div className="magic-center w-full shrink-0 md:w-[500px] sm:border-x-2 border-contrast-color">
                    <MobileHeader/>
                    <div className='hidden lg:flex justify-between w-full border-b-2 border-contrast-color p-3'>
                        {(user.username === null)
                            ? <Link to="/login" className='font-semibold'>Login</Link>
                            : <Link className='font-bold'>{user.username}</Link>
                        }
                        <LightMode/>     
                    </div>
                    
                    <div className="h-full w-full overflow-y-auto scrollbar-none">
                        <Outlet/>
                    </div>
                </div>

                {/* Right Section */}
                <RightSide/>

                {/* Goggle Authentication Button */}
                {/* <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />  */}
            </div>
        </section>
    )
}
import {
    Navigate,
    Route,
    createHashRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Error from "./Content/Error/Error";

import Bus from "./utils/Bus";

import Header from "./Content/Header/Header";
import Feed from "./Content/Feed/Feed";
import NewPost from "./Content/NewPost/NewPost";

import Login from "./Content/Login/Login";
import SignUp from "./Content/Login/SignUp";
import EditPost from "./Content/EditPost/EditPost";
import PostPage from "./Content/CommentPage/PostPage";
import Profile from "./Content/Profile/Profile";
import Followsection from "./Content/Header/components/Followsection";

window.flash = (message, type = "success") =>
    Bus.emit("flash", { message, type });

export const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<Error />}>
            <Route index element={<Navigate to={"/home"} />} />
            <Route path="home" loader={Followsection.loader} element={<Header />}>
                <Route index loader={Feed.loader} element={<Feed />} />
                <Route path="newPost" element={<NewPost />} />
                <Route path="editPost/:postId" loader={EditPost.loader} element={<EditPost />} />
                <Route path="postPage/:postId" loader={PostPage.loader} element={<PostPage />} />
                <Route path="profile/:id" loader={Profile.loader} element={<Profile/>} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />

            <Route
                path="*"
                loader={() => {
                throw { status: 404, message: "Page Not Found" };
                }}
            />

        </Route>
    ),
    
)
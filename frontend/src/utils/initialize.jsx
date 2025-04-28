import axios from 'axios';
import { setUser, clearUser } from '../Store/User.js/UserSlice';
import { store } from '../Store/store';

export const initializeApp = async () => {
  const token = localStorage.getItem('token');
  // console.log("bun bun bun", token)
  if (token) {
    // console.log("token: " + token);
    try {
      // Attach token to request headers
      const response = await axios.get(`${import.meta.env.VITE_REACT_SERVER_URL}/auth/me`, {
        headers: { 
          Authorization: `Bearer ${token}`, 
        },
      });

      const {username, id, profilePicture} = response.data;
      // console.log("user: ", response.data);
      // Set user and token in Redux
      store.dispatch(setUser({ username, id, token, profilePicture }));
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // Clear invalid token
      localStorage.removeItem('token');
      store.dispatch(clearUser());
    }
  } else {
    // Explicitly clear the user if no token is found
    store.dispatch(clearUser());
  }
};
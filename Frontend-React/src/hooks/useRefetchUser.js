import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { refreshUser } from '../slice/authUserSlice'; // Adjust import if needed

const apiUrl = process.env.REACT_APP_API_URL;

const useRefetchUser = (setIsLoading) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userAuth);
   const [error, setError] = useState(null);

  const refetchUser = async () => {
    if (!currentUser) return; // Only proceed if there's a user

    try {
      setIsLoading(true);
      console.log("Refetching user...");
      
      const response = await axios.post(`${apiUrl}/auth/refresh`, {
        email: currentUser?.email.toLowerCase(),
      });

      if (JSON.stringify(currentUser) !== JSON.stringify(response.data)) {
        dispatch(refreshUser(response.data)); // Update user if data is different
      }
    } catch (err) {
      setError(err.message);
      console.error("Error refetching user:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Return the refetch function along with loading and error state
  return { refetchUser, error };
};

export default useRefetchUser;

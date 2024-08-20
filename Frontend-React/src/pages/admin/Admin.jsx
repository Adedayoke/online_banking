import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Admin() {
  const { currentUser } = useSelector((state) => state.userAuth);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {foundUser} = useSelector(state=>state.adminFunctions)

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setAllUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }
    fetchAllUsers();
  }, []);
  useEffect(()=>{
    setAllUsers(foundUser)
  }, [foundUser])

  if (!currentUser || currentUser?.email !== "admin@gmail.com") {
    return <Navigate to="/admin/login" />;
  }

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="h-full w-full flex items-center justify-center lg:px-4">
      <div className="bg-coolAsh h-5/6 w-4/5 md:4/6 lg:w-11/12 rounded-lg relative">
        <div className="flex items-center text-sm lg:text-base p-4 text-customGreen border-b-2 border-customGreen">
          <p className="w-1/5 mr-4 font-semibold ">Name</p>
          <p className="w-1/5 mr-4 hidden md:block font-semibold ">E-mail</p>
          <p className="w-1/5 mr-4 hidden lg:block font-semibold ">Phone</p>
          <p className="w-1/5 mr-4 font-semibold ">Balance (USD)</p>
          <p className="w-1/5 mr-4 font-semibold ">UID</p>
          <p className="w-1/5 mr-4 font-semibold "></p>
        </div>
        <div className="text-white p-4">
          {allUsers.length > 0 ? (
            allUsers.map((user) => (
              <div key={user.uid} className="flex items-center text-sm border-b-2 text-white h-16 mb-4">
                <p className="w-1/5 mr-4 overflow-hidden ">
                  {user.personalDetails.name}
                </p>
                <p className="w-1/5 mr-4 hidden md:block overflow-hidden ">
                  {user.personalDetails.email}
                </p>
                <p className="w-1/5 mr-4 hidden lg:block overflow-hidden ">
                  {user.personalDetails.phone}
                </p>
                <p className="w-1/5 mr-4 overflow-hidden ">
                  {user.balance || "N/A"}
                </p>
                <p className="w-1/5 mr-4 overflow-hidden ">
                  {user.uid}
                </p>
                <p className="w-1/5 mr-4 overflow-hidden flex items-center justify-center text-center">
                  <button className="border border-customGreen py-2 px-3 rounded">
                    View
                  </button>
                </p>
              </div>
            ))
          ) : (
            <p>No user details found</p>
          )}
        </div>
      </div>
    </div>
  );
}

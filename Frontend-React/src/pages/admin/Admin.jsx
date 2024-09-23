import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setViewUser } from "../../slice/adminUserSlice";
import { logout } from "../../slice/authUserSlice";

const apiUrl = process.env.REACT_APP_API_URL

export default function Admin() {
  const { currentUser } = useSelector((state) => state.userAuth);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {foundUser} = useSelector(state=>state.adminFunctions)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await axios.get(`${apiUrl}/admin/get-users`);
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

  if (!currentUser || !currentUser?.is_admin) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  function handleViewUser(user){
    dispatch(setViewUser(user))
    navigate("/admin/viewUser")
  }

  return (
    <div className="h-[90%] w-full px-2 flex items-center justify-center py-2 md:pt-14 md:px-10">
      <div className="bg-white w-full h-5/6 md:4/6 lg:w-11/12 rounded-lg relative overflow-y-auto">
        <div className="flex items-center text-sm lg:text-base p-4 text-secondary border-b-2 border-primary">
          <p className="w-2/5 md:w-1/5 mr-4 font-semibold ">Name</p>
          <p className="w-1/5 mr-4 hidden md:block font-semibold ">E-mail</p>
          <p className="w-1/5 mr-4 hidden lg:block font-semibold ">Phone</p>
          <p className="w-1/5 mr-4 hidden md:block font-semibold ">Balance (USD)</p>
          <p className="w-2/5 md:w-1/5 mr-4 font-semibold ">Acc_no</p>
          <p className="w-1/5 mr-4 font-semibold "><div className='p-2 text-white font-semibold mb-4 rounded-xl bg-red-600 text-center cursor-pointer' onClick={()=>dispatch(logout())}>Logout</div></p>
        </div>
        <div className="text-white p-4">
          {allUsers.length > 0 ? (
            allUsers.filter(user=>user?.is_admin !== true).map((user) => (
              <div key={user.accnumber} className="flex items-center text-sm border-b-2 text-secondary h-16 mb-4">
                <p className="w-2/5 md:w-1/5 mr-4 overflow-hidden ">
                  {`${user.firstname} ${user.lastname}`}
                </p>
                <p className="w-1/5 mr-4 hidden md:block overflow-hidden ">
                  {user.email}
                </p>
                <p className="w-1/5 mr-4 hidden lg:block overflow-hidden ">
                  {user.phone}
                </p>
                <p className="w-1/5 mr-4 overflow-hidden hidden md:block">
                  {user.balance || "N/A"}
                </p>
                <p className="w-2/5 md:w-1/5 mr-4 overflow-hidden ">
                  {user.accnumber}
                </p>
                <p className="w-1/5 mr-4 overflow-hidden flex items-center justify-center text-center">
                  <button onClick={()=>handleViewUser(user)} className="border border-customGreen py-2 px-3 rounded">
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

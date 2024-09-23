import axios from "axios";
import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { searchUser } from "../../slice/adminUserSlice";
import Loader from "../Loader";
import Logo from "../Logo";
import logoLG from "../../assets/logo large2.png";

const apiUrl = process.env.REACT_APP_API_URL;

export default function AdminNav() {
  const [userQuery, setUserQuery] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}/users`);
      dispatch(searchUser(response.data));
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  return (
    <nav className="flex items-center justify-between bg-coolAsh md:absolute left-0 top-0 w-full h-[100px] md:h-[80px] text-white p-4">
      <div>
        <Logo extraClass="w-[100px]" imageSrc={logoLG} />
      </div>
      <form
        onSubmit={handleSearch}
        className="flex w-/5 items-center justify-between border rounded h-full border-customGreen"
      >
        <input
          value={userQuery}
          placeholder="Search Name or ID"
          className="text-base block bg-transparent focus:outline-none h-[60px] w-[75%] md:w-10/12 px-4 box-border"
          onChange={(e) => setUserQuery(e.target.value)}
          type="text"
        />
        <button className="flex items-center justify-center h-full bg-customGreen w-2/12 font-semibold">
          <IoSearchSharp size={25} />
        </button>
      </form>
    </nav>
  );
}

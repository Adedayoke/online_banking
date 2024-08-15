import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const { pathname } = useLocation();
  const { isLoggedIn, currentUser } = useSelector(
    (state) => state.userAuth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "userAuth/logout" });
    toast.success("Logged out successfully");
    navigate("/login");
  };
  useEffect(function(){
    console.log(currentUser)
  }, [currentUser])

  return (
    <nav className="bg-cyan-500 text-xs md:text-sm text-stone-200 p-2 md:p-5 flex items-center justify-between h-14 absolute left-0 top-0 w-full z-10">
      <div>Logo</div>
      {isLoggedIn ? (
        <ul className="flex items-center justify-between">
          <li
            onClick={handleLogout}
            className="px-3 py-2 md:mr-4 md:px-4 md:py-3 bg-stone-700 rounded cursor-pointer"
          >
            Logout
          </li>
        </ul>
      ) : (
        <ul className="md:flex items-center justify-between">
          {pathname === "/login" && (
            <li className="mr-4">
              <Link to="/signup/one" className="px-4 py-3 bg-stone-700 rounded">
                Signup
              </Link>
            </li>
          )}
          {pathname.includes("/signup") && (
            <li>
              <Link
                to="/login"
                className="px-4 py-3 border border-stone-200 rounded"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      )}
      {/* <div className="md:hidden">
        <GiHamburgerMenu />
      </div> */}
    </nav>
  );
}

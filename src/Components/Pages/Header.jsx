
import { NavLink, useNavigate } from "react-router-dom";
import { HiAcademicCap } from "react-icons/hi";
import React, { useState, useEffect, useContext } from "react";
import AuthProvider, { AuthContext } from "./Authentication/Providers/AuthProvider";

const Header = () => {
  const navigate = useNavigate();


  const [theme, setTheme] = useState("default");
  const {createUser,user,logout, userRole}=useContext(AuthContext);
 
 /* const handleLogout = async () => {
    await logout(); // Wait for the logout function to complete
    navigate('/');  // Navigate to home or login page after successful logout
};
*/
const handleLogout = async () => {
  try {
    await logout(); // Wait for logout
    navigate('/teacher_login');
    console.log('AFTER') // Navigate to the desired login route
  } catch (error) {
    console.error("Error during logout:", error);
  }
};



  useEffect(() => {

   
   

    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme(e.target.value);
    } else {
      setTheme("cupcake");
    }
  };

  const links = () => (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/teacher_info">Teachers info</NavLink>
      </li>
      <li>
        <NavLink to="/about">About us</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact us</NavLink>
      </li>
      {
        user &&<>
        {userRole === "teacher" && (
             <NavLink className="mt-2" to="/profile">Profile</NavLink>       
                )}
        
        <NavLink className="mt-2  ml-2" to= "/Postpage">Dashboard</NavLink>
        
        </>

      }
    </>
  );

  return (
   <div>
     <div className="navbar bg-base-100 ml-5">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            {links()}
          </ul>
        </div>
        <div className="flex">
          <HiAcademicCap className="mt-4" />
          <NavLink to="/" className="btn btn-ghost mr-4 text-2xl font-extrabold">
            TuitionHub
          </NavLink>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links()}</ul>
      </div>
    
    
     <div className="">
        <input
          type="checkbox"
          value="synthwave"
          className="toggle theme-controller"
          onChange={handleToggle}
          aria-label="Synthwave Theme"
        />
      </div>
      <div className="navbar-end">
        {
          user? <>
        <a onClick={handleLogout} className="btn btn-sm" href="">Sign out</a>
          </>
          :
          <NavLink to="/teacher_login" ><button>Log in</button></NavLink>
        }
       
      

      </div>
    
    </div>
   </div>
  );
};

export default Header;






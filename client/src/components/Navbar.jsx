import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Auth } from "../context/Usercontext"

const Navbar = () => {

  const [user] = Auth();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isId")
    setUser({});
  }

  return (
    <div className='w-full text-white h-12 bg-gray-600 flex items-center px-2 lg:px-6'>
      <div className='w-full flex items-center justify-between'>
        <div className="left mr-3 text-md lg:text-xl font-bold ">shrirupeshpawarfoundation</div>
        <div className="right flex gap-4 text-lg font-semibold">
          { user.fullName && <Link className='text-sm lg:text-xl' to={ "/" }>Home</Link> }
          { !user.fullName &&
            <>
              <Link className='text-sm lg:text-xl' to={ "/login" }>Login</Link>
              <Link className='text-sm lg:text-xl' to="/register">Register</Link>
            </>
          }
          {/* {user.fullName && <Link to={"/idcard"}>Idcard</Link>} */ }
          { user.fullName && <Link className='text-sm lg:text-xl' onClick={ handleLogout } to="/login">Logout</Link> }
        </div>
      </div>
    </div>
  )
}

export default Navbar

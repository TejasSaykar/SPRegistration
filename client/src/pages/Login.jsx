import { message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Auth} from "../context/Usercontext"

const Login = () => {

  const [user, setUser] = Auth();
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  // console.log("isApprove", user.isApprove)

  // console.log(input)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login`, {
        emailId: input.email,
        password: input.password
      });
      if(data){
        // console.log(data);
        navigate("/");
        message.success("Login Successfully");
        setInput({
          email : "",
          password: ""
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        navigate("/")
      }
    } catch (error) {
      // console.log(error.response.data.message);
      message.error(error.response.data.message)
    }
  }

  return (
    <div className='w-full h-[92vh] flex text-white items-center justify-center' style={ { backgroundImage: "url('/img/loginBg.jpeg')", backgroundSize: "cover", } }>
      <div className='relative w-full md:w-1/3 sm:w-1/2 m-auto px-10 py-4'>
        <h1 className='text-center text-4xl font-semibold'>User Login</h1>
        <div>
          <button onClick={()=> navigate("/admin-login")} className='bg-sky-600 relative -right-48 mt-7 py-2 px-4 rounded-md hover:bg-sky-800'>Admin Login</button>
        </div>
        <form onSubmit={ handleSubmit }>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-lg'>Email</label>
              <input type="email" placeholder='email' className='p-2 rounded-sm text-black' value={ input.email } onChange={ (e) => setInput({ ...input, email: e.target.value }) } />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-lg'>Password</label>
              <input type="password" placeholder='password' className='p-2 rounded-sm text-black' value={ input.password } onChange={ (e) => setInput({ ...input, password: e.target.value }) } />
            </div>
            <button className='bg-green-400 hover:bg-green-600 text-white text-lg p-1 rounded-sm'>Login</button>
          </div>
          <span className='flex items-center justify-center my-2'>Don't have an account ? <Link className='mx-1 text-blue-700 font-semibold underline' to={"/register"}>Register</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login

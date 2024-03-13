import React from 'react'
import { useNavigate } from "react-router-dom"
import { Auth } from '../context/Usercontext';

const Home = () => {

  const [user] = Auth()
  const navigate = useNavigate();
  const isId = localStorage.getItem("isId");


  return (
    <div className='text-center my-4 text-xl font-bold h-[100vh-3rem]'>
      <div>
        Welcome { user.fullName }
      </div>
      <div className='flex flex-col px-10 py-8 md:flex-row md:gap-4 items-center justify-center'>
        { isId || user.isId? 
          <button style={ { backgroundColor: "green" } } className='text-white py-2 my-3 px-4 rounded-sm text-base' onClick={ () => navigate('/idcard') }>See Id Card</button>
          :
          <button style={ { backgroundColor: "green" } } className='text-white py-2 my-3 px-4 rounded-sm text-base' onClick={ () => navigate('/generateid') }>Generate Id Card</button> }
        <button className='text-white bg-sky-600 py-2 my-3 px-4 rounded-sm text-base' onClick={ () => navigate("/register-product") }>Register Product</button>
      </div>
    </div>
  )
}

export default Home

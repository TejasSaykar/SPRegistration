import React from 'react'
import './App.css'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Home'
import Idcard from './pages/Idcard'
import GenerateId from './pages/GenerateId'
import Productregister from './pages/Productregister'
import { Auth } from "././context/Usercontext"
import Payment from './pages/Payment'
import AdminLogin from './pages/AdminLogin'
import ProductList from './pages/ProductList'

function App() {

  
  return (
    <>
      {/* <h1 className='text-center'>Spitertech Registration</h1> */ }
      <div style={{display: window.print === true ? "none" : "block"}}>
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={ <IsLogin><Home /></IsLogin> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/admin-login' element={ <AdminLogin /> } />
        <Route path="/idcard" element={ <Idcard /> } />
        <Route path='/generateid' element={ <GenerateId /> } />
        <Route path='/register-product' element={<Productregister/>} />
        <Route path='/payment' element={<Payment/>} />
        <Route path='product-list' element={<ProductList/>} />
      </Routes>

    </>
  )
}
export const IsLogin = (props) => {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to={ "/login" } />
  }
}


export default App

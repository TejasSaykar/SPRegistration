import React, { useState } from 'react'
import axios from "axios"
import { message } from 'antd'
import {useNavigate} from "react-router-dom"
import { Auth } from '../context/Usercontext'

const Productregister = () => {

  const [product, setProduct] = useState({
    productName: "",
    purchaserName: "",
    purchaserAddress: "",
    purchaserMobile: "",
    purchaserWhatsapp: "",
    purchaserEmail: ""
  });

  const [setProd] = Auth()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(product.purchaserMobile)) {
            message.error("Invalid Mobile Number");
            return;
        }
        const mobileRegex1 = /^[0-9]{10}$/;
        if (!mobileRegex1.test(product.purchaserWhatsapp)) {
            message.error("Invalid Whatsapp Number");
            return;
        }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/product/purchase`, {
        productName: product.productName,
        purchaserName: product.purchaserName,
        purchaserAddress: product.purchaserAddress,
        purchaserMobile: product.purchaserMobile,
        purchaserWhatsapp: product.purchaserWhatsapp,
        purchaserEmail: product.purchaserEmail
      });
      if (data) {
        // console.log("Product", data.product);
        message.success("Product Purchsed");
        navigate("/payment")
        localStorage.setItem("product", JSON.stringify(data.product));
        setProd(data.product);
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  return (
    <div>
      <form className="max-w-sm mx-auto m-3 py-3  bg-gray-200 px-3 rounded-md" onSubmit={ handleSubmit }>
        <div className="mb-3">
          <label htmlFor="produtNmae" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
          <input type="text" id="productName" autoComplete='off' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={ product.productName } onChange={ (e) => setProduct({ ...product, productName: e.target.value }) } />
        </div>

        <div className="mb-3">
          <label htmlFor="purchaserName" className="block mb-2 text-sm font-medium text-gray-900 ">Purchaser Name</label>
          <input type="text" id="purchaserName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={ product.purchaserName } onChange={ (e) => setProduct({ ...product, purchaserName: e.target.value }) } />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Purchaser Address</label>
          <input type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={ product.purchaserAddress } onChange={ (e) => setProduct({ ...product, purchaserAddress: e.target.value }) } />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Purchaser Mobile Number</label>
          <input type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={ product.purchaserMobile } onChange={ (e) => setProduct({ ...product, purchaserMobile: e.target.value }) } />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Purchaser Whatsapp Number</label>
          <input type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-900  dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={ product.purchaserWhatsapp } onChange={ (e) => setProduct({ ...product, purchaserWhatsapp: e.target.value }) } />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Purchaser Email</label>
          <input type="email" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required value={ product.purchaserEmail } onChange={ (e) => setProduct({ ...product, purchaserEmail: e.target.value }) } />
        </div>

        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </div>
  )
}

export default Productregister

import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd';
import Spinner from '../components/Spinner';

const Payment = () => {

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const product = JSON.parse(localStorage.getItem("product"));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            message.error("Upload Screenshot");
            return;
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);

            setLoading(true);
            try {
                await axios.post(`${import.meta.env.VITE_BASE_URL}/api/upload`, data);


                try {
                    const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/product/userEmail`, {
                        purchaserName: product.purchaserName,
                        productName: product.productName,
                        purchaserEmail: product.purchaserEmail
                    })
                    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/product/upload-screenshot`, {
                        productId: product._id,
                        screenshot: filename
                    })
                    if (data) {
                        navigate("/");
                        message.success("Payment Received")
                    }
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    }

    return (
        <div className='flex justify-center items-center h-full mt-20 mx-4 md:mx-0'>
            <form className="w-full max-w-sm h-full" onSubmit={ handleSubmit }>
                { loading && <Spinner /> }
                <h2 className='text-2xl text-center py-5'>Payment Details</h2>
                <div className="md:flex  md:items-center mb-6">
                    <div className="md:w-1/3 ">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Bank Id
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="MHB8664953" readOnly />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            upi id
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="text" value={ "john@ybl" } readOnly />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Payment Screenshot
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="file" onChange={ (e) => setFile(e.target.files[0]) } />
                    </div>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer" type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Payment

import React, { useState } from 'react'
import axios from "axios"
import { message } from "antd"
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Register = () => {
    const [input, setInput] = useState({
        fullName: "",
        emailId: "",
        password: "",
        confirmPass: "",
        address: "",
        aadharNumber: "",
        panCardNumber: "",
        whatsappNumber: ""
    });

    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    // console.log(input);

    // const [user, setUser] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.password !== input.confirmPass) {
            message.error("Password and confirm password not match");
            return
        }

        const aadharRegex = /^[0-9]{12}$/;
        if (!aadharRegex.test(input.aadharNumber)) {
            message.error("Invalid Aadhar Card Number");
            return;
        }


        const panRegex = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/;
        if (!panRegex.test(input.panCardNumber)) {
            message.error("Invalid PAN Card Number");
            return;
        }

        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(input.whatsappNumber)) {
            message.error("Invalid Mobile Nummber");
            return;
        }


        try {
            setLoading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/register`, input);
            if (data) {
                // setUser(data.newUser);
                // console.log("Newuser Data", data.newUser)
                // console.log("User Data", user);

                // localStorage.setItem("user", JSON.stringify(data.newUser));
                // setUser(data.newUser);

                try {
                    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/email`, { mobile: input.whatsappNumber, name: input.fullName, userLoginLink: "https://31.220.58.235:8080/api/user/isapprove/" + data.newUser._id });

                } catch (error) {
                    message.error(error.response.data.message)
                }
                navigate("/login");
            }
            setLoading(false)
            message.success("Register successfully");
            setInput({
                fullName: "",
                emailId: "",
                password: "",
                confirmPass: "",
                address: "",
                aadharNumber: "",
                panCardNumber: "",
                whatsappNumber: ""
            })
        } catch (error) {
            console.log(error.response.data.message);
            message.error(error.response.data.message);
            setLoading(false)
        }
    }

    // if(loading){
    //     return <Spinner/>
    // }

    return (
        <div className='w-full h-full sm:h-screen lg:h-[92vh] flex items-center justify-center bg-red-50' >
            <div className='w-full m-auto px-10 py-4'>
                { loading && <Spinner /> }
                <h1 className='text-center text-4xl font-semibold mb-4'>Register</h1>
                <form onSubmit={ handleSubmit }>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col sm:flex-row w-full gap-4'>
                            <div className='flex flex-col w-full sm:w-1/2 lg:w-1/3'>
                                <label htmlFor="" className='text-lg'>Full Name</label>
                                <input type="text" placeholder='Fullname' className='p-2 rounded-sm' value={ input.fullName } onChange={ (e) => setInput({ ...input, fullName: e.target.value }) } />
                            </div>
                            <div className='flex flex-col w-full sm:w-1/2 lg:w-1/3'>
                                <label htmlFor="" className='text-lg'>Email Id</label>
                                <input type="email" placeholder='Email id' className='p-2 rounded-sm' value={ input.emailId } onChange={ (e) => setInput({ ...input, emailId: e.target.value }) } />
                            </div>
                            <div className='flex flex-col w-full sm:w-1/2 lg:w-1/3'>
                                <label htmlFor="" className='text-lg'>Aadhar Number</label>
                                <input type="text" placeholder='Aadhar number' className='p-2 rounded-sm' value={ input.aadharNumber } onChange={ (e) => setInput({ ...input, aadharNumber: e.target.value }) } />
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row w-full gap-4'>
                            <div className='flex flex-col w-full sm:w-1/2 lg:w-1/3'>
                                <label htmlFor="" className='text-lg'>Pancard Number</label>
                                <input type="text" placeholder='Pancard number' className='p-2 rounded-sm' value={ input.panCardNumber } onChange={ (e) => setInput({ ...input, panCardNumber: e.target.value }) } />
                            </div>
                            <div className='flex flex-col w-full sm:w-1/2 lg:w-1/3'>
                                <label htmlFor="" className='text-lg'>Whatsapp Number</label>
                                <input type="text" placeholder='Whatsapp number' className='p-2 rounded-sm' value={ input.whatsappNumber } onChange={ (e) => setInput({ ...input, whatsappNumber: e.target.value }) } />
                            </div>
                            <div className='flex flex-col w-full sm:w-1/2 lg:w-1/3'>
                                <label htmlFor="" className='text-lg'>Password</label>
                                <input type="password" placeholder='Password' className='p-2 rounded-sm' value={ input.password } onChange={ (e) => setInput({ ...input, password: e.target.value }) } />
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row w-full gap-4 sm:justify-center sm:items-center'>
                            <div className='flex flex-col w-full sm:w-1/2 lg:w-1/3'>
                                <label htmlFor="" className='text-lg'>Confirm Password</label>
                                <input type="password" placeholder='Confirm password' className='p-2 rounded-sm' value={ input.confirmPass } onChange={ (e) => setInput({ ...input, confirmPass: e.target.value }) } />
                            </div>
                            <div className='flex flex-col w-full sm:w-1/2 lg:w-1/3'>
                                <label htmlFor="" className='text-lg'>Address</label>
                                <input type="text" placeholder='Address' className='p-2 rounded-sm' value={ input.address } onChange={ (e) => setInput({ ...input, address: e.target.value }) } />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col my-4 md:items-center'>
                        <button className='bg-green-400 hover:bg-green-600 text-white text-lg p-1 rounded-sm w-20'>Register</button>
                        <span className='my-3'>Already have an account ! <Link className='text-blue-700 font-semibold underline' to={ "/login" }>Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register

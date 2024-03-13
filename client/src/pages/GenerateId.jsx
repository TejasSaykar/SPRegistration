import React, { useState } from 'react'
import { message } from "antd"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Auth } from '../context/Usercontext'

const GenerateId = () => {

    const [fullName, setFullName] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [DOB, setDOB] = useState("");
    const [contactNumber1, setContactNumber1] = useState("");
    const [contactNumber2, setContactNumber2] = useState("");
    const [address, setAddress] = useState("");
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const [user] = Auth()

    // console.log(file);

    const userId = user._id;
    // console.log("userId", userId);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(contactNumber1)) {
            message.error("Invalid Mobile Number1");
            return;
        }
        const mobileRegex1 = /^[0-9]{10}$/;
        if (!mobileRegex1.test(contactNumber2)) {
            message.error("Invalid Mobile Number2");
            return;
        }

        let user = {
            userId, fullName, bloodGroup, DOB, contactNumber1, contactNumber2, address
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            user.photo = filename;

            try {
                await axios.post(`${import.meta.env.VITE_BASE_URL}/api/upload`, data);
            } catch (error) {
                // console.log(error);
                message.error(error.response.data.message)
            }
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/generateId`, user);
                if (data) {
                    // console.log("Generate",data.idCard);
                    message.success("Id card generated");
                    navigate(`/idcard/`)
                }
            } catch (error) {
                // console.log(error);
                message.error(error.response.data.message);
            }
        }

    }

    return (
        <div className='flex justify-center items-center w-full h-full my-2 '>
            <form onSubmit={ handleSubmit } className='bg-fuchsia-200 px-3 mx-4 flex flex-col gap-3 py-4'>
                <h2 className='text-center text-xl font-semibold pb-3'>Generate Id Card</h2>
                <div className='w-full flex flex-col gap-3'>
                    <div className='flex flex-col'>
                        <label className='font-semibold text-gray-600' htmlFor="">Full Name : </label>
                        <input type="text" className='p-2 rounded-sm' value={ fullName } onChange={ (e) => setFullName(e.target.value) } placeholder='Full name' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold text-gray-600' htmlFor="">Blood Group : </label>
                        <input type="text" className='p-2 rounded-sm' value={ bloodGroup } onChange={ (e) => setBloodGroup(e.target.value) } placeholder='Blood Group' />
                    </div>
                </div>
                <div className='w-full flex flex-col gap-3'>
                    <div className='flex flex-col'>
                        <label className='font-semibold text-gray-600' htmlFor="">DOB : </label>
                        <input type="text" className='p-2 rounded-sm' value={ DOB } onChange={ (e) => setDOB(e.target.value) } placeholder='DOB: Separate with "/"(slash)' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold text-gray-600' htmlFor="">Contact Number1 : </label>
                        <input type="text" className='p-2 rounded-sm' value={ contactNumber1 } onChange={ (e) => setContactNumber1(e.target.value) } placeholder='Contact number1' />
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col'>
                        <label className='font-semibold text-gray-600' htmlFor="">Contact Number2 : </label>
                        <input type="text" className='p-2 rounded-sm' value={ contactNumber2 } onChange={ (e) => setContactNumber2(e.target.value) } placeholder='Contact number2' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold text-gray-600' htmlFor="">Address : </label>
                        <input type="text" className='p-2 rounded-sm' value={ address } onChange={ (e) => setAddress(e.target.value) } placeholder='Contact number2' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold text-gray-600' htmlFor="">Upload Photo : </label>
                        <input type="file" className='p-2 rounded-sm' onChange={ (e) => setFile(e.target.files[0]) } />
                    </div>
                </div>
                <button className='py-2 bg-green-400'>Generate</button>
            </form>
        </div>
    )
}

export default GenerateId

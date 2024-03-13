import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Auth } from "../context/Usercontext";
import { useReactToPrint } from 'react-to-print';

const Idcard = () => {
    const [User, setUser] = useState({});
    // const PF = "http://31.220.58.235:8080/images/";
    const PF = "http://31.220.58.235:8080/images/";
    const [user, setIsId] = Auth();

    // const userId = user._id;
    // console.log(userId)

    const componentRef = useRef();

    const getIdCard = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/user/getuser/${user._id}`);
            if (data) {
                setUser(data.employee.idCard[0]);
                // console.log("Idcard Data", data.employee.idCard[0]);
                localStorage.setItem("isId", true);
                setIsId(data.employee);
            }
        } catch (error) {
            // message.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getIdCard();
    }, [user.fullName]);


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    return (
        <>
            <div className="flex my-5 justify-center w-full h-[90vh]">
                <div ref={ componentRef } id="print" className="flex justify-center w-full h-[90vh]">
                    <div id="print" className="relative w-full sm:w-1/3 lg:w-[400px] m-auto flex flex-col items-center justify-center  border border-gray-500 rounded-lg">
                        <div id="bg" className="h-[400px] flex flex-col items-start justify-center w-full pl-7">
                            <div className="idImg m-auto relative flex mt-16 mx-3 items-center ml-[6rem]">
                                <img
                                    src={ PF + User.photo }
                                    className="rounded-full border-2 border-yellow-400 flex items-center justify-center"
                                    width={ 150 }
                                    height={ 150 }
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-blue-700">User Id : </span>
                                    <h1 className="font-semibold mx-2 text-gray-800">{ User.userId }</h1>
                                </div>
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-blue-700">Full Name : </span>
                                    <h1 className="font-semibold mx-2 text-gray-800">{ User.fullName }</h1>
                                </div>
                                <div className="flex my-2" items-start>
                                    <span className="font-semibold text-blue-700">
                                        Blood Group :{ " " }
                                    </span>
                                    <h1 className="font-semibold mx-2 text-gray-800">{ User.bloodGroup }</h1>
                                </div>
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-blue-700">DOB : </span>
                                    <h1 className="font-semibold mx-2 text-gray-800">{ User.DOB }</h1>
                                </div>
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-blue-700">
                                        Contact Number1 :{ " " }
                                    </span>
                                    <h1 className="font-semibold mx-2 text-gray-800">+91 { User.contactNumber1 }</h1>
                                </div>
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-blue-700">
                                        Contact Number2 :{ " " }
                                    </span>
                                    <h1 className="font-semibold mx-2 text-gray-800">+91 { User.contactNumber2 }</h1>
                                </div>
                                <div className="flex my-2 items-start">
                                    <span className="font-semibold text-blue-700">
                                        Address :{ " " }
                                    </span>
                                    <h1 className="font-semibold mx-2 text-gray-800">{ User.address }</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center mb-5">
                <button onClick={ handlePrint } className="bg-blue-400 py-2 px-4 rounded-lg">Print</button>
            </div>

        </>
    );
};

export default Idcard;

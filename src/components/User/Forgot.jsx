import React, { useState } from 'react';
import '../../Style/user.css'

const Forgot = (props) => {
    // const host = "https://deltainvesting.herokuapp.com";
    // const host = "http://localhost:5000"

    const [value, setValue] = useState({ email: '' })

    const handleOnChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        props.setProgress(30)
        const res = await fetch(`${process.env.REACT_APP_HOSTURI}/api/user/forgot-password`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                email: value.email
            })
        })
        props.setProgress(70)
        const json = await res.json();
        props.setProgress(100)
        console.log(json);
        if (json.success) {
            props.toast.success("Email Sent")
        }
        else if (!json.success) {
            props.toast.error("Something went Wrong")
        }
    }

    return (
        <div className="flex justify-center items-center user-back h-[85vh]">
            <div className="center">
                <div className="container p-3 center-card">
                    {/* Forgot Heading */}
                    <div className="container mx-auto mt-6">
                        <div className='w-fit mx-auto flex flex-col justify-center items-center'>
                            <h1 className="text-center text-2xl lg:text-3xl">Enter your Mail</h1>
                            <div style={{ width: '90%', height: '4px', borderRadius: '100px' }} className="bg-blue-500"></div>
                        </div>
                    </div>


                    {/* Forgot Form */}
                    <form onSubmit={handleOnSubmit} className='p-2'>

                        <div className="flex flex-col my-4 mb-7">
                            <label htmlFor="email" className="mb-1">Email :</label>
                            <input type="text" id="email" name="email" className="focus:outline-none focus:ring rounded-full bg-slate-200 py-2 px-2" placeholder="E-Mail" onChange={handleOnChange} />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="px-4 p-2 bg-blue-700 text-white rounded-2xl mb-3 ring-offset-1 ring-indigo-400 focus:ring">
                                Send Mail
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forgot

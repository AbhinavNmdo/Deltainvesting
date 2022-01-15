import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Reset = (props) => {
    const { id } = useParams();
    const { token } = useParams();

    const [validate, setValidate] = useState(false);
    const navigate = useNavigate();

    // const host = "http://localhost:5000"
    // const host = "https://deltainvesting.herokuapp.com";

    const fetchReset = async () => {
        props.setProgress(30)
        const res = await fetch(`${process.env.REACT_APP_HOSTURI}/api/user/reset-password/authentication`, {
            method: 'GET',
            headers: {
                "id": id,
                "token": token,
                "Content-type": 'application/json'
            }
        })
        props.setProgress(70)
        const json = await res.json();
        props.setProgress(100)
        if (json.success) {
            setValidate(true);
        }
        else {
            setValidate(false)
        }
    }

    useEffect(() => {
        fetchReset();
        // eslint-disable-next-line
    }, [])

    const [value, setValue] = useState({ password: '', cpassword: '' })

    const handleOnChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        props.setProgress(30)
        const res = await fetch(`${process.env.REACT_APP_HOSTURI}/api/user/reset-password`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json',
                id,
                token
            },
            body: JSON.stringify({
                password: value.password,
                cpassword: value.cpassword
            })
        })
        props.setProgress(70)
        const json = await res.json();
        if (json.success) {
            props.setProgress(100)
            setTimeout(() => {
                navigate('/login')
                props.toast.success("Password Changed Successfully")
            }, 2000);
        }
    }

    if (validate) {
        return (
            <div className="flex justify-center items-center h-[85vh] user-back" >
                <div className="center">
                    <div className="container p-3 center-card">
                        {/* Forgot Heading */}
                        <div className="container mx-auto mt-6 mb-6">
                            <div className='w-fit mx-auto flex flex-col justify-center items-center'>
                                <h1 className="text-center text-2xl lg:text-3xl">Enter Password</h1>
                                <div style={{ width: '90%', height: '4px', borderRadius: '100px' }} className="bg-blue-500"></div>
                            </div>
                        </div>


                        {/* Reset Form */}
                        <form onSubmit={handleOnSubmit} className='p-2'>

                            <div className="flex flex-col mb-4">
                                <label htmlFor="password" className="mb-1">Password :</label>
                                <input type="password" id="password" name="password" className="focus:outline-none focus:ring rounded-full bg-slate-200 py-2 px-2" placeholder="Password" onChange={handleOnChange} />
                            </div>

                            <div className="flex flex-col mb-4">
                                <label htmlFor="cpassword" className="mb-1">Confirm-Password :</label>
                                <input type="password" id="cpassword" name="cpassword" className="focus:outline-none focus:ring rounded-full bg-slate-200 py-2 px-2" placeholder="Confirm-Password" onChange={handleOnChange} />
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="d-flex justify-content-center align-items-center user-back" style={{ height: '89vh' }}>
                <div className="center">
                    <div className="container p-3 center-card">
                        <form onSubmit={handleOnSubmit}>

                            <h1 className="my-4 fs-1 form-text">Request Timed Out</h1>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reset

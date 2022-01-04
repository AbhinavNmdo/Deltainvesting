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
        if (json.success) {
            props.toast.success("Email Sent")
        }
        else if (!json.seccess) {
            props.toast.error("Something went Wrong")
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center user-back" style={{height: '89vh'}}>
            <div className="center">
                <div className="container p-3 center-card">
                    <h1 className="text-center mb-5">Forgot</h1>
                    <form onSubmit={handleOnSubmit} className='p-2'>

                        <div className="form-outline mb-4">
                            <input type="text" id="email" name="email" className="form-control" placeholder="E-Mail" onChange={handleOnChange} />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-block mb-4">
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

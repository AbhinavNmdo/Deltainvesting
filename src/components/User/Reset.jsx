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
            <div className="d-flex justify-content-center align-items-center user-back" style={{height: '89vh'}}>
                <div className="center">
                    <div className="container p-3 center-card">
                        <h1 className="text-center mb-5">Reset Password</h1>
                        <form onSubmit={handleOnSubmit} className='p-2'>

                            <div className="form-outline mb-4">
                                <input type="password" id="password" name="password" className="form-control" placeholder="Password" onChange={handleOnChange} />
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="cpassword" name="cpassword" className="form-control" placeholder="Confirm-Password" onChange={handleOnChange} />
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
            <div className="d-flex justify-content-center align-items-center user-back" style={{height: '89vh'}}>
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

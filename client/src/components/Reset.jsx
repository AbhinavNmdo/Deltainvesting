import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';

const Reset = (props) => {
    const {id} = useParams();
    const {token} = useParams();

    const [validate, setValidate] = useState(false);
    const history = useHistory();

    // const host = "http://localhost:5000"
    const host = "https://deltainvesting.herokuapp.com";

    const fetchReset = async ()=>{
        const res = await fetch(`${host}/api/user/reset-password/authentication`, {
            method: 'GET',
            headers: {
                "id": id,
                "token": token,
                "Content-type": 'application/json'
            }
        })
        const json = await res.json();
        if(json.success){
            setValidate(true);
        }
        else{
            setValidate(false)
        }
    }

    fetchReset();

    const [value, setValue] = useState({password: '', cpassword: ''})

    const handleOnChange = (e) => {
        setValue({...value, [e.target.name]: e.target.value})
    }

    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const res = await fetch(`${host}/api/user/reset-password`, {
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
        const json = await res.json();
        if(json.success){
            setTimeout(() => {
                history.push('/login')
                props.toast.success("Password Changed Successfully")
            }, 2000);
        }
    }

    if(validate){
        return (
            <div style={{ background: 'url(https://static.vecteezy.com/system/resources/previews/002/062/658/non_2x/business-candle-stick-graph-chart-of-stock-market-investment-trading-on-white-background-design-bullish-point-trend-of-graph-illustration-vector.jpg) center' }}>
                <div className="container p-4 d-flex flex-column justify-content-center align-items-center" style={{ height: '89vh' }}>
                    <div className="card d-flex flex-column justify-content-center align-items-center" style={{ borderRadius: '13px', boxShadow: '1px 1px 20px' }}>
                        <h1 className="my-4 fs-3">Enter Pass</h1>
                        <form onSubmit={handleOnSubmit} style={{ width: '300px', padding: '15px' }}>
    
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
    else{
        return (
            <div style={{ background: 'url(https://static.vecteezy.com/system/resources/previews/002/062/658/non_2x/business-candle-stick-graph-chart-of-stock-market-investment-trading-on-white-background-design-bullish-point-trend-of-graph-illustration-vector.jpg) center' }}>
                <div className="container p-4 d-flex flex-column justify-content-center align-items-center" style={{ height: '89vh' }}>
                    <div className="card d-flex flex-column justify-content-center align-items-center" style={{ borderRadius: '13px', boxShadow: '1px 1px 20px', padding: '10px' }}>
                        <h1 className="my-4 fs-1 form-text">Request Timed Out</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reset

import React, { useState } from 'react'

const Forgot = (props) => {
    const host = "https://deltainvesting.herokuapp.com";
    // const host = "http://localhost:5000"

    const [value, setValue] = useState({email: ''})

    const handleOnChange = (e) => {
        setValue({...value, [e.target.name]: e.target.value})
    }

    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const res = await fetch(`${host}/api/user/forgot-password`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                email: value.email
            })
        })
        const json = await res.json();
        if(json.success){
            props.toast.success("Email Sent")
        }
        else if(!json.seccess){
            props.toast.error("Something went Wrong")
        }
    }

    return (
        <div style={{ background: 'url(https://static.vecteezy.com/system/resources/previews/002/062/658/non_2x/business-candle-stick-graph-chart-of-stock-market-investment-trading-on-white-background-design-bullish-point-trend-of-graph-illustration-vector.jpg) center' }}>
            <div className="container p-4 d-flex flex-column justify-content-center align-items-center" style={{ height: '89vh' }}>
                <div className="card d-flex flex-column justify-content-center align-items-center" style={{ borderRadius: '13px', boxShadow: '1px 1px 20px' }}>
                    <h1 className="my-4 fs-3">Enter Mail</h1>
                    <form onSubmit={handleOnSubmit} style={{ width: '300px', padding: '15px' }}>

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

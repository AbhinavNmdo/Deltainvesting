import React, { useState } from 'react'

const BlackSchole = () => {
    const gaussian = require('gaussian')
    const [value, setValue] = useState(0);

    // const [result1, setResult1] = useState(0);
    // const [result2, setResult2] = useState(0);
    // const [result3, setResult3] = useState(0);
    // const [result4, setResult4] = useState(0);
    const [result5, setResult5] = useState(0);
    // const [result6, setResult6] = useState(0);
    const [result7, setResult7] = useState(0);
    const [result8, setResult8] = useState(0);
    const [result9, setResult9] = useState(0);

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const BScal = (e) => {
        e.preventDefault();
        const days = parseFloat(value.t / 365).toFixed(4)
        const r1 = (parseFloat(value.EX) * (Math.exp((-parseFloat(value.rf) / 100) * parseFloat(days)))).toFixed(4);

        const r2 = ((parseFloat(value.a) / 100) * Math.pow(days, 0.5)).toFixed(4);

        const r3 = (((Math.log(parseFloat(value.P) / parseFloat(value.EX))) + ((parseFloat(value.rf) / 100) + (parseFloat(value.a) / 100) * ((parseFloat(value.a) / 100) / 2)) * parseFloat(days)) / ((parseFloat(value.a) / 100) * (Math.pow(parseFloat(days), 0.5)))).toFixed(4);

        const r4 = (parseFloat(r3) - parseFloat(r2)).toFixed(4);

        var distribution1 = gaussian(0, 1);
        var distribution2 = gaussian(0, 1);
        const r5 = distribution1.cdf(r3).toFixed(4)

        const delta_put = parseFloat(r5) - 1

        const r6 = distribution2.cdf(r4).toFixed(4)

        const call = parseFloat(value.P) * parseFloat(r5).toFixed(4) - ((parseFloat(value.EX) * parseFloat(r6)) / Math.exp(parseFloat(value.rf / 100) * parseFloat(days))).toFixed(2)

        const put = (parseFloat(call) + parseFloat(r1)) - parseFloat(value.P)

        // const first = eval(Math.log(parseFloat(value.P) / parseFloat(value.EX)))
        // const second = eval((parseFloat(value.rf) / 100) + (parseFloat(value.a) / 100) * ((parseFloat(value.a) / 100) / 2) )
        // const third = eval(second * parseFloat(days))
        // const forth = eval(first + third)
        // const five = eval((parseFloat(value.a) / 100) * (Math.pow(parseFloat(days), 0.5)))
        // setResult1(r1);
        // setResult2(r2);
        // setResult3(r3);
        // setResult4(r4);
        setResult5(r5);
        // setResult6(r6);
        setResult7(call);
        setResult8(put);
        setResult9(delta_put)
    }
    return (
        <>
            {/* Option Price Calculator */}
            <div className="container my-4">
                <div className="card p-4">
                    <h1 align="center" className="form-text fs-1">Option Price Calculator</h1>
                    <div className="row my-4">
                        <div className="col-md-6">
                            <div className="card p-3">
                                <form>
                                    <div className="row g-3 align-items-center">
                                        <div className="col">
                                            <label htmlFor="P" className="col-form-label mt-4">Current Stock Price: </label>
                                        </div>
                                        <div className="col">
                                            <input className="form-control mt-4" type="number" id="P" name="P" onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-center">
                                        <div className="col">
                                            <label htmlFor="EX" className="col-form-label mt-4">Strike Price: </label>
                                        </div>
                                        <div className="col">
                                            <input className="form-control mt-4" type="number" name="EX" onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-center">
                                        <div className="col">
                                            <label htmlFor="t" className="col-form-label mt-4">Days Remaining: </label>
                                        </div>
                                        <div className="col">
                                            <input className="form-control mt-4" type="number" id="t" name="t" onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-center">
                                        <div className="col">
                                            <label htmlFor="rf" className="col-form-label mt-4">Interest Rate: </label>
                                        </div>
                                        <div className="col">
                                            <input className="form-control mt-4" type="number" id="rf" name="rf" onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-center">
                                        <div className="col">
                                            <label htmlFor="a" className="col-form-label mt-4">Volatility: </label>
                                        </div>
                                        <div className="col">
                                            <input className="form-control mt-4" type="number" id="a" name="a" onChange={handleChange} />
                                        </div>
                                    </div>

                                    <button className="btn btn-primary mt-5" onClick={BScal}>Submit</button>
                                </form>
                                {/* <h1 className="form-text fs-2" name="EXv">Present Value of Exercise Price (PV(EX)) = {result1}</h1>
                                <h1 className="form-text fs-2">s*t^.5 = {result2}</h1>
                                <h1 className="form-text fs-2">d1 = {result3}</h1>
                                <h1 className="form-text fs-2">d2 = {result4}</h1>
                                <h1 className="form-text fs-2">Delta N(d1) Normal Cumulative Density Function = {result5}</h1>
                                <h1 className="form-text fs-2">Bank Loan  N(d2)*PV(EX) = {result6}</h1>
                                <h1 className="form-text fs-2">Value of Call = {result7}</h1>
                                <h1 className="form-text fs-2">Value of Put = {result8}</h1> */}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card p-3 w-100 h-100 d-flex justify-content-center align-items-center">
                                <table className="table table-dark w-100">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Call</th>
                                            <th scope="col">Put</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Price</th>
                                            <td>{result7}</td>
                                            <td>{result8}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Delta</th>
                                            <td>{result5}</td>
                                            <td>{result9}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Gamma</th>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlackSchole;
import React, { useState } from 'react'

const BlackSchole = () => {
    const gaussian = require('gaussian')
    const [value, setValue] = useState(0);
    const [solu, setSolu] = useState({call: 0, put: 0, dcall: 0, dput: 0})

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const BScal = (e) => {
        e.preventDefault();
        const days = parseFloat(value.t / 365)
        const r1 = (parseFloat(value.EX) * (Math.exp((-parseFloat(value.rf) / 100) * parseFloat(days))));

        const r2 = ((parseFloat(value.a) / 100) * Math.pow(days, 0.5));

        const r3 = (((Math.log(parseFloat(value.P) / parseFloat(value.EX))) + ((parseFloat(value.rf) / 100) + (parseFloat(value.a) / 100) * ((parseFloat(value.a) / 100) / 2)) * parseFloat(days)) / ((parseFloat(value.a) / 100) * (Math.pow(parseFloat(days), 0.5))));

        const r4 = (parseFloat(r3) - parseFloat(r2));

        var distribution1 = gaussian(0, 1);
        var distribution2 = gaussian(0, 1);
        const r5 = distribution1.cdf(r3)

        const delta_put = parseFloat(r5) - 1

        const r6 = distribution2.cdf(r4)

        const call = parseFloat(value.P) * parseFloat(r5) - ((parseFloat(value.EX) * parseFloat(r6)) / Math.exp(parseFloat(value.rf / 100) * parseFloat(days)))

        const put = (parseFloat(call) + parseFloat(r1)) - parseFloat(value.P)

        const callr = Math.round((call + Number.EPSILON) * 100) / 100
        const putr = Math.round((put + Number.EPSILON) * 100) / 100
        const dcallr = Math.round((r5 + Number.EPSILON) * 100) / 100
        const dputr = Math.round((delta_put + Number.EPSILON) * 100) / 100

        setSolu(solu=>({...solu, dcall: dcallr}))
        setSolu(solu=>({...solu, dput: dputr}))
        setSolu(solu=>({...solu, call: callr}))
        setSolu(solu=>({...solu, put: putr}))
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
                                            <td>{solu.call}</td>
                                            <td>{solu.put}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Delta</th>
                                            <td>{solu.dcall}</td>
                                            <td>{solu.dput}</td>
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
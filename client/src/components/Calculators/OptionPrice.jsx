import React, { useState } from 'react'

const BlackSchole = () => {
    const gaussian = require('gaussian')
    const [value, setValue] = useState(0);
    const [solu, setSolu] = useState({call: 0, put: 0, dcall: 0, dput: 0, gamma: 0, theta_call: 0, theta_put: 0, vega: 0, rho_call: 0, rho_put: 0})

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const BScal = (e) => {
        e.preventDefault();
        const dividend_yeild = 0;
        const e_qt = Math.exp(dividend_yeild);   //! By default it is 0
        const days = parseFloat(value.t / 365)
        const csp = parseFloat(value.P);
        const sp = parseFloat(value.EX);
        const intr = parseFloat(value.rf) / 100;
        const volat = parseFloat(value.a) / 100;
        const Xe_rt = sp * Math.exp(-(intr * days));

        /* -------------------------------------------------------------------------- */
        /*                  // * Initial Calculations of Option Price                 */
        /* -------------------------------------------------------------------------- */

        const r1 = (parseFloat(value.EX) * (Math.exp((-parseFloat(value.rf) / 100) * parseFloat(days))));

        const r2 = ((parseFloat(value.a) / 100) * Math.pow(days, 0.5));

        const d1 = (((Math.log(parseFloat(value.P) / parseFloat(value.EX))) + ((parseFloat(value.rf) / 100) + (parseFloat(value.a) / 100) * ((parseFloat(value.a) / 100) / 2)) * parseFloat(days)) / ((parseFloat(value.a) / 100) * (Math.pow(parseFloat(days), 0.5))));

        const d2 = (parseFloat(d1) - parseFloat(r2));


        /* -------------------------------------------------------------------------- */
        /*                         // * Delta Call Put Values                         */
        /* -------------------------------------------------------------------------- */

        var distribution1 = gaussian(0, 1);
        var distribution2 = gaussian(0, 1);

        const delta_call = distribution1.cdf(d1)

        const delta_put = parseFloat(delta_call) - 1

        /* -------------------------------------------------------------------------- */
        /*                            //TODO: Need to check                           */
        /* -------------------------------------------------------------------------- */
        const back_loan = distribution2.cdf(d2);


        /* -------------------------------------------------------------------------- */
        /*                            // * Call Put Values                            */
        /* -------------------------------------------------------------------------- */

        const call = parseFloat(value.P) * parseFloat(delta_call) - ((parseFloat(value.EX) * parseFloat(back_loan)) / Math.exp(parseFloat(value.rf / 100) * parseFloat(days)))

        const put = (parseFloat(call) + parseFloat(r1)) - parseFloat(value.P)


        /* -------------------------------------------------------------------------- */
        /*                         // * Gamma Call put values                         */
        /* -------------------------------------------------------------------------- */

        const gamma_calc = Math.exp(-1 * Math.pow(d1, 2) / 2) / Math.sqrt(2 * Math.PI) * e_qt / (parseFloat(r1) * parseFloat(r2));


        /* -------------------------------------------------------------------------- */
        /*                         // * Theta Call Put values                         */
        /* -------------------------------------------------------------------------- */

        const theta_call = (-(csp * Math.exp( -1 * Math.pow(d1, 2) / 2) / Math.sqrt(2 * Math.PI) * volat * e_qt / (2 * Math.sqrt(days / 100) )) - (intr * Xe_rt * back_loan) + (dividend_yeild * csp * delta_call * e_qt)) / days;


        /* -------------------------------------------------------------------------- */
        /*                          // * Vega Call Put values                         */
        /* -------------------------------------------------------------------------- */

        const vega_calc = Math.exp(-1 * Math.pow(d1, 2) / 2) / Math.sqrt(2 * Math.PI) * e_qt * parseFloat(r1) * Math.sqrt(days)/100


        /* -------------------------------------------------------------------------- */
        /*                          // * Rho Call Put Values                          */
        /* -------------------------------------------------------------------------- */

        const rho_call = parseFloat(value.EX) * days * Math.exp(-1*(parseFloat(value.rf/100))*parseFloat(days)) * delta_call / 100

        const rho_put = parseFloat(value.EX) * days * Math.exp(-1*(parseFloat(value.rf/100))*parseFloat(days)) * distribution1.cdf(-(d1)) / 100


        /* -------------------------------------------------------------------------- */
        /*                    // * Rounding the values after decimal                  */
        /* -------------------------------------------------------------------------- */

        const callr = Math.round((call + Number.EPSILON) * 100) / 100
        const putr = Math.round((put + Number.EPSILON) * 100) / 100
        const delta_callr = Math.round((delta_call + Number.EPSILON) * 100) / 100
        const delta_putr = Math.round((delta_put + Number.EPSILON) * 100) / 100
        const gamma = Math.round((gamma_calc + Number.EPSILON) * 10000) / 10000
        const vegar = Math.round((vega_calc + Number.EPSILON) * 100) / 100
        const rho_callr = Math.round((rho_call + Number.EPSILON) * 100) / 100
        const rho_putr = Math.round((rho_put + Number.EPSILON) * 100) / 100
        /* -------------------- //? Rouding the theta call & put -------------------- */


        /* -------------------------------------------------------------------------- */
        /*                // * Setting the value into usestate hoooook                */
        /* -------------------------------------------------------------------------- */

        setSolu(solu=>({...solu, dcall: delta_callr}))
        setSolu(solu=>({...solu, dput: delta_putr}))
        setSolu(solu=>({...solu, call: callr}))
        setSolu(solu=>({...solu, put: putr}))
        setSolu(solu=>({...solu, gamma}))
        setSolu(solu=>({...solu, theta_call}))
        // setSolu(solu=>({...solu, theta_put}))
        setSolu(solu=>({...solu, vega: vegar}))
        setSolu(solu=>({...solu, rho_call: rho_callr}))
        setSolu(solu=>({...solu, rho_put: rho_putr}))
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
                                            <td>{solu.gamma}</td>
                                            <td>{solu.gamma}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Theta</th>
                                            <td>{solu.theta_call}</td>
                                            <td>{solu.theta_put}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Vega</th>
                                            <td>{solu.vega}</td>
                                            <td>{solu.vega}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Rho</th>
                                            <td>{solu.rho_call}</td>
                                            <td>{solu.rho_put}</td>
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
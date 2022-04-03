import React, { useState } from 'react'

const BlackSchole = () => {
    const gaussian = require('gaussian')
    const [value, setValue] = useState(0);
    const [solu, setSolu] = useState({ call: 0, put: 0, dcall: 0, dput: 0, gamma: 0, theta_call: 0, theta_put: 0, vega: 0, rho_call: 0, rho_put: 0 })

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

        const r1 = (parseFloat(sp) * (Math.exp((-intr) * parseFloat(days))));

        const r2 = ((volat) * Math.pow(days, 0.5));

        const d1 = (((Math.log(parseFloat(csp) / parseFloat(sp))) + ((intr) + (volat) * ((parseFloat(value.a) / 100) / 2)) * parseFloat(days)) / ((parseFloat(value.a) / 100) * (Math.pow(parseFloat(days), 0.5))));

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

        const call = parseFloat(csp) * parseFloat(delta_call) - ((parseFloat(sp) * parseFloat(back_loan)) / Math.exp(intr * parseFloat(days)))

        const put = (parseFloat(call) + parseFloat(r1)) - parseFloat(csp)


        /* -------------------------------------------------------------------------- */
        /*                         // * Gamma Call put values                         */
        /* -------------------------------------------------------------------------- */

        const gamma_calc = Math.exp(-1 * Math.pow(d1, 2) / 2) / Math.sqrt(2 * Math.PI) * e_qt / (parseFloat(r1) * parseFloat(r2));


        /* -------------------------------------------------------------------------- */
        /*                         // * Theta Call Put values                         */
        /* -------------------------------------------------------------------------- */

        var distribution3 = gaussian(0, 1);

        const theta_call = ((((-1*((((csp*((1/Math.sqrt((2*Math.PI)))*Math.exp(((-1*Math.pow(d1,2))/2))))*volat)*Math.exp(((-1*days)*dividend_yeild)))/(2*Math.sqrt(days))))+((dividend_yeild*csp)*delta_call))-(((intr*sp)*Math.exp(((-1*intr)*days)))*distribution3.cdf(d2))))/365;

        const theta_put = (((((-1*((((csp*((1/Math.sqrt((2*Math.PI)))*Math.exp(((-1*Math.pow(d1,2))/2))))*volat)*Math.exp(((-1*days)*dividend_yeild)))))/(2*Math.sqrt(days)))-(((dividend_yeild*csp)*distribution3.cdf((-1*d1)))*Math.exp(((-1*days)*dividend_yeild))))+(((intr*sp)*Math.exp(((-1*intr)*days)))*distribution3.cdf((-1*d1)))))/365;


        /* -------------------------------------------------------------------------- */
        /*                          // * Vega Call Put values                         */
        /* -------------------------------------------------------------------------- */

        const vega_calc = Math.exp(-1 * Math.pow(d1, 2) / 2) / Math.sqrt(2 * Math.PI) * e_qt * parseFloat(r1) * Math.sqrt(days) / 100


        /* -------------------------------------------------------------------------- */
        /*                          // * Rho Call Put Values                          */
        /* -------------------------------------------------------------------------- */

        const rho_call = parseFloat(sp) * days * Math.exp(-1 * (intr) * parseFloat(days)) * delta_call / 100

        const rho_put = (((((-1*sp)*days)*Math.exp(((-1*intr)*days)))*distribution3.cdf((-1*d2)))*Math.exp(((-1*dividend_yeild)*days)))/100


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
        const theta_callr = Math.round((theta_call + Number.EPSILON) * 100) / 100
        const theta_putr = Math.round((theta_put + Number.EPSILON) * 100) / 100


        /* -------------------------------------------------------------------------- */
        /*                // * Setting the value into usestate hoooook                */
        /* -------------------------------------------------------------------------- */

        setSolu(solu => ({ ...solu, dcall: delta_callr }))
        setSolu(solu => ({ ...solu, dput: delta_putr }))
        setSolu(solu => ({ ...solu, call: callr }))
        setSolu(solu => ({ ...solu, put: putr }))
        setSolu(solu => ({ ...solu, gamma }))
        setSolu(solu => ({ ...solu, theta_call: theta_callr }))
        setSolu(solu => ({...solu, theta_put: theta_putr}))
        setSolu(solu => ({ ...solu, vega: vegar }))
        setSolu(solu => ({ ...solu, rho_call: rho_callr }))
        setSolu(solu => ({ ...solu, rho_put: rho_putr }))
    }
    return (
        <>
            {/* Option Price Calculator */}
            <div className="container mx-auto lg:px-20 mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex justify-center items-center col-span-1 border-2 border-indigo-200 rounded-4xl">
                    <form className='grid grid-cols-1 lg:grid-cols-4 p-4' autocomplete="off">
                        <div className="col-span-3 flex flex-col justify-center items-center">
                            <div className="items-center mt-3 col-span-3">
                                <label htmlFor="P" className="text-slate-700">
                                    Current Stock Price:
                                </label>
                                <div className="col">
                                    <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" type="text" id="P" name="P" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="items-center mt-3">
                                <label htmlFor="EX" className="text-slate-700">
                                    Strike Price:
                                </label>
                                <div className="col">
                                    <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" type="text" id='EX' name="EX" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="items-center mt-3">
                                <label htmlFor="t" className="text-slate-700">
                                    Days Remaining:
                                </label>
                                <div className="col">
                                    <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" type="text" id="t" name="t" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="items-center mt-3">
                                <label htmlFor="rf" className="text-slate-700">
                                    Interest Rate:
                                </label>
                                <div className="col">
                                    <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" type="text" id="rf" name="rf" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="items-center mt-3">
                                <label htmlFor="a" className="text-slate-700">
                                    Volatility:
                                </label>
                                <div className="col">
                                    <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" type="text" id="a" name="a" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 my-8 lg:my-0 flex justify-center items-center'>
                            <button className="p-1 bg-blue-400 mx-4 rounded-4xl text-xl px-10 ring-offset-2 transition-all duration-75 active:bg-blue-500 active:ring active:ring-blue-400 active:text-white" onClick={BScal} type="submit">
                                Show Result
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col col-span-1 border-2 border-indigo-200 rounded-4xl">
                    <table className="border-separate my-6 lg:my-0">
                        <thead>
                            <tr>
                                <th scope="col" className='bg-indigo-300 rounded-xl p-3 px-7 rounded-tl-2xl rounded-bl-2xl'>#</th>
                                <th scope="col" className='bg-indigo-300 rounded-xl p-3 px-7'>CALL</th>
                                <th scope="col" className='bg-indigo-300 rounded-xl p-3 px-7 rounded-tr-2xl rounded-br-2xl mb'>PUT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row" className='p-2 bg-indigo-300 px-4 rounded-tl-2xl'>Price</th>
                                <td className='bg-indigo-200 p-2 px-4 text-center'>{solu.call}</td>
                                <td className='bg-indigo-200 p-2 px-4 text-center rounded-tr-2xl'>{solu.put}</td>
                            </tr>
                            <tr>
                                <th scope="row" className='p-2 bg-indigo-300 px-4'>Delta</th>
                                <td className='bg-indigo-200 p-2 px-4 text-center'>{solu.dcall}</td>
                                <td className='bg-indigo-200 p-2 px-4 text-center'>{solu.dput}</td>
                            </tr>
                            <tr>
                                <th scope="row" className='p-2 bg-indigo-300 px-4'>Gamma</th>
                                <td className='bg-indigo-200 p-2 px-4 text-center'>{solu.gamma}</td>
                                <td className='bg-indigo-200 p-2 px-4 text-center'>{solu.gamma}</td>
                            </tr>
                            <tr>
                                <th scope="row" className='p-2 bg-indigo-300 px-4'>Theta</th>
                                <td className='bg-indigo-200 p-2 px-4 text-center'>{solu.theta_call}</td>
                                <td className='bg-indigo-200 p-2 px-4 text-center'>{solu.theta_put}</td>
                            </tr>
                            <tr>
                                <th scope="row" className='p-2 bg-indigo-300 px-4'>Vega</th>
                                <td className='bg-indigo-200 p-2 px-4 text-center'>{solu.vega}</td>
                                <td className='bg-indigo-200 p-2 px-4 text-center'>{solu.vega}</td>
                            </tr>
                            <tr>
                                <th scope="row" className='p-2 bg-indigo-300 px-4 rounded-bl-2xl'>Rho</th>
                                <td className='bg-indigo-200 p-2 px-4 text-center'>{solu.rho_call}</td>
                                <td className='bg-indigo-200 p-2 px-4 text-center rounded-br-2xl'>{solu.rho_put}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default BlackSchole;
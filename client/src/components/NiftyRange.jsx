import React, { useState } from 'react'

const NiftyRange = () => {
    const [value, setValue] = useState(0);

    const [dailyu, setDailyu] = useState(0)
    const [dailyd, setDailyd] = useState(0)
    const [weeklyu, setWeeklyu] = useState(0)
    const [weeklyd, setWeeklyd] = useState(0)
    const [monthlyu, setMonthlyu] = useState(0)
    const [monthlyd, setMonthlyd] = useState(0)

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const NRcal = (e) => {
        e.preventDefault();
        const dailyFactor = Math.sqrt(252);
        const weeklyFactor = Math.sqrt(52);
        const monthlyFactor = Math.sqrt(12);

        const dailyVolat = parseFloat(value.ivv) / parseFloat(dailyFactor);
        const weeklyVolat = parseFloat(value.ivv) / parseFloat(weeklyFactor);
        const monthlyVolat = parseFloat(value.ivv) / parseFloat(monthlyFactor);

        setDailyu(parseFloat(value.nmp) * parseFloat(1 + (parseFloat(dailyVolat) / 100)).toFixed(2))
        setDailyd(parseFloat(value.nmp) * parseFloat(1 - (parseFloat(dailyVolat) / 100)).toFixed(2))
        setWeeklyu(parseFloat(value.nmp) * parseFloat(1 + (parseFloat(weeklyVolat) / 100)).toFixed(2))
        setWeeklyd(parseFloat(value.nmp) * parseFloat(1 - (parseFloat(weeklyVolat) / 100)).toFixed(2))
        setMonthlyu(parseFloat(value.nmp) * parseFloat(1 + (parseFloat(monthlyVolat) / 100)).toFixed(2))
        setMonthlyd(parseFloat(value.nmp) * parseFloat(1 - (parseFloat(monthlyVolat) / 100)).toFixed(2))
    }

    return (
        <>
            {/* Nifty Range Calculator */}
            <div className="container my-4">
                <div className="card p-4">
                    <h1 align="center" className="form-text fs-1">Nifty Range Calculator</h1>
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="card p-3">
                                <form>
                                    <div className="row g-3 align-items-center">
                                        <div className="col">
                                            <label htmlFor="ivv" className="col-form-label mt-4">India VIX Volatility: </label>
                                        </div>
                                        <div className="col">
                                            <input type="text" className="form-control mt-4" id="ivv" onChange={handleChange} name="ivv" />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-center">
                                        <div className="col">
                                            <label htmlFor="nmp" className="col-form-label mt-4">NIFTY MARKET PRICE: </label>
                                        </div>
                                        <div className="col">
                                            <input className="form-control mt-4" type="text" id="nmp" name="nmp" onChange={handleChange} />
                                        </div>
                                    </div>


                                    <button className="btn btn-primary mt-5" onClick={NRcal}>Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card p-3 w-100 d-flex justify-content-center align-items-center h-100">
                                <table className="table table-dark w-100">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">UP</th>
                                            <th scope="col">DOWN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Daily</th>
                                            <td style={{ color: 'green' }}>{dailyu}</td>
                                            <td style={{ color: 'red' }}>{dailyd}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Weekly</th>
                                            <td style={{ color: 'green' }}>{weeklyu}</td>
                                            <td style={{ color: 'red' }}>{weeklyd}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Monthly</th>
                                            <td style={{ color: 'green' }}>{monthlyu}</td>
                                            <td style={{ color: 'red' }}>{monthlyd}</td>
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

export default NiftyRange
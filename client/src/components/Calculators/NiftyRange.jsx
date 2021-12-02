import React, { useState } from 'react'

const NiftyRange = () => {
    const [value, setValue] = useState(0);
    const [solu, setSolu] = useState({du: 0, dd: 0, wu: 0, wd: 0, mu: 0, md: 0})

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

        const dur = parseFloat(value.nmp) * parseFloat(1 + (parseFloat(dailyVolat) / 100));
        const ddr = parseFloat(value.nmp) * parseFloat(1 - (parseFloat(dailyVolat) / 100));
        const wur = parseFloat(value.nmp) * parseFloat(1 + (parseFloat(weeklyVolat) / 100));
        const wdr = parseFloat(value.nmp) * parseFloat(1 - (parseFloat(weeklyVolat) / 100));
        const mur = parseFloat(value.nmp) * parseFloat(1 + (parseFloat(monthlyVolat) / 100));
        const mdr = parseFloat(value.nmp) * parseFloat(1 - (parseFloat(monthlyVolat) / 100));

        const du = Math.round((dur + Number.EPSILON) * 100) / 100
        const dd = Math.round((ddr + Number.EPSILON) * 100) / 100
        const wu = Math.round((wur + Number.EPSILON) * 100) / 100
        const wd = Math.round((wdr + Number.EPSILON) * 100) / 100
        const mu = Math.round((mur + Number.EPSILON) * 100) / 100
        const md = Math.round((mdr + Number.EPSILON) * 100) / 100

        setSolu(solu=>({...solu, du}))
        setSolu(solu=>({...solu, dd}))
        setSolu(solu=>({...solu, wu}))
        setSolu(solu=>({...solu, wd}))
        setSolu(solu=>({...solu, mu}))
        setSolu(solu=>({...solu, md}))
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
                                            <td style={{ color: 'green' }}>{solu.du}</td>
                                            <td style={{ color: 'red' }}>{solu.dd}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Weekly</th>
                                            <td style={{ color: 'green' }}>{solu.wu}</td>
                                            <td style={{ color: 'red' }}>{solu.wd}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Monthly</th>
                                            <td style={{ color: 'green' }}>{solu.mu}</td>
                                            <td style={{ color: 'red' }}>{solu.md}</td>
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
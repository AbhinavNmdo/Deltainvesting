import React, { useState } from 'react'
import '../../Style/reversal.css'
import '../../../node_modules/animate.css/animate.css';

const Reversal = () => {

    const [value_green, setValue_green] = useState({first_green: 0, second_green: 0, third_green: 0, fourth_green: 0, fifth_green: 0})
    const [value_red, setValue_red] = useState({first_red: 0, second_red: 0, third_red: 0, fourth_red: 0, fifth_red: 0})
    const [input, setInput] = useState()

    const handleOnClick1 = (e) => {
        const greenc = document.querySelector('#greenc')
        const redc = document.querySelector('#redc')
        const redb = document.querySelector('#redb')
        const greenb = document.querySelector('#greenb')

        redc.classList.toggle('d-none')
        redb.classList.toggle('redactive')
        if (!greenc.classList.contains('d-none') || greenb.classList.contains('greenactive')) {
            greenc.classList.add('d-none')
            greenb.classList.remove('greenactive')
        }
    }
    const handleOnClick2 = (e) => {
        const greenc = document.querySelector('#greenc')
        const redc = document.querySelector('#redc')
        const redb = document.querySelector('#redb')
        const greenb = document.querySelector('#greenb')

        greenc.classList.toggle('d-none')
        greenb.classList.toggle('greenactive')
        if (!redc.classList.contains('d-none') || redb.classList.contains('redactive')) {
            redc.classList.add('d-none')
            redb.classList.remove('redactive')
        }
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitGreen = (e)=>{
        e.preventDefault();
        const gcmp = parseFloat(input.gcmp)
        // eslint-disable-next-line
        const gr = parseFloat(input.gr)
        const gcltp = parseFloat(input.gcltp)
        const gcd = parseFloat(input.gcd)
        const gpltp = parseFloat(input.gpltp)
        const gpd = parseFloat(input.gpd)

        const callValue_green = gcltp * gcd;
        const putValue_green = gpltp * gpd;
        const netReversal_green = callValue_green - putValue_green;

        let first_green = gcmp - (netReversal_green);
        let second_green = first_green * 1.001
        let third_green = first_green * 1.002
        let fourth_green = first_green * 1.003
        let fifth_green = first_green * 1.004

        const first_greenr = Math.round((first_green + Number.EPSILON) * 100) / 100
        const second_greenr = Math.round((second_green + Number.EPSILON) * 100) / 100
        const third_greenr = Math.round((third_green + Number.EPSILON) * 100) / 100
        const fourth_greenr = Math.round((fourth_green + Number.EPSILON) * 100) / 100
        const fifth_greenr = Math.round((fifth_green + Number.EPSILON) * 100) / 100

        setValue_green(value_green=>({...value_green, first_green: first_greenr}))
        setValue_green(value_green=>({...value_green, second_green: second_greenr}))
        setValue_green(value_green=>({...value_green, third_green: third_greenr}))
        setValue_green(value_green=>({...value_green, fourth_green: fourth_greenr}))
        setValue_green(value_green=>({...value_green, fifth_green: fifth_greenr}))
    }

    const submitRed = (e)=>{
        e.preventDefault();
        // eslint-disable-next-line
        const rcmp = parseFloat(input.rcmp)
        // eslint-disable-next-line
        const rr = parseFloat(input.rr)
        const rcltp = parseFloat(input.rcltp)
        const rcd = parseFloat(input.rcd)
        const rpltp = parseFloat(input.rpltp)
        const rpd = parseFloat(input.rpd)

        const callValue_red = rcltp / rcd;
        const putValue_red = rpltp / rpd;
        const netReversal_red = putValue_red - callValue_red;

        // eslint-disable-next-line
        let first_red = rcmp + netReversal_red;
        let second_red = first_red * 1.001
        let third_red = first_red * 1.002
        let fourth_red = first_red * 1.003
        let fifth_red = first_red * 1.004

        const first_redr = Math.round((first_red + Number.EPSILON) * 100) / 100
        const second_redr = Math.round((second_red + Number.EPSILON) * 100) / 100
        const third_redr = Math.round((third_red + Number.EPSILON) * 100) / 100
        const fourth_redr = Math.round((fourth_red + Number.EPSILON) * 100) / 100
        const fifth_redr = Math.round((fifth_red + Number.EPSILON) * 100) / 100

        setValue_red(value_red=>({...value_red, first_red: first_redr}))
        setValue_red(value_red=>({...value_red, second_red: second_redr}))
        setValue_red(value_red=>({...value_red, third_red: third_redr}))
        setValue_red(value_red=>({...value_red, fourth_red: fourth_redr}))
        setValue_red(value_red=>({...value_red, fifth_red: fifth_redr}))
    }

    return (
        <>
            <div className="container-fluid calc" style={{ minHeight: '73vh' }}>
                <div className="row h-100">
                    <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                            {/* <h3 >Reversal Calculator</h3> */}
                        <div id="buttons">
                            <div id="greenb" className="greenbutton greenactive" onClick={handleOnClick2}>Green Calc</div>
                            <div id="redb" className="redbutton" onClick={handleOnClick1}>Red Calc</div>
                        </div>
                    </div>
                    <div className="col-md-9 d-flex justify-content-center align-items-center">
                        <div id="greenc" className="card greencard p-3">
                            <div className="row">
                                <div className="col-md-7 pe-5">
                                    <form autocomplete="off" onSubmit={submitGreen}>
                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="gcmp" className="col-form-label mt-4">Current Market Price: </label>
                                            </div>
                                            <div className="col">
                                                <input  className="form-control mt-4" type="text" id="gcmp" name="gcmp" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="gr" className="col-form-label mt-4">Support: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="text" id="gr" name="gr" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="gcltp" className="col-form-label mt-4">Call LTP: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="text" id="gcltp" name="gcltp" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="gcd" className="col-form-label mt-4">Call Delta: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="text" id="gcd" name="gcd" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="gpltp" className="col-form-label mt-4">Put LTP: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="text" id="gpltp" name="gpltp" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="gpd" className="col-form-label mt-4">Put Delta: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="text" id="gpd" name="gpd" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <button className="btn btn-primary mt-3" type="submit">Submit</button>
                                    </form>
                                </div>
                                <div className="col-md-5 d-flex justify-content-center align-items-center ranges">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <h4 className="text-center mb-5">Reversal Price Range</h4>
                                        <h6 style={{color: 'green'}}>{value_green.first_green}</h6>
                                        <h6 style={{color: 'green'}}>{value_green.second_green}</h6>
                                        <h6 style={{color: 'green'}}>{value_green.third_green}</h6>
                                        <h6 style={{color: 'green'}}>{value_green.fourth_green}</h6>
                                        <h6 style={{color: 'green'}}>{value_green.fifth_green}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="redc" className="card d-none redcard p-3">
                            <div className="row">
                                <div className="col-md-7 pe-5">
                                    <form autocomplete="off" onSubmit={submitRed}>
                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="rcmp" className="col-form-label mt-4">Current Market Price: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="text" id="rcmp" name="rcmp" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="rr" className="col-form-label mt-4">Resistance: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="text" id="rr" name="rr" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="rcltp" className="col-form-label mt-4">Call LTP: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="text" id="rcltp" name="rcltp" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="rcd" className="col-form-label mt-4">Call Delta: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="text" id="rcd" name="rcd" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="rpltp" className="col-form-label mt-4">Put LTP: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="text" id="rpltp" name="rpltp" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="rpd" className="col-form-label mt-4">Put Delta: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="text" id="rpd" name="rpd" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <button className="btn btn-primary mt-3">Submit</button>
                                    </form>
                                </div>
                                <div className="col-md-5 d-flex justify-content-center align-items-center ranges">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <h4 className="text-center mb-5">Reversal Price Range</h4>
                                        <h6 style={{color: 'red'}}>{value_red.first_red}</h6>
                                        <h6 style={{color: 'red'}}>{value_red.second_red}</h6>
                                        <h6 style={{color: 'red'}}>{value_red.third_red}</h6>
                                        <h6 style={{color: 'red'}}>{value_red.fourth_red}</h6>
                                        <h6 style={{color: 'red'}}>{value_red.fifth_red}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reversal

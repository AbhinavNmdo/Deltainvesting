import React, { useState } from 'react'
import '../../Style/reversal.css'
import '../../../node_modules/animate.css/animate.css';

const Reversal = () => {

    const [value, setValue] = useState({first: 0, second: 0, third: 0, fourth: 0, fifth: 0})
    const [valuer, setValuer] = useState({first: 0, second: 0, third: 0, fourth: 0, fifth: 0})
    const [input, setInput] = useState({gcmp: value.gcmp})

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
        const gr = parseFloat(input.gr)
        const gcltp = parseFloat(input.gcltp)
        const gcd = parseFloat(input.gcd)
        const gpltp = parseFloat(input.gpltp)
        const gpd = parseFloat(input.gpd)

        const callValue = gcltp * gcd;
        const putValue = gpltp * gpd;
        const netReversal = callValue - putValue;

        const first = gcmp - (netReversal);
        const second = first * 1.001
        const third = first * 1.002
        const fourth = first * 1.003
        const fifth = first * 1.004

        const firstr = Math.round((first + Number.EPSILON) * 100) / 100
        const secondr = Math.round((second + Number.EPSILON) * 100) / 100
        const thirdr = Math.round((third + Number.EPSILON) * 100) / 100
        const fourthr = Math.round((fourth + Number.EPSILON) * 100) / 100
        const fifthr = Math.round((fifth + Number.EPSILON) * 100) / 100

        setValue(value=>({...value, first: firstr}))
        setValue(value=>({...value, second: secondr}))
        setValue(value=>({...value, third: thirdr}))
        setValue(value=>({...value, fourth: fourthr}))
        setValue(value=>({...value, fifth: fifthr}))
    }

    const submitRed = (e)=>{
        e.preventDefault();
        const rcmp = parseFloat(input.rcmp)
        const rr = parseFloat(input.rr)
        const rcltp = parseFloat(input.rcltp)
        const rcd = parseFloat(input.rcd)
        const rpltp = parseFloat(input.rpltp)
        const rpd = parseFloat(input.rpd)

        const callValue = rcltp / rcd;
        const putValue = rpltp / rpd;
        const netReversal = putValue - callValue;

        const first = rcmp = netReversal;
        const second = first * 1.001
        const third = first * 1.002
        const fourth = first * 1.003
        const fifth = first * 1.004

        const firstr = Math.round((first + Number.EPSILON) * 100) / 100
        const secondr = Math.round((second + Number.EPSILON) * 100) / 100
        const thirdr = Math.round((third + Number.EPSILON) * 100) / 100
        const fourthr = Math.round((fourth + Number.EPSILON) * 100) / 100
        const fifthr = Math.round((fifth + Number.EPSILON) * 100) / 100

        setValuer(value=>({...value, first: firstr}))
        setValuer(value=>({...value, second: secondr}))
        setValuer(value=>({...value, third: thirdr}))
        setValuer(value=>({...value, fourth: fourthr}))
        setValuer(value=>({...value, fifth: fifthr}))
    }

    return (
        <>
            <div className="container-fluid calc" style={{ minHeight: '70vh' }}>
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
                                    <form onSubmit={submitGreen}>
                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="gcmp" className="col-form-label mt-4">Current Market Price: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="text" id="gcmp" name="gcmp" onChange={handleChange} />
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
                                        <h6>{value.first}</h6>
                                        <h6>{value.second}</h6>
                                        <h6>{value.third}</h6>
                                        <h6>{value.fourth}</h6>
                                        <h6>{value.fifth}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="redc" className="card d-none redcard p-3">
                            <div className="row">
                                <div className="col-md-7 pe-5">
                                    <form onSubmit={submitRed}>
                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="rcmp" className="col-form-label mt-4">Current Market Price: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="number" id="rcmp" name="rcmp" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="rr" className="col-form-label mt-4">Resistance: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="number" id="rr" name="rr" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="rcltp" className="col-form-label mt-4">Call LTP: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="number" id="rcltp" name="rcltp" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="rcd" className="col-form-label mt-4">Call Delta: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="number" id="rcd" name="rcd" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="rpltp" className="col-form-label mt-4">Put LTP: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="number" id="rpltp" name="rpltp" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-center">
                                            <div className="col">
                                                <label htmlFor="rpd" className="col-form-label mt-4">Put Delta: </label>
                                            </div>
                                            <div className="col">
                                                <input className="form-control mt-4" type="number" id="rpd" name="rpd" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <button className="btn btn-primary mt-3">Submit</button>
                                    </form>
                                </div>
                                <div className="col-md-5 d-flex justify-content-center align-items-center ranges">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <h4 className="text-center mb-5">Reversal Price Range</h4>
                                        <h6>{valuer.first}</h6>
                                        <h6>{valuer.second}</h6>
                                        <h6>{valuer.third}</h6>
                                        <h6>{valuer.fourth}</h6>
                                        <h6>{valuer.fifth}</h6>
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

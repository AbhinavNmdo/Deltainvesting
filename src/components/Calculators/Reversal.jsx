import React, { useState, useEffect } from 'react'
import '../../Style/reversal.css'
import '../../../node_modules/animate.css/animate.css';

const Reversal = () => {
    useEffect(() => {
        handleOnClick2();
    }, [])

    const [value_green, setValue_green] = useState({ first_green: 0, second_green: 0, third_green: 0, fourth_green: 0, fifth_green: 0 })
    const [value_red, setValue_red] = useState({ first_red: 0, second_red: 0, third_red: 0, fourth_red: 0, fifth_red: 0 })
    const [input, setInput] = useState()

    const handleOnClick1 = (e) => {
        const greenc = document.querySelector('#green_cal')
        const redc = document.querySelector('#red_cal')
        const redb = document.querySelector('#red_but')
        const greenb = document.querySelector('#green_but')

        const redActive = ['bg-red-600', 'text-white', 'ring', 'ring-red-400', 'ring-offset-2'];
        const greenRemove = ['bg-green-600', 'text-white', 'ring', 'ring-green-400', 'ring-offset-2'];

        redb.classList.remove('bg-red-400')
        redb.classList.add(...redActive);
        greenb.classList.add('bg-green-400');
        greenb.classList.remove(...greenRemove)

        redc.classList.remove('hidden');
        redc.classList.add('animate__slideInRight');
        greenc.classList.add('hidden');
        greenc.classList.remove('animate__slideInRight');
    }
    const handleOnClick2 = (e) => {
        const greenc = document.querySelector('#green_cal')
        const redc = document.querySelector('#red_cal')
        const redb = document.querySelector('#red_but')
        const greenb = document.querySelector('#green_but')

        const greenActive = ['bg-green-600', 'text-white', 'ring', 'ring-green-400', 'ring-offset-2'];
        const redRemove = ['bg-red-600', 'text-white', 'ring', 'ring-red-400', 'ring-offset-2'];

        greenb.classList.remove('bg-green-400');
        greenb.classList.add(...greenActive);
        redb.classList.add('bg-red-400')
        redb.classList.remove(...redRemove);

        greenc.classList.remove('hidden');
        greenc.classList.add('animate__slideInRight');
        redc.classList.add('hidden');
        redc.classList.remove('animate__slideInRight');
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitGreen = (e) => {
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

        setValue_green(value_green => ({ ...value_green, first_green: first_greenr }))
        setValue_green(value_green => ({ ...value_green, second_green: second_greenr }))
        setValue_green(value_green => ({ ...value_green, third_green: third_greenr }))
        setValue_green(value_green => ({ ...value_green, fourth_green: fourth_greenr }))
        setValue_green(value_green => ({ ...value_green, fifth_green: fifth_greenr }))
    }

    const submitRed = (e) => {
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

        setValue_red(value_red => ({ ...value_red, first_red: first_redr }))
        setValue_red(value_red => ({ ...value_red, second_red: second_redr }))
        setValue_red(value_red => ({ ...value_red, third_red: third_redr }))
        setValue_red(value_red => ({ ...value_red, fourth_red: fourth_redr }))
        setValue_red(value_red => ({ ...value_red, fifth_red: fifth_redr }))
    }

    return (
        <>
            <div className="container mx-auto grid grid-cols-1 mb-16 lg:grid-cols-12">
                {/* Invention Banner */}
                <div className='col-span-12 lg:col-span-2 w-full'>
                    photo
                </div>


                {/* Calculator Switching buttons */}
                <div className='flex h-20 lg:h-60 flex-row md:flex-row lg:flex-col justify-center md:justify-center lg:justify-between items-center col-span-12 lg:col-span-1 w-full'>
                    <button id="green_but" className="select-none cursor-pointer w-28 h-14 lg:h-28 lg:w-14 bg-green-400 flex justify-center items-center rounded-full mx-10 md:mx-10 lg:mx-0" onClick={handleOnClick2}>Green</button>
                    <button id="red_but" className="select-none cursor-pointer w-28 h-14 lg:h-28 lg:w-14 bg-red-400 flex justify-center items-center rounded-full mx-10 md:mx-10 lg:mx-0" onClick={handleOnClick1}>Red</button>
                </div>


                {/* Green Calculator */}
                <div id="green_cal" className='col-span-9 animate__animated'>
                    <div className="col-span-12 lg:col-span-9 grid grid-cols-1 lg:grid-cols-5 gap-6 w-full">
                        <div className='col-span-3 border-2 rounded-4xl border-indigo-200'>
                            <form autocomplete="off" onSubmit={submitGreen} className='grid grid-cols-1 lg:grid-cols-4 justify-center items-center p-3'>
                                <div className='flex justify-end items-center flex-col col-span-3'>
                                    <div className="items-center mt-3">
                                        <label htmlFor="gcmp" className="text-slate-700">
                                            Current Market Price:{" "}
                                        </label>
                                        <div className="col">
                                            <input
                                                className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1"
                                                type="text"
                                                id="gcmp"
                                                name="gcmp"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="items-center mt-3">
                                        <label htmlFor="gr" className="text-slate-700">
                                            Support:{" "}
                                        </label>
                                        <div className="col">
                                            <input
                                                className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1"
                                                type="text"
                                                id="gr"
                                                name="gr"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="items-center mt-3">
                                        <label htmlFor="gcltp" className="text-slate-700">
                                            Call LTP:{" "}
                                        </label>
                                        <div className="col">
                                            <input
                                                className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1"
                                                type="text"
                                                id="gcltp"
                                                name="gcltp"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="items-center mt-3">
                                        <label htmlFor="gcd" className="text-slate-700">
                                            Call Delta:{" "}
                                        </label>
                                        <div className="col">
                                            <input
                                                className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1"
                                                type="text"
                                                id="gcd"
                                                name="gcd"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="items-center mt-3">
                                        <label htmlFor="gpltp" className="text-slate-700">
                                            Put LTP:{" "}
                                        </label>
                                        <div className="col">
                                            <input
                                                className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1"
                                                type="text"
                                                id="gpltp"
                                                name="gpltp"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="items-center mt-3">
                                        <label htmlFor="gpd" className="text-slate-700">
                                            Put Delta:{" "}
                                        </label>
                                        <div className="col">
                                            <input
                                                className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1"
                                                type="text"
                                                id="gpd"
                                                name="gpd"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-1 my-8 lg:my-0 flex justify-center items-center'>
                                    <button className="p-1 bg-green-400 mx-4 rounded-4xl text-xl px-10 ring-offset-2 transition-all duration-75 active:bg-green-500 active:ring active:ring-green-400 active:text-white" type="submit">
                                        Show Result
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-span-2 w-full flex justify-center items-center border-2 border-indigo-200 rounded-4xl">
                            <table className='border-separate'>
                                <tbody>
                                    <tr>
                                        <td className='bg-indigo-200 p-2 px-8 text-center text-green-900 rounded-tr-2xl rounded-tl-2xl'>{value_green.first_green}</td>
                                    </tr>
                                    <tr>
                                        <td className='bg-indigo-200 p-2 px-8 text-center text-green-900'>{value_green.second_green}</td>
                                    </tr>
                                    <tr>
                                        <td className='bg-indigo-200 p-2 px-8 text-center text-green-900'>{value_green.third_green}</td>
                                    </tr>
                                    <tr>
                                        <td className='bg-indigo-200 p-2 px-8 text-center text-green-900'>{value_green.fourth_green}</td>
                                    </tr>
                                    <tr>
                                        <td className='bg-indigo-200 p-2 px-8 text-center text-green-900 rounded-br-2xl rounded-bl-2xl'>{value_green.fifth_green}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* <div className="flex justify-center items-center sm:w-full flex-col">
                                <h4 className="text-center mb-5 text-3xl">Reversal Price Range</h4>
                                <h6 className='text-green-700 text-2xl my-2'>{value_green.first_green}</h6>
                                <h6 className='text-green-700 text-2xl my-2'>{value_green.second_green}</h6>
                                <h6 className='text-green-700 text-2xl my-2'>{value_green.third_green}</h6>
                                <h6 className='text-green-700 text-2xl my-2'>{value_green.fourth_green}</h6>
                                <h6 className='text-green-700 text-2xl my-2'>{value_green.fifth_green}</h6>
                            </div> */}
                        </div>
                    </div>
                </div>


                {/* Red Calculator */}
                <div id="red_cal" className='hidden col-span-9 animate__animated'>
                    <div className="col-span-12 lg:col-span-9 grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className='col-span-3 border-2 rounded-4xl border-indigo-200'>
                            <form autocomplete="off" onSubmit={submitRed} className='grid grid-cols-1 lg:grid-cols-4 justify-center items-center p-3'>
                                <div className='flex justify-end items-center flex-col col-span-3'>
                                    <div className="items-center mt-3">
                                        <label htmlFor="gcmp" className="text-slate-700">
                                            Current Market Price:{" "}
                                        </label>
                                        <div className="col">
                                            <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" type="text" id="rcmp" name="rcmp" onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="items-center mt-3">
                                        <label htmlFor="gr" className="text-slate-700">
                                            Resistance:{" "}
                                        </label>
                                        <div className="col">
                                            <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" type="text" id="rr" name="rr" onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="items-center mt-3">
                                        <label htmlFor="gcltp" className="text-slate-700">
                                            Call LTP:{" "}
                                        </label>
                                        <div className="col">
                                            <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" type="text" id="rcltp" name="rcltp" onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="items-center mt-3">
                                        <label htmlFor="gcd" className="text-slate-700">
                                            Call Delta:{" "}
                                        </label>
                                        <div className="col">
                                            <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" type="text" id="rcd" name="rcd" onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="items-center mt-3">
                                        <label htmlFor="gpltp" className="text-slate-700">
                                            Put LTP:{" "}
                                        </label>
                                        <div className="col">
                                            <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" type="text" id="rpltp" name="rpltp" onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="items-center mt-3">
                                        <label htmlFor="gpd" className="text-slate-700">
                                            Put Delta:{" "}
                                        </label>
                                        <div className="col">
                                            <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" type="text" id="rpd" name="rpd" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-1 my-8 lg:my-0 flex justify-center items-center'>
                                    <button className="p-1 bg-red-400 mx-4 rounded-4xl text-xl px-10 ring-offset-2 transition-all duration-75 active:bg-red-500 active:ring active:ring-red-400 active:text-white" type="submit">
                                        Show Result
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-span-2 w-full flex justify-center items-center border-2 border-indigo-200 rounded-4xl">
                            <table className='border-separate'>
                                <tbody>
                                    <tr>
                                        <td className='bg-indigo-200 text-red-900 p-2 px-8 text-center rounded-tr-2xl rounded-tl-2xl'>{value_red.first_red}</td>
                                    </tr>
                                    <tr>
                                        <td className='bg-indigo-200 text-red-900 p-2 px-8 text-center'>{value_red.second_red}</td>
                                    </tr>
                                    <tr>
                                        <td className='bg-indigo-200 text-red-900 p-2 px-8 text-center'>{value_red.third_red}</td>
                                    </tr>
                                    <tr>
                                        <td className='bg-indigo-200 text-red-900 p-2 px-8 text-center'>{value_red.fourth_red}</td>
                                    </tr>
                                    <tr>
                                        <td className='bg-indigo-200 text-red-900 p-2 px-8 text-center rounded-br-2xl rounded-bl-2xl'>{value_red.fifth_red}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* <div className="flex justify-center items-center flex-col">
                                <h4 className="text-center mb-5 text-3xl">Reversal Price Range</h4>
                                <h6 className='text-red-600 text-2xl my-2'>{value_red.first_red}</h6>
                                <h6 className='text-red-600 text-2xl my-2'>{value_red.second_red}</h6>
                                <h6 className='text-red-600 text-2xl my-2'>{value_red.third_red}</h6>
                                <h6 className='text-red-600 text-2xl my-2'>{value_red.fourth_red}</h6>
                                <h6 className='text-red-600 text-2xl my-2'>{value_red.fifth_red}</h6>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reversal

import React, { useState } from 'react'

const NiftyRange = () => {
    const [value, setValue] = useState(0);
    const [solu, setSolu] = useState({ du: 0, dd: 0, wu: 0, wd: 0, mu: 0, md: 0 })

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

        setSolu(solu => ({ ...solu, du }))
        setSolu(solu => ({ ...solu, dd }))
        setSolu(solu => ({ ...solu, wu }))
        setSolu(solu => ({ ...solu, wd }))
        setSolu(solu => ({ ...solu, mu }))
        setSolu(solu => ({ ...solu, md }))
    }

    return (
        <>
            {/* Nifty Range Calculator */}
            <div className="container mx-auto lg:px-20 mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex justify-center items-center col-span-1 border-2 border-indigo-200 rounded-4xl">
                    <form className='grid grid-cols-1 lg:grid-cols-4 p-4' autocomplete="off">
                        <div className="col-span-3 flex flex-col justify-center items-center">
                            <div className="items-center mt-3 col-span-3">
                                <label htmlFor="gcmp" className="text-slate-700">
                                    Current Stock Price:
                                </label>
                                <div className="col">
                                    <input type="text" className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" id="ivv" onChange={handleChange} name="ivv" />
                                </div>
                            </div>

                            <div className="items-center mt-3">
                                <label htmlFor="gr" className="text-slate-700">
                                    Volatility:
                                </label>
                                <div className="col">
                                    <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" type="text" id="nmp" name="nmp" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 my-8 lg:my-0 flex justify-center items-center'>
                            <button onClick={NRcal} className="p-1 bg-blue-400 mx-4 rounded-4xl text-xl px-10 ring-offset-2 transition-all duration-75 active:bg-blue-500 active:ring active:ring-blue-400 active:text-white" type="submit">
                                Show Result
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col col-span-1 border-2 border-indigo-200 rounded-4xl">
                    <table className="border-separate my-6 lg:my-5">
                        <thead>
                            <tr>
                                <th scope="col" className='bg-indigo-300 rounded-xl p-3 px-7 rounded-tl-2xl rounded-bl-2xl'>#</th>
                                <th scope="col" className='bg-indigo-300 rounded-xl p-3 px-7'>UP</th>
                                <th scope="col" className='bg-indigo-300 rounded-xl p-3 px-7 rounded-tr-2xl rounded-br-2xl mb'>DOWN</th>
                            </tr>
                        </thead>
                        <tbody> 
                            <tr>
                                <th scope="row" className='p-2 bg-indigo-300 px-4 rounded-tl-2xl'>Daily</th>
                                <td className='bg-indigo-200 p-2 px-4 text-center text-green-500'>{solu.du}</td>
                                <td className='bg-indigo-200 p-2 px-4 text-center rounded-tr-2xl text-red-500'>{solu.dd}</td>
                            </tr>
                            <tr>
                                <th scope="row" className='p-2 bg-indigo-300 px-4'>Weekly</th>
                                <td className='bg-indigo-200 p-2 px-4 text-center text-green-500'>{solu.wu}</td>
                                <td className='bg-indigo-200 p-2 px-4 text-center text-red-500'>{solu.wd}</td>
                            </tr>
                            <tr>
                                <th scope="row" className='p-2 bg-indigo-300 px-4 rounded-bl-2xl'>Monthly</th>
                                <td className='bg-indigo-200 p-2 px-4 text-center text-green-500'>{solu.mu}</td>
                                <td className='bg-indigo-200 p-2 px-4 text-center rounded-br-2xl text-red-500'>{solu.md}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default NiftyRange
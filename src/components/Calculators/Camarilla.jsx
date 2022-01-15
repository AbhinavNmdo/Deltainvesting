import React, { useState } from 'react'

const Camarilla = () => {
    const [input, setInput] = useState({ high: 0, low: 0, close: 0 })
    const [value, setValue] = useState({ r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, r6: 0, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0 });

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    const calc = (e) => {
        e.preventDefault();


        const r1r = ((parseFloat((parseFloat(input.high) - parseFloat(input.low)) * 1.1)) / 12) + parseFloat(input.close)
        const r2r = ((parseFloat((parseFloat(input.high) - parseFloat(input.low)) * 1.1)) / 6) + parseFloat(input.close)
        const r3r = ((parseFloat((parseFloat(input.high) - parseFloat(input.low)) * 1.1)) / 4) + parseFloat(input.close)
        const r4r = ((parseFloat((parseFloat(input.high) - parseFloat(input.low)) * 1.1)) / 2) + parseFloat(input.close)
        const r5r = parseFloat(r4r) + parseFloat(1.168 * parseFloat(parseFloat(r4r) - parseFloat(r3r)))
        const r6r = parseFloat(parseFloat(input.high) / parseFloat(input.low)) * parseFloat(input.close);

        const r1 = Math.round((r1r + Number.EPSILON) * 100) / 100
        const r2 = Math.round((r2r + Number.EPSILON) * 100) / 100
        const r3 = Math.round((r3r + Number.EPSILON) * 100) / 100
        const r4 = Math.round((r4r + Number.EPSILON) * 100) / 100
        const r5 = Math.round((r5r + Number.EPSILON) * 100) / 100
        const r6 = Math.round((r6r + Number.EPSILON) * 100) / 100

        setValue(value => ({ ...value, r1 }))
        setValue(value => ({ ...value, r2 }))
        setValue(value => ({ ...value, r3 }))
        setValue(value => ({ ...value, r4 }))
        setValue(value => ({ ...value, r5 }))
        setValue(value => ({ ...value, r6 }))


        const s1r = parseFloat(input.close) - ((parseFloat((parseFloat(input.high) - parseFloat(input.low)) * 1.1)) / 12)
        const s2r = parseFloat(input.close) - ((parseFloat((parseFloat(input.high) - parseFloat(input.low)) * 1.1)) / 6)
        const s3r = parseFloat(input.close) - ((parseFloat((parseFloat(input.high) - parseFloat(input.low)) * 1.1)) / 4)
        const s4r = parseFloat(input.close) - ((parseFloat((parseFloat(input.high) - parseFloat(input.low)) * 1.1)) / 2)
        const s5r = parseFloat(s4r) - parseFloat(1.168 * parseFloat(parseFloat(s3r) - parseFloat(s4r)))
        const s6r = parseFloat(input.close) - parseFloat(parseFloat(r6r) - parseFloat(input.close))

        const s1 = Math.round((s1r + Number.EPSILON) * 100) / 100
        const s2 = Math.round((s2r + Number.EPSILON) * 100) / 100
        const s3 = Math.round((s3r + Number.EPSILON) * 100) / 100
        const s4 = Math.round((s4r + Number.EPSILON) * 100) / 100
        const s5 = Math.round((s5r + Number.EPSILON) * 100) / 100
        const s6 = Math.round((s6r + Number.EPSILON) * 100) / 100

        setValue(value => ({ ...value, s1 }))
        setValue(value => ({ ...value, s2 }))
        setValue(value => ({ ...value, s3 }))
        setValue(value => ({ ...value, s4 }))
        setValue(value => ({ ...value, s5 }))
        setValue(value => ({ ...value, s6 }))
    }

    return (
        <>
            <div className="container mx-auto lg:px-20 mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex justify-center items-center col-span-1 border-2 border-indigo-200 rounded-4xl">
                    <form className='grid grid-cols-1 lg:grid-cols-4 p-4' onSubmit={calc} autocomplete="off">
                        <div className="col-span-3 flex flex-col justify-center items-center">
                            <div className="items-center mt-3 col-span-3">
                                <label htmlFor="P" className="text-slate-700">
                                    Current Stock Price:
                                </label>
                                <div className="col">
                                    <input type="text" name="high" className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" onChange={handleChange} id="high" />
                                </div>
                            </div>

                            <div className="items-center mt-3">
                                <label htmlFor="EX" className="text-slate-700">
                                    Strike Price:
                                </label>
                                <div className="col">
                                    <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" type="text" name="low" id="low" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="items-center mt-3">
                                <label htmlFor="t" className="text-slate-700">
                                    Days Remaining:
                                </label>
                                <div className="col">
                                    <input className="focus:outline-none focus:ring rounded-full bg-slate-200 py-1" onChange={handleChange} type="text" name="close" id="close" />
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 my-8 lg:my-0 flex justify-center items-center'>
                            <button className="p-1 bg-blue-400 mx-4 rounded-4xl text-xl px-10 ring-offset-2 transition-all duration-75 active:bg-blue-500 active:ring active:ring-blue-400 active:text-white" type="submit">
                                Show Result
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col col-span-1 border-2 border-indigo-200 rounded-4xl">
                    <table className="border-separate my-6 lg:my-5">
                        <tbody>
                            <tr>
                                <th className='bg-indigo-300 p-2 px-8 rounded-tl-2xl' scope="row">R6</th>
                                <td className='bg-indigo-200 p-2 px-8 text-center' style={{ color: 'green' }}>{value.r6}</td>
                                <th className='bg-indigo-400 p-2 px-8 rounded-tr-2xl'>Target 2</th>
                            </tr>
                            <tr>
                                <th className='bg-indigo-300 p-2 px-8' scope="row">R5</th>
                                <td className='bg-indigo-200 p-2 px-8 text-center' style={{ color: 'green' }}>{value.r5}</td>
                                <th className='bg-indigo-400 p-2 px-8'>Target 1</th>
                            </tr>
                            <tr>
                                <th className='bg-indigo-300 p-2 px-8' scope="row">R4</th>
                                <td className='bg-indigo-200 p-2 px-8 text-center' style={{ color: 'blue' }}>{value.r4}</td>
                                <th className='bg-indigo-400 p-2 px-8'>Long Breakout</th>
                            </tr>
                            <tr>
                                <th className='bg-indigo-300 p-2 px-8' scope="row">R3</th>
                                <td className='bg-indigo-200 p-2 px-8 text-center' style={{ color: 'blue' }}>{value.r3}</td>
                                <th className='bg-indigo-400 p-2 px-8'>Go Short</th>
                            </tr>
                            <tr>
                                <th className='bg-indigo-300 p-2 px-8' scope="row">R2</th>
                                <td className='bg-indigo-200 p-2 px-8 text-center'>{value.r2}</td>
                                <th className='bg-indigo-400 p-2 px-8'></th>
                            </tr>
                            <tr>
                                <th className='bg-indigo-300 p-2 px-8' scope="row">R1</th>
                                <td className='bg-indigo-200 p-2 px-8 text-center'>{value.r1}</td>
                                <th className='bg-indigo-400 p-2 px-8'></th>
                            </tr>
                            <tr>
                                <th className='bg-indigo-300 p-0 px-8' scope="row"></th>
                                <td className='bg-indigo-200 p-0 px-8 text-center'>&nbsp;</td>
                                <th className='bg-indigo-400 p-0 px-8'>&nbsp;</th>
                            </tr>
                            <tr>
                                <th className='bg-indigo-300 p-2 px-8' scope="row">S1</th>
                                <td className='bg-indigo-200 p-2 px-8 text-center'>{value.s1}</td>
                                <th className='bg-indigo-400 p-2 px-8'></th>
                            </tr>
                            <tr>
                                <th className='bg-indigo-300 p-2 px-8' scope="row">S2</th>
                                <td className='bg-indigo-200 p-2 px-8 text-center'>{value.s2}</td>
                                <th className='bg-indigo-400 p-2 px-8'></th>
                            </tr>
                            <tr>
                                <th className='bg-indigo-300 p-2 px-8' scope="row">S3</th>
                                <td className='bg-indigo-200 p-2 px-8 text-center' style={{ color: 'orange' }}>{value.s3}</td>
                                <th className='bg-indigo-400 p-2 px-8'>Go Long</th>
                            </tr>
                            <tr>
                                <th className='bg-indigo-300 p-2 px-8' scope="row">S4</th>
                                <td className='bg-indigo-200 p-2 px-8 text-center' style={{ color: 'orange' }}>{value.s4}</td>
                                <th className='bg-indigo-400 p-2 px-8'>Short Breakout</th>
                            </tr>
                            <tr>
                                <th className='bg-indigo-300 p-2 px-8' scope="row">S5</th>
                                <td className='bg-indigo-200 p-2 px-8 text-center' style={{ color: 'red' }}>{value.s5}</td>
                                <th className='bg-indigo-400 p-2 px-8'>Target 1</th>
                            </tr>
                            <tr>
                                <th className='bg-indigo-300 p-2 px-8 rounded-bl-2xl' scope="row">S6</th>
                                <td className='bg-indigo-200 p-2 px-8 text-center' style={{ color: 'red' }}>{value.s6}</td>
                                <th className='bg-indigo-400 p-2 px-8 rounded-br-2xl'>Target 2</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Camarilla

import React, { useState } from 'react'

const Camarilla = () => {
    const [input, setInput] = useState({high: 0, low: 0, close: 0})
    const [value, setValue] = useState({r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, r6: 0, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 , s6: 0});

    const handleChange = (e)=>{
        setInput({...input, [e.target.name]: e.target.value})
    };

    const calc = (e)=>{
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

        setValue(value=>({...value, r1}))
        setValue(value=>({...value, r2}))
        setValue(value=>({...value, r3}))
        setValue(value=>({...value, r4}))
        setValue(value=>({...value, r5}))
        setValue(value=>({...value, r6}))


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

        setValue(value=>({...value, s1}))
        setValue(value=>({...value, s2}))
        setValue(value=>({...value, s3}))
        setValue(value=>({...value, s4}))
        setValue(value=>({...value, s5}))
        setValue(value=>({...value, s6}))
    }

    return (
        <div className="container my-4">
            <div className="card p-4">
                <h1 className="form-text fs-1 text-center mb-4">Camarilla Calculator</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card p-3">
                            <form onSubmit={calc}>
                                <div className="row g-3 align-items-center">
                                    <div className="col">
                                        <label htmlFor="ivv" className="col-form-label mt-4">High: </label>
                                    </div>
                                    <div className="col">
                                        <input type="text" name="high" className="form-control mt-4" onChange={handleChange} id="high" />
                                    </div>
                                </div>

                                <div className="row g-3 align-items-center">
                                    <div className="col">
                                        <label htmlFor="low" className="col-form-label mt-4">Low: </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-control mt-4" type="text" name="low" id="low" onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="row g-3 align-items-center">
                                    <div className="col">
                                        <label htmlFor="close" className="col-form-label mt-4">Close: </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-control mt-4" onChange={handleChange} type="text" name="close" id="close"/>
                                    </div>
                                </div>
                                <button onClick={calc} className="btn btn-primary mt-5">Submit</button>
                            </form>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card p-3">
                            <h1 className="form-text fs-4 text-center">SR6 Levels</h1>
                            <table className="table table-dark w-100">
                                <tbody>
                                    <tr>
                                        <th scope="row">R6</th>
                                        <td style={{color: 'green'}}>{value.r6}</td>
                                        <td>Target 2</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">R5</th>
                                        <td style={{color: 'green'}}>{value.r5}</td>
                                        <td>Target 1</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">R4</th>
                                        <td style={{color: 'blue'}}>{value.r4}</td>
                                        <td>Long Breakdown</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">R3</th>
                                        <td style={{color: 'blue'}}>{value.r3}</td>
                                        <td>Go Short</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">R2</th>
                                        <td>{value.r2}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">R1</th>
                                        <td>{value.r1}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row"></th>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">S1</th>
                                        <td>{value.s1}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">S2</th>
                                        <td>{value.s2}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">S3</th>
                                        <td style={{color: 'orange'}}>{value.s3}</td>
                                        <td>Go Short</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">S4</th>
                                        <td style={{color: 'orange'}}>{value.s4}</td>
                                        <td>Short Breakout</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">S5</th>
                                        <td style={{color: 'red'}}>{value.s5}</td>
                                        <td>Target 1</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">S6</th>
                                        <td style={{color: 'red'}}>{value.s6}</td>
                                        <td>Target 2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Camarilla

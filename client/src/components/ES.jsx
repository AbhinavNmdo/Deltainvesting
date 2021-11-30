import React from 'react'

const ES = () => {
    return (
        <div className="container my-4">
            <div className="card p-4">
                <h1 className="form-text fs-1 text-center mb-4">ES6 Calculator</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card p-3">
                            <form>
                                <div className="row g-3 align-items-center">
                                    <div className="col">
                                        <label htmlFor="ivv" className="col-form-label mt-4">High: </label>
                                    </div>
                                    <div className="col">
                                        <input type="text" className="form-control mt-4" id="ivv" name="ivv" />
                                    </div>
                                </div>

                                <div className="row g-3 align-items-center">
                                    <div className="col">
                                        <label htmlFor="nmp" className="col-form-label mt-4">Low: </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-control mt-4" type="text" id="nmp" name="nmp" />
                                    </div>
                                </div>

                                <div className="row g-3 align-items-center">
                                    <div className="col">
                                        <label htmlFor="nmp" className="col-form-label mt-4">Close: </label>
                                    </div>
                                    <div className="col">
                                        <input className="form-control mt-4" type="text" id="nmp" name="nmp" />
                                    </div>
                                </div>
                                <button className="btn btn-primary mt-5" >Submit</button>
                            </form>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card p-3">
                            <table className="table table-dark w-100">
                                <tbody>
                                    <tr>
                                        <th scope="row">R6</th>
                                        <td>234</td>
                                        <td>Target 2</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">R5</th>
                                        <td>234</td>
                                        <td>Target 1</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">R4</th>
                                        <td>0</td>
                                        <td>Long Breakdown</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">R3</th>
                                        <td>0</td>
                                        <td>Go Short</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">R2</th>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">R1</th>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"></th>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">S1</th>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">S2</th>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">S3</th>
                                        <td>0</td>
                                        <td>Go Short</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">S4</th>
                                        <td>0</td>
                                        <td>Short Breakout</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">S5</th>
                                        <td>0</td>
                                        <td>Target 1</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">S6</th>
                                        <td>0</td>
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

export default ES

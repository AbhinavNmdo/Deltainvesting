import React from 'react'
import '../../Style/reversal.css'

const Reversal = () => {
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
    return (
        <>
            <div className="container-fluid" style={{ height: '75vh' }}>
                <div className="row h-100">
                    <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
                        <div id="greenb" className="greenbutton" onClick={handleOnClick2}>Green Calc</div>
                        <div id="redb" className="redbutton" onClick={handleOnClick1}>Red Calc</div>
                    </div>
                    <div className="col-md-8 d-flex justify-content-center align-items-center" style={{ transition: 'all' }}>
                        <div id="redc" className="card d-none" style={{ height: '400px', width: '400px', background: 'red' }}></div>
                        <div id="greenc" className="card d-none" style={{ height: '400px', width: '400px', background: 'rgb(0, 255, 0)' }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reversal

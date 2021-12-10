import React, { useState } from 'react'

const Up = () => {
    const [image, setImage] = useState(null)
    const change = (e)=>{
        setImage(e.target.file)
        console.log(e.target.file)
    }
    const post = async (e)=>{
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/upload", {
            method: 'POST',
            body: {image}
        })
    }
    return (
        <>
            <div>
                <form onSubmit={post} encType="multipart/form-data">
                    <input type="file" onChange={change}/>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Up

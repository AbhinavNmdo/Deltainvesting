import React, { useState } from 'react'

const Up = () => {
    const [image, setImage] = useState({file: null})
    const change = event =>{
        console.log(event.target.files[0])
        setImage({file: event.target.files[0]})
    }
    const post = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "file",
            image.file
        )
        formData.append(
            "name",
            "hello"
        )
        formData.append(
            "description",
            "hellod"
        )
        formData.append(
            "classLink",
            "hellodc"
        )
        // axios.post("http://localhost:5000/api/courses", formData)
        const res = await fetch("http://localhost:5000/api/courses", {
            method: "POST",
            body: formData
        })
        const json = await res.json()
        if(json.success){
            document.querySelector('#file').value = null
        }
    }
    return (
        <>
            <div>
                <form onSubmit={post} encType="multipart/form-data">
                    <input type="file" id="file" onChange={change}/>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Up

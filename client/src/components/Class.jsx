import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const Class = () => {
    const { id } = useParams();
    const initial = [];
    const [body, setBody] = useState(initial)

    const host = "http://localhost:5000"
    // const host = "https://deltainvesting.herokuapp.com"
    
    const fetchClass = async ()=>{
        const responce = await fetch(`${host}/api/class/singleclass/${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        });
        const json = await responce.json();
        setBody(json);
    }

    useEffect(() => {
        fetchClass();
        // eslint-disable-next-line
    }, [])

    return (
        <>
        <h1 align="center" className="my-5">{body.name}</h1>
        <div className="container my-4">
            <iframe
                width="100%"
                height="520"
                src={body.classLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen="allowfullscreen"
                style={{ borderRadius: "10px" }}
              ></iframe>
        </div>
        <div className="container">
            <h2 align="center" className="my-4">About Class</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, voluptatibus odit aperiam temporibus dolor fugiat id explicabo molestias distinctio cupiditate deleniti optio quam provident excepturi voluptas beatae modi, earum facilis veniam ea error! Inventore exercitationem atque dolore, fugit adipisci culpa. Cum error maiores iste distinctio tempora fugiat? Facere minus consequatur distinctio nihil adipisci laudantium repellat. Quidem expedita molestiae voluptatibus totam. Odio sit, incidunt officia doloremque repellendus consectetur quas magni sunt unde beatae laborum quo, numquam dolore quaerat est perspiciatis deserunt, totam nihil eaque esse in saepe itaque obcaecati. Maiores distinctio quos omnis! Voluptatibus excepturi saepe autem recusandae mollitia ipsam quasi.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolore repellat perferendis. Tenetur facere maiores aliquid culpa obcaecati, dignissimos totam, unde esse cum sequi qui a beatae. Architecto, eligendi voluptate enim illo veritatis exercitationem accusamus tempore quo, nulla qui fugiat! Repudiandae beatae adipisci itaque! Culpa numquam nesciunt atque voluptate iure quam, maiores porro sunt esse modi quidem dolores ad necessitatibus error dignissimos? Esse consequuntur, corrupti magni recusandae dolor aut dolorem ut odit autem. Magni doloribus soluta, totam est incidunt iste dolore voluptates deserunt et laborum blanditiis provident animi placeat. Facere quae debitis architecto iusto quisquam vel, est laborum illum odio.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, beatae quo, maxime veniam, temporibus provident recusandae ut voluptate amet fugiat odit. Autem, beatae asperiores? Obcaecati sed dolores ipsam pariatur impedit cum perspiciatis ullam nulla, voluptatibus minima, optio nam quod et. Ab facilis suscipit tempora eligendi rem, aut sunt id sapiente dignissimos, doloremque atque placeat explicabo provident accusantium est cumque. Optio iusto exercitationem ipsam totam impedit recusandae consectetur rem nesciunt at voluptatibus distinctio asperiores possimus velit, accusantium mollitia ad delectus praesentium quisquam cumque a? Ipsam, tenetur laudantium. Veritatis quam mollitia porro nulla ullam, molestiae debitis cumque vitae atque similique laudantium sequi?</p>
        </div>
        </>
    )
}

export default Class;

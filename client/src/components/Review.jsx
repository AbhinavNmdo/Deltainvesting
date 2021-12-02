import React, { useEffect, useState } from 'react';
// import StarRatingComponent from 'react-star-rating-component';

const Review = (props) => {

    const [review, setReview] = useState([]);
    const [write, setWrite] = useState({review: ""})

    // const host = "http://localhost:5000"
    const host = "https://deltainvesting.herokuapp.com"
    const getReview = async () => {
        const responce = await fetch(`${host}/api/review`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        });
        const json = await responce.json();
        setReview(json.review);
        console.log(json);
    };

    const handleOnChange = (e)=>{
        setWrite({...write, [e.target.name]: [e.target.value]})
    }


    const addReview = async (rev)=>{
        const responce = await fetch(`${host}/api/review`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({review: rev}),
        });
        const json = await responce.json();
        const reviews = {
            review: rev,
            firstname: json.firstname,
            lastname: json.lastname
        }
        setReview(review.concat(reviews));
        setTimeout(() => {
            props.toast.success("Review Added")
        }, 300);
    }

    const handleOnClick = async (e)=>{
        e.preventDefault();
        let reviewvalue = document.getElementById('review');
        reviewvalue.value = "";
        addReview(write.review.toString());
    }

    useEffect(() => {
        getReview();
    })

    return (
        <>
            <div className="my-4">
                <h1 align="center">Students Review</h1>
            </div>
            <div className="container" style={{minHeight: '100vh'}}>
                {review.map((reviews) => {
                    return (
                        <div className="row">
                            <div className="card my-3 p-3" style={{ borderRadius: '14px' }}>
                                <h4>{reviews.firstname} {reviews.lastname}</h4>
                                <div className="p-3" style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
                                    <p>{reviews.review}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <br />
            <hr />

            {localStorage.getItem('auth-token') ?

                <div className="container p-5 my-4">
                    <div className="card p-4" style={{ borderRadius: '14px', border: '1px solid grey' }}>
                        <h3 className="form-text mb-4" style={{ fontSize: '1.5rem' }}>Add your Review</h3>
                        <textarea onChange={handleOnChange} className="form-control" style={{ borderRadius: '10px' }} name="review" id="review" cols="10" rows="5" placeholder="Write your Review"></textarea>
                        <button onClick={handleOnClick} type="submit" class="mt-3 btn btn-primary">Submit</button>
                    </div>
                </div>
                :
                <div className="container my-5">
                    <div className="d-flex flex-column justify-content-center align-items-center card" style={{ height: '100px', borderRadius: '10px' }}>
                        <h1 align="center" className="form-text" style={{ fontSize: '2rem' }}>Login to Write review</h1>
                    </div>
                </div>}
        </>
    )
}

export default Review;

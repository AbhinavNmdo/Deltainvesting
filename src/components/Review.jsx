import React, { useEffect, useState } from 'react';
import male from '../Images/male.png';
// import female from '../Images/female.png';

const Review = (props) => {
    const [review, setReview] = useState([]);
    const [write, setWrite] = useState({ review: "" })

    const getReview = async () => {
        props.setProgress(30)
        const responce = await fetch(`${process.env.REACT_APP_HOSTURI}/api/review`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        });
        props.setProgress(70)
        const json = await responce.json();
        setReview(json.review);
        props.setProgress(100)
    };

    useEffect(() => {
        getReview();
        // eslint-disable-next-line
    }, [])

    const handleOnChange = (e) => {
        setWrite({ ...write, [e.target.name]: [e.target.value] })
        console.log(write)
    }


    const addReview = async (rev) => {
        const responce = await fetch(`${process.env.REACT_APP_HOSTURI}/api/review`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ review: rev }),
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

    const handleOnClick = async (e) => {
        e.preventDefault();
        let reviewvalue = document.getElementById('review');
        reviewvalue.value = "";
        addReview(write.review.toString());
    }

    if (localStorage.getItem('auth-token')) {
        return (
            <>
                {/* Review Heading */}
                <div className="container mx-auto mt-6">
                    <div className='w-fit mx-auto flex flex-col justify-center items-center'>
                        <h1 className="text-center text-2xl lg:text-3xl">Reviews</h1>
                        <div style={{ width: '90%', height: '4px', borderRadius: '100px' }} className="bg-blue-500"></div>
                    </div>
                </div>



                {/* Review Cards */}
                <div className="container mx-auto mt-10">
                    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-7'>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 col-span-2">
                            {review.map((eleReview) => {
                                return (
                                    <div className="bg-white border-2 min-h-18 border-slate-200 flex flex-col rounded-3xl mx-2">
                                        <div className="flex justify-center items-center my-4">
                                            {/* <img src={eleReview.gender === 'male' ? male : female} alt="" /> */}
                                            <img src={male} alt="male" className="object-cover rounded-full h-24 border-2 border-slate-200" />
                                        </div>
                                        <div className="flex justify-center items-center flex-col">
                                            <h1 className="text-center text-xl">{eleReview.firstname} {eleReview.lastname}</h1>
                                            <p className="text-center my-5 mb-8 px-9">"{eleReview.review} Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, deleniti."</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex mx-auto p-9 flex-col justify-center items-center h-fit bg-white rounded-3xl shadow-2xl border-2 border-slate-200" style={{ position: 'sticky', top: '15%' }}>
                            <h1 className='text-center text-2xl my-4 mt-2'>Add Your Valuable Review</h1>
                            <form className='flex flex-col'>
                                <textarea name="review" id="review" cols="30" rows="2" className="p-4 rounded-3xl bg-slate-200 mt-6" onChange={handleOnChange} placeholder='Enter Your Review' ></textarea>
                                <button className='py-2 px-10 bg-blue-500 hover:bg-blue-600 transition-all duration-200 ring-4 ring-indigo-300 rounded-full text-white my-7' type='submit' onClick={handleOnClick}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <hr />
            </>
        )
    }
    else {
        return (
            <>
                {/* Review Heading */}
                <div className="container mx-auto mt-6">
                    <div className='w-fit mx-auto flex flex-col justify-center items-center'>
                        <h1 className="text-center text-2xl lg:text-3xl">Reviews</h1>
                        <div style={{ width: '90%', height: '4px', borderRadius: '100px' }} className="bg-blue-500"></div>
                    </div>
                </div>



                {/* Review Cards */}
                <div className="container mx-auto mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {review.map((eleReview) => {
                            return (
                                <div className="bg-white border-2 min-h-18 border-slate-200 flex flex-col rounded-3xl mx-2">
                                    <div className="flex justify-center items-center my-4">
                                        {/* <img src={eleReview.gender === 'male' ? male : female} alt="" /> */}
                                        <img src={male} alt="male" className="object-cover rounded-full h-24 border-2 border-slate-200" />
                                    </div>
                                    <div className="flex justify-center items-center flex-col">
                                        <h1 className="text-center text-xl">{eleReview.firstname} {eleReview.lastname}</h1>
                                        <p className="text-center my-5 mb-8 px-9">"{eleReview.review} Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, deleniti."</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <br />
                <br />
                <br />
                <hr />
            </>
        )
    }
}

export default Review;

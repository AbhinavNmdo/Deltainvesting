import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import '../../node_modules/animate.css/animate.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import male from '../Images/male.png';
import SwiperCore, {
  Pagination,
  Scrollbar
} from 'swiper';
// import quote from '../Images/quote1.png';
// import female from '../Images/female.png';
// import back from "../Images/background.jpg"

SwiperCore.use([Pagination, Scrollbar])

const HomePage = (props) => {
  const [classes, setClasses] = useState([]);
  const [review, setReview] = useState([]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    navigator: true,
    slidesToShow: 3,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        }
      }
    ]
  };

  const getClass = async () => {
    props.setProgress(50)
    const responce = await fetch(`${process.env.REACT_APP_HOSTURI}/api/courses`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      }
    });
    const json = await responce.json();
    props.setProgress(70)
    setClasses(json.classes);
    props.setProgress(100)
  }

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
    getClass();
    getReview();
    // eslint-disable-next-line
  }, [])
  return (
    <>
      {/* ! Hero Section */}
      <div className="h-96">
        <div className="header flex flex-col justify-center items-center h-96">
          <div className="mt-20 flex flex-col justify-center items-center">
            <h1 className="text-5xl text-white text-center">Investing Delta Academy</h1>
            <p style={{ color: 'white', fontSize: '2.3rem', fontFamily: 'krutidev', marginBottom: '50px' }}>lksp cny tk,xh ---</p>
          </div>
        </div>
      </div>



      {/* Carousel */}
      {/* <div className="container mx-auto">
        <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        >
          <SwiperSlide className="flex justify-center items-center"><img src={back} alt="" className="object-cover h-96 w-full" /></SwiperSlide>
          <SwiperSlide><img src={back} alt="" width={550} /></SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </div> */}



      {/* Introduction Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 px-2 md:px-20 lg:px-20">
        <div className="bg-white border-2 border-slate-300 p-1 drop-shadow-2xl rounded-3xl flex flex-col justify-between" style={{ minHeight: '35rem' }}>
          <div className="px-3 md:px-6 lg:px-8">
            <h1 className="text-2xl lg:text-3xl text-center pt-4 lg:pt-6">Our Courses</h1>
            <p className="pt-4 lg:pt-6">We are here to provide the complete education for stock market, its an excellent platform for the beginners looking to adopt the market as career. Our courses will definitely change your life style and approach. We will make you so much enable to understand what actually is going on in the market, and how to make profits out of this dynamic market.</p>
          </div>
          <iframe
            src="https://www.youtube.com/embed/djZdqF2H1ro"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="allowfullscreen"
            className="rounded-b-3xl w-full h-56 lg:h-72"
          ></iframe>
        </div>
        <div className="bg-white border-2 border-slate-300 p-1 drop-shadow-2xl rounded-3xl flex flex-col justify-between" style={{ minHeight: '35rem' }}>
          <div className="px-3 md:px-6 lg:px-8">
            <h1 className="text-2xl lg:text-3xl text-center pt-4 lg:pt-6">What is Stock Market?</h1>
            <p className="pt-4 lg:pt-6">Stock market is a venue where investors meet each others to buy and sell the securities on the platform of Stock Exchange for the in equity, derivative, Bonds, Mutual Funds, currency companies listed with Exchange.</p>
          </div>
          <iframe
            src="https://www.youtube.com/embed/djZdqF2H1ro"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="allowfullscreen"
            className="rounded-b-3xl w-full h-56 lg:h-72"
          ></iframe>
        </div>
      </div>


      {/* Student Reviews Cards */}
      <div className="container flex justify-between items-center mr-0 mt-24 px-9 lg:px-24">
        <div>
          <h1 className="text-center text-2xl lg:text-3xl">Reviews</h1>
          <div style={{ width: '90%', height: '4px', borderRadius: '100px' }} className="bg-blue-500"></div>
        </div>
        <Link to="reviews" className="text-lg text-blue-600 ring-4 ring-blue p-2 px-3 rounded-3xl hover:bg-blue-400 hover:text-white transition-all ease-in duration-200">View All</Link>
      </div>
      <div className="container mx-auto px-2 mt-7">
        <Swiper slidesPerView={1} spaceBetween={10} pagination={{
          "clickable": true
        }} breakpoints={{
          "640": {
            "slidesPerView": 1,
            "spaceBetween": 15
          },
          "768": {
            "slidesPerView": 2,
            "spaceBetween": 0
          },
          "1024": {
            "slidesPerView": 3,
            "spaceBetween": 0
          }
        }} className="mySwiper">
          {review.map((eleReview) => {
            return (
              <SwiperSlide>
                <div>
                  <div className="bg-white border-2 min-h-18 border-slate-200 mx-3 flex flex-col rounded-3xl ">
                    <div className="flex justify-center items-center my-4">
                      <img src={male} alt="male" className="object-cover rounded-full h-24 border-2 border-slate-200" />
                    </div>
                    <div className="flex justify-center items-center flex-col">
                      <h1 className="text-center text-xl">{eleReview.firstname} {eleReview.lastname}</h1>
                      <p className="text-center my-5 mb-8 px-9">"{eleReview.review} Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, deleniti."</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>


      {/* Courses Available Cards */}
      <div className="container flex justify-between items-center mt-24 px-9 lg:px-24">
        <div>
          <h1 className="text-center text-2xl lg:text-3xl">Latest Courses</h1>
          <div style={{ width: '90%', height: '4px', borderRadius: '100px' }} className="bg-blue-500"></div>
        </div>
        <Link to="courses" className="text-lg text-blue-600 ring-4 ring-blue p-2 px-3 rounded-3xl hover:bg-blue-400 hover:text-white transition-all ease-in duration-200">View All</Link>
      </div>
      <div className="container px-2 mx-auto mt-7">
        <Swiper slidesPerView={1} spaceBetween={0} pagination={{
          "clickable": true
        }} breakpoints={{
          "640": {
            "slidesPerView": 1,
            "spaceBetween": 20
          },
          "768": {
            "slidesPerView": 2,
            "spaceBetween": 40
          },
          "1024": {
            "slidesPerView": 3,
            "spaceBetween": 50
          }
        }} className="mySwiper">
          {classes.map((classs) => {
            return (
              <SwiperSlide>
                <div>
                  <Link to="courses">
                    <div className="bg-white border-2 border-slate-200 mx-3 flex flex-col rounded-3xl">
                      <div className="p-3">
                        <img src={`../Images/upload/${classs.thumbnail}`} alt="Class" className="object-cover rounded-xl" />
                      </div>
                      <div className="px-8">
                        <h1 className="text-center text-2xl">{classs.name}</h1>
                        <h1 className="text-slate-600 mt-3">Teach you About : Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, reprehenderit!</h1>
                      </div>
                      <div className="flex justify-between items-center px-8 mt-5 mb-4">
                        <h1>Duration : 2 hours</h1>
                        <h1 className="text-xl">₹ 2,000</h1>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </>
  );
};

export default HomePage;

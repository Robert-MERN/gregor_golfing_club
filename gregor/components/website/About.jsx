import React, { useRef } from 'react'
import Footer from '../utilities/Footer';
import styles from '@/styles/Home.module.css';
import useStateContext from '@/context/ContextProvider'
import Fade from "react-reveal/Fade";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import pic1 from "@/public/images/pic1.png"
import pic2 from "@/public/images/pic2.png"
import pic3 from "@/public/images/pic3.png"
import pic4 from "@/public/images/pic4.png"
import pic5 from "@/public/images/pic5.png"
import pic6 from "@/public/images/pic6.png"
import pic7 from "@/public/images/pic7.png"
import pic8 from "@/public/images/pic8.png"
import pic9 from "@/public/images/pic9.png"
import pic10 from "@/public/images/pic10.png"
import pic11 from "@/public/images/pic11.png"
import pic12 from "@/public/images/pic12.png"
import pic13 from "@/public/images/pic13.png"
import pic14 from "@/public/images/pic14.png"
import pic15 from "@/public/images/pic15.png"
import pic16 from "@/public/images/pic16.png"
import pic17 from "@/public/images/pic17.png"
import Image from 'next/image';

const About = ({ user }) => {
    const { openSidebar } = useStateContext();


    const slideRef = useRef();
    const slide = [
        { img: pic1, },
        { img: pic2 },
        { img: pic3 },
        { img: pic4 },
        { img: pic5 },
        { img: pic6 },
        { img: pic7 },
        { img: pic8 },
        { img: pic9 },
        { img: pic10 },
        { img: pic11 },
        { img: pic12 },
        { img: pic13 },
        { img: pic14 },
        { img: pic15 },
        { img: pic16 },
        { img: pic17 },
    ]

    const PrevBtn = () => {
        return (
            <button onClick={() => slideRef.current.slickPrev()} style={{ left: "40px", top: "50%", transform: "translate(-50%, -50%)" }} className='text-white absolute h-[40px] md:h-[50px]  w-[40px] md:w-[50px] rounded-full md:w-50 grid place-items-center  bg-black-trans hover:bg-glare transition-all' >
                <NavigateBeforeIcon />
            </button>
        )
    }
    const NextBtn = () => {
        return (
            <button onClick={() => slideRef.current.slickNext()} style={{ right: "0", top: "50%", transform: "translate(-50%, -50%)" }} className='text-white absolute h-[40px] md:h-[50px] w-[40px] md:w-[50px] rounded-full md:w-50 grid place-items-center  bg-black-trans hover:bg-glare transition-all' >
                <NavigateNextIcon />
            </button>

        )
    }
    const Btn = () => {
        return (
            <button className='hidden' >click</button>
        )
    }
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        dots: false,
        nextArrow: <Btn />,
        prevArrow: <Btn />,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    infinite: true,

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,

                }
            }
        ]
    };

    const apiKey = 'AIzaSyBVHpNETGQbjxtvfGN39Fa5tJxg2nHtPb0';
    const location = '169w Clarkston Rd, Lake Orion, MI 48362, USA';


    return (
        <div className={`${styles.scrollBar} ${user ? "h-[calc(100vh-60px)] lg:pt-6 pt-24" : "h-screen pt-[100px]"} flex flex-col items-center  px-[20px]  ${openSidebar ? "lg:px-[80px]" : "lg:px-[120px]"} overflow-y-auto  transition-all duration-300`} >

            {/* section-1 */}
            <section className='flex flex-col items-center w-full' id="section-1">
                <h1 className="text-stone-100 text-[20px] lg:text-[28px] font-bold text-center mb-1 lg:w-[750px] transition-all" >About</h1>
                <p className='text-[13px] lg:text-[15px] text-stone-400 lg:w-[750px] text-center mt-3 transition-all' > The Gregor, is a premium indoor golf and private member club experience. The club offers two exceptional AboutGOLF™ (aG) curved enclosures accessible to members 24 hours a day 7 days a week.</p>
                <p className='text-[13px] lg:text-[15px] text-stone-400 lg:w-[750px] text-center mt-3 transition-all' >It is our goal to enhance member lifestyle and encourage social interaction. We do this by providing a reserved relaxed setting, while promoting physical activity in our cutting-edge indoor golf simulators.
                </p>
                <iframe
                    allowfullscreen="true"
                    src="https://momento360.com/e/u/567b86657a844c8385446eace4988b3e?utm_campaign=embed&utm_source=other&heading=370.31&pitch=-1.74&field-of-view=92&size=medium&display-plan=true"
                    frameborder="0"
                    className={`mt-12 ${user ? "lg:w-[900px]" : "lg:w-[1100px]"} w-full h-[200px] md:h-[250px]`}
                ></iframe>
            </section>


            {/* section-2 */}
            <section className='mt-24 flex flex-col items-center' id="section-2">
                <h1 className="text-stone-100 text-[20px] lg:text-[28px] font-bold text-center mb-1 lg:w-[750px] transition-all" >The Technology</h1>
                <p className='text-[13px] lg:text-[15px] text-stone-400 lg:w-[750px] text-center mt-3 transition-all' >
                    Every ag sim has 3trak® technology that measures the 3d location of a golf ball with stereo vision (multiple cameras) in the first few feet of flight. these high-performance cameras use proprietary technology for tracking golf balls traveling in excess of 220 mph just as well as short putts rolling at 2 mph.
                </p>

                <div id="info-cards-container" className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center place-content-center gap-8 mt-16'>

                    {/* card-1 */}
                    <div id="card-1" className={`w-full ${user ? "md:w-[300px] px-5" : "md:w-[350px] px-7"} rounded-md py-6  bg-stone-50 flex flex-col gap-4 h-[400px] md:h-[550px]`} >
                        <div>
                            <h1 className="text-[#6CBE45] text-[20px] lg:text-[28px] font-bold mb-1 transition-all  break-words" >The 3Trak® Technology hello</h1>
                        </div>

                        <div>
                            <ol className='list-outside list-disc mb-4 px-6' >
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    Eclipses Any Launch Monitor Packaged For An Indoor Hitting Area.
                                </li>
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    Machine Vision Technology In Every 3trak® Records The Point Of Impact In A Series Of Images Captured With High-speed Cameras.
                                </li>
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    Captures 3d Vector Of The Ball
                                </li>
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    Projects A Precise Shot Shape Even With Unusual Combinations Such As High Launch Angle And Low Ball Velocity.
                                </li>

                            </ol>
                        </div>

                    </div>

                    {/* card-2 */}
                    <div id="card-2" className={`w-full ${user ? "md:w-[300px] px-5" : "md:w-[350px] px-7"} rounded-md py-6  bg-stone-50 flex flex-col gap-4 h-[400px] md:h-[550px]`}>
                        <div>
                            <h1 className="text-[#6CBE45] text-[20px] lg:text-[28px] font-bold mb-1 transition-all  break-words" >Ag Locker Mobile App:</h1>
                        </div>

                        <div>
                            <ol className='list-outside list-disc mb-4 px-6' >
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    Log-in To Any Aboutgolfsimulator
                                </li>
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    Cutting-edge Competitions,
                                </li>
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    Event Leaderboards
                                </li>
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    Your Greatest Achievements
                                </li>
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    Recordings Of Your Best Shots
                                </li>
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    Community Based
                                </li>

                            </ol>
                        </div>

                    </div>

                    {/* card-3 */}
                    <div id="card-3" className={`w-full ${user ? "md:w-[300px] px-5" : "md:w-[350px] px-7"} rounded-md py-6  bg-stone-50 flex flex-col gap-4 h-[400px] md:h-[550px]`}>
                        <div>
                            <h1 className="text-[#6CBE45] text-[20px] lg:text-[28px] font-bold mb-1 transition-all  break-words" >Extraordinary Accuracy</h1>
                        </div>

                        <div>
                            <ol className='list-outside list-disc mb-4 px-6' >
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    Ag Sims Proprietary Confetti Pattern
                                </li>
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    3trak® Unambiguously Sees Rotation Of The Ball's Surface.
                                </li>
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    Non-repeating Pattern
                                </li>
                                <li className='text-[12px] md:text-[15px] text-zinc-500 font-semibold py-2' >
                                    No Matter What Portion Of The Pattern Is Seen By The Cameras, The Marks Uniquely Describe The Orientation Of The Ball.
                                </li>

                            </ol>
                        </div>

                    </div>

                </div>
            </section>

            {/* section-3 */}
            <section className='flex justify-center mt-28' >

                <div className={`flex flex-col items-center ${user ? "lg:w-[900px]" : "lg:w-[1100px]"} w-full`} >

                    <div className='flex flex-col lg:flex-row w-full gap-8' >


                        <div className='flex-1 flex flex-col justify-center'>
                            <Fade top long >
                                <div className='mb-6 lg:mb-8' >
                                    <h1 className={`text-stone-100 text-[20px] lg:text-[28px] leading-tight font-bold whitespace-normal text-center lg:text-left`} >
                                        Improve Your Game With The aG Locker App
                                    </h1>
                                </div>
                            </Fade>

                            <Fade right delay={300}>
                                <p className={`text-stone-300 text-[14px] lg:text-[16px] leading-tight text-center lg:text-left mb-5 lg:mb-10`}>
                                    aG Locker lets you walk away from any aboutGOLF simulator with all your golf stats, removing lingering questions about club distances, spin, ball speed, launch angle, and more.
                                    <br />
                                    <br />
                                    Our private member facility is similar in stature to premier country clubs, yet intimate, defying the less traditional nature often encountered at indoor golf clubs.
                                </p>
                            </Fade>

                            <Fade bottom long delay={200}>
                                <div className='w-full flex md:flex-row flex-col justify-center lg:justify-start gap-6 md:gap-12' >

                                    <button className='w-full md:w-fit flex items-center justify-center px-[24px] py-[6px] rounded-md bg-[#6CBE45] hover:opacity-[.8]  gap-3 text-white text-[13px] hover:text-stone-100 transition-all duration-300' >
                                        <FaApple className='text-[35px]' />
                                        <div className='text-left'>

                                            Get it on the

                                            <p className='font-semibold text-[16px] lg:text-[18px] w-fit leading-none' >App Store</p>
                                        </div>

                                    </button>

                                    <button className='w-full md:w-fit flex items-center justify-center px-[24px] py-[6px] rounded-md bg-[#6CBE45] hover:opacity-[.8] gap-3 text-white text-[13px] hover:text-stone-100 transition-all duration-300' >
                                        <FaGooglePlay className='text-[25px]' />
                                        <div className='text-left'>

                                            Download on the

                                            <p className='font-semibold text-[16px] lg:text-[18px] w-fit leading-none' >Play Store</p>
                                        </div>

                                    </button>

                                </div>
                            </Fade>



                        </div>

                        <Fade left delay={250}>
                            <div className='flex-1 flex items-center justify-center md:mt-0 mt-6' >
                                <iframe src="https://player.vimeo.com/video/497458443?h=242641dc34" className='w-full md:w-[650px] lg:w-full h-full' frameborder="0" allow="autoplay; fullscreen;" allowfullscreen></iframe>
                            </div>
                        </Fade>

                    </div>
                </div>

            </section>

            {/* section-4 */}
            <section className='flex flex-col items-center mt-28' >
                <h1 className="text-stone-100 text-[20px] lg:text-[28px] font-bold text-center mb-1 lg:w-[750px] transition-all" >
                    90+ GAMES AND COURSES
                </h1>

                <div className={`w-[300px] md:w-[650px] ${user ? "lg:w-[900px]" : "lg:w-[1100px]"} mt-14 relative`} >

                    <Slider ref={slideRef} autoplaySpeed={300} autoplay={true} {...settings} >
                        {slide.map((each, index) => (
                            <div key={index} className='flex flex-col justify-center items-center' >
                                <Image
                                    src={each.img}
                                    alt={`pic${index + 1}`}
                                    className='w-full px-2 object-contain md:w-[180px]'
                                />
                            </div>
                        ))
                        }
                    </Slider>
                    <PrevBtn />
                    <NextBtn />

                </div>
                <div className={`w-[300px] md:w-[650px] ${user ? "lg:w-[900px]" : "lg:w-[1100px]"} mt-14 relative`}>
                    <div >
                        <Slider ref={slideRef} autoplaySpeed={350} autoplay={true} {...settings} slidesToScroll={1} >
                            {slide.sort((a, b) => b - a).map((each, index) => (
                                <div key={index} className='flex flex-col justify-center items-center' >
                                    <Image
                                        src={each.img}
                                        alt={`pic${index + 1}`}
                                        className='w-full px-2 object-contain md:w-[180px]'
                                    />
                                </div>
                            ))
                            }
                        </Slider>
                        <PrevBtn />
                        <NextBtn />
                    </div>
                </div>
            </section >

            {/* section-5 */}
            <section className='mt-14 lg:mt-28' >
                <div className={`w-full md:w-[650px] ${user ? "lg:w-[900px] mb-[50px]" : "lg:w-[1100px]"} h-[400px] mt-16 lg:mt-0 p-0 md:p-12 lg:p-0`} >
                    <iframe
                        className='w-full h-full rounded-md'
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${location}&zoom=12`}

                    ></iframe>

                </div>
            </section>

            {!user &&
                <div className='mt-12' >
                    <Footer />
                </div>
            }
        </div >

    )
}

export default About
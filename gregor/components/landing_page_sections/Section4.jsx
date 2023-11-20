import React from 'react'
import Fade from "react-reveal/Fade";
import Image from "next/image";
import slide1 from "@/public/images/slide1.jpg";
import slide2 from "@/public/images/slide2.jpg";
import slide3 from "@/public/images/slide3.jpg";
import slide4 from "@/public/images/slide4.jpg";
import center from "@/public/images/center.jpg";


const Section4 = () => {

    return (
        <div className='flex justify-center mb-14 lg:mb-28' >
            <div className='w-full lg:w-[1200px] flex flex-col items-center' >
                <Fade right long >
                    <h1 className={`w-full lg:w-[800px] text-stone-100 text-[28px] md:text-[34px] lg:text-[44px] leading-tight lg:leading-[60px] font-bold whitespace-normal text-center mb-8`} >
                        Golf™ Premium Simulator Enclosures
                    </h1>
                </Fade>

                <div className='flex flex-col items-center justify-center lg:flex-row w-full gap-8' >

                    <Fade left delay={200}>
                        <div className='flex-1 flex flex-col items-center gap-6' >
                            <Image
                                alt='illustration3'
                                src={slide3}
                                className="rounded-md"
                            />
                            <Image
                                alt='illustration4'
                                src={slide4}
                                className="rounded-md"
                            />

                        </div>
                    </Fade>


                    <Fade top>
                        <div className='flex-2 flex flex-col items-center justify-center'>
                            <Image
                                alt='center-image'
                                src={center}
                                className="lg:w-[500px] md:w-[450px] sm:w-[300px]  object-contain rounded-md"
                            />
                        </div>
                    </Fade>

                    <Fade right>
                        <div className='flex-1 flex flex-col gap-6 items-center'>
                            <Image
                                alt='illustration1'
                                src={slide1}
                                className="object-contain rounded-md"
                            />
                            <Image
                                alt='illustration2'
                                src={slide2}
                                className="object-contain rounded-md"
                            />
                        </div>
                    </Fade>


                </div>
            </div>

        </div>
    )
}

export default Section4
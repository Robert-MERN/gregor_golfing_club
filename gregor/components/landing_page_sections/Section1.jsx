import React, { useState, useEffect } from 'react'
import Image from "next/image";
import Link from "next/link"
import section1Theme from "../../public/images/full_logo_white.png"
import { getCookie } from 'cookies-next';
import Fade from "react-reveal/Fade";



const Section1 = () => {
    return (

        <Fade duration={500} >
            <div
                className='mb-20 lg:mb-40 flex justify-center pt-[120px] lg:pt-[150px]'
            >
                <div className='lg:w-[1200px] w-full' >

                    <div className='flex flex-col lg:flex-row' >



                        <div className='flex-1 flex flex-col justify-end'>
                            <Fade left >
                                <div className='mb-6 lg:mb-8 hidden lg:block' >

                                    <span className={`text-stone-100 text-[46px] leading-tight text-center font-bold whitespace-normal`} >
                                        Welcome To The </span>
                                    <span className={`text-[#6CBE45] text-[46px] leading-tight   font-bold whitespace-normal`} > GREGOR </span>

                                    <span className={`text-stone-100 text-[46px] leading-tight  font-bold whitespace-normal`} >
                                        Private Indoor Golf & Club</span>
                                </div>
                            </Fade>
                            <Fade left >

                                <div className='mb-6 lg:mb-8 block lg:hidden' >
                                    <p className={`text-stone-100 text-[28px] md:text-[36px] leading-tight text-center lg:text-center  font-bold whitespace-normal`} >
                                        Welcome To The </p>
                                    <p className={`text-[#6CBE45] text-[28px] md:text-[36px] leading-tight text-center lg:text-center  font-bold whitespace-normal`} > GREGOR </p>

                                    <p className={`text-stone-100 text-[28px] md:text-[36px] leading-tight text-center lg:text-center font-bold whitespace-normal`} >
                                        Private Indoor Golf & Club</p>
                                </div>
                            </Fade>
                            <Fade left delay={200} >
                                <p
                                    className={`text-stone-300 text-[18px] lg:text-[21px] leading-tight mb-10 text-center lg:text-left`}
                                >
                                    Experience an exclusive golf retreat with round-the-clock access, member leagues, and a contemporary chic space that redefines the standards of golfing excellence.
                                </p>
                            </Fade>

                            <Fade bottom long>
                                <div className='w-full flex justify-center lg:justify-start'>

                                    <Link href="/login" >
                                        <button className='px-20 py-[10px] text-white rounded-md text-[15px] lg:text-[17px] font-medium bg-[#6CBE45] hover:opacity-[0.8] transition-all duration-300' >
                                            Login as a member
                                        </button>
                                    </Link>
                                </div>
                            </Fade>

                        </div>

                        <Fade right delay={300} >

                            <div className='flex-1 flex items-center justify-center lg:justify-end' >
                                <Image
                                    alt='illustration'
                                    src={section1Theme}
                                    className="w-[400px] object-contain"
                                />
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        </Fade>
    )
}

export default Section1
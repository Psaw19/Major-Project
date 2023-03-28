import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {


    return (
        <div className='w-full pt-5 space-y-5 text-slate-600 md:space-y-8'>

            <h1 className='text-center font-semibold text-xl text-slate-600 md:text-3xl'>Your Personal AI Yoga Assistant</h1>

            <div className='w-full max-w-[1280px] mx-auto flex flex-col md:flex-row-reverse items-center'>


                <div className='w-full md:w-[45%] mx-auto h-[300px] lg:h-[400px] xl:h-[500px] bg-no-repeat bg-center bg-contain bg-animation'></div>

                <div className='w-full md:w-[55%] px-5 sm:px-8 text-center sm:text-left'>

                    <h2 className='font-medium text-xl md:text-2xl mb-2 md:mb-4'>What is Yoga?</h2>

                    <p className='md:text-lg text-justify'>In terms of practice, Yoga is a discipline that over 300 million people around the world are actively engaged in. The word “Yoga” literally means “union,” and refers to an inner state where one experiences everything as a part of oneself. Often mistaken for a system of physical exercise, the Yogic system is actually a set of tools for self-transformation that are designed to bring one to this state of union.</p>

                    <h2 className='md:text-xl font-medium mt-5'>Are you ready to get fit from inside ? </h2>

                    <div className='flex gap-5 md:gap-10 flex-row md:text-lg w-full mt-3 sm:flex-row justify-center sm:justify-start md:mt-5'>

                        <Link to='/start'>
                            <button className='btn'>Let's Get Started</button>
                        </Link>
                        <Link to='/tutorials'>
                            <button className='btn'>Tutorial</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
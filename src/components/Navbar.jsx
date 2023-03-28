import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GrMenu, GrClose } from "react-icons/gr"

const Navbar = () => {

    const [toggle, setToggle] = useState(false);
    const navRef = useRef();
    const ref = useRef();

    const handleClickOutside = (event) => {
        (toggle && !navRef.current.contains(event.target) && !ref.current.contains(event.target)) ? setToggle(false) : '';
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [toggle])

    return (
        <div className='w-full shadow-md text-lg md:text-xl font-medium relative'>

            <div className='flex sm:items-baseline gap-5 justify-between sm:justify-start' >
                <Link to='/'>
                    <h1 className='text-xl sm:text-2xl font-semibold md:text-3xl p-5'>YogaFit</h1>
                </Link>

                <div className='items-baseline gap-5 hidden sm:flex'>

                    <Link to='/'>
                        <button>Home</button>
                    </Link>

                    <Link to='/about'>
                        <button >About</button>
                    </Link>
                </div>

                <div ref={ref} className='flex justify-center items-center p-5 sm:hidden'>
                    <GrClose onClick={() => setToggle(toggle => !toggle)} className={`${toggle ? "block" : "hidden"} cursor-pointer`} />
                    <GrMenu onClick={() => setToggle(toggle => !toggle)} className={`${!toggle ? "block" : "hidden"} cursor-pointer`} />
                </div>


                <div ref={navRef} className={`absolute left-0 ${toggle ? 'top-[100%]' : 'top-[-500%]'} transition-all duration-300 z-10 flex flex-col items-center justify-center w-full bg-black/30 backdrop-blur p-2`}>

                    <Link to='/' onClick={() => setToggle(toggle => !toggle)} className='w-full'>
                        <button className='p-3 w-full'>Home</button>
                    </Link>

                    <Link to='/about' onClick={() => setToggle(toggle => !toggle)} className='w-full'>
                        <button className='p-3 w-full'>About</button>
                    </Link>

                    <Link to='/start' onClick={() => setToggle(toggle => !toggle)} className='w-full'>
                        <button className='p-3 w-full'>Start</button>
                    </Link>

                </div>


            </div>
        </div>
    )
}

export default Navbar
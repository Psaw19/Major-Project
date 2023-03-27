import React from 'react'
import { tutorials, fixCamera } from '../utils/data'

export default function Tutorials() {
    return (
        <div className="w-full mt-3">

            <div className='w-full max-w-[1260px] mx-auto space-y-3 md:space-y-5 flex flex-col justify-start'>

                <h1 className="w-full text-center text-lg md:text-3xl font-semibold">Basic Tutorials</h1>

                <div className="text-sm sm:text-base px-5">
                    {tutorials.map((tutorial, index) => (
                        <p key={index}>{tutorial}</p>
                    ))}
                </div>

                <h1 className="w-full text-center text-lg md:text-3xl font-semibold pt-2 md:pt-5">Camera Not Working?</h1>

                <div className="text-sm sm:text-base px-5">
                    {fixCamera.map((points, index) => (
                        <p key={index} className="">{points}</p>
                    ))}
                </div>

            </div>


        </div>
    )
}

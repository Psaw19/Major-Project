import React, { useContext } from 'react'
import YogaContext from '../YogaContext'
import { poseInstructions } from '../utils/data'
import { poseImages } from '../utils/pose_images'

export default function Instructions() {

    const { currentPose } = useContext(YogaContext);

    return (
        <div className="w-full md:pt-10">

            <div className='w-full max-w-[1260px] mx-auto flex flex-col-reverse md:flex-row '>

                <ol className="w-full md:w-[60%] pl-8 pr-3 list-decimal">

                    {poseInstructions[currentPose].map((instruction, index) => {
                        return (
                            <li key={index} className="space-y-1">{instruction}</li>
                        )

                    })}
                </ol>

                <div className='w-full md:w-[40%]'>


                    <img
                        className="h-56 md:h-80 mx-auto"
                        src={poseImages[currentPose]}
                        alt="pose_images"
                    />
                </div>

            </div>

        </div>
    )
}

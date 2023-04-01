import React from 'react'
import { useContext } from 'react'
import YogaContext from '../YogaContext'
import { BsChevronDown } from 'react-icons/bs'
import { poseImages } from '../utils/pose_images'
import { Listbox } from '@headlessui/react'

const DropDown = ({ poseList }) => {

    const { currentPose, setCurrentPosefunc } = useContext(YogaContext);

    return (
        <div className='mt-2 mx-auto w-80'>

            <Listbox className="w-full">

                <Listbox.Button
                    className="p-2 text-black flex items-center w-full justify-center gap-2 text-2xl font-medium rounded-lg border border-slate-500 relative ">
                    {currentPose} <BsChevronDown className={`mt-2 text-base transition duration-300`} />

                    <Listbox.Options className="w-80 border h-48 overflow-auto rounded-lg scrollbar-hide cursor-pointer mt-1 absolute top-12">

                        {poseList.map((pose, index) => (

                            <Listbox.Option key={index} onClick={() => setCurrentPosefunc(pose)} >
                                {({ active }) => (
                                    <div className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                        } flex items-center justify-center gap-5 p-1`} >

                                        <p className="">{pose}</p>
                                        <img src={poseImages[pose]} alt='' className="h-14" />
                                    </div>
                                )}

                            </Listbox.Option>
                        ))}

                    </Listbox.Options>
                </Listbox.Button>
            </Listbox>
        </div>

    )
}

export default DropDown;

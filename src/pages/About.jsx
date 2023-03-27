import React from 'react'
import sagnik from '/dev-image/sagnik.jpg';
import lakshit from '/dev-image/lakshit.jpeg';
import mihir from '/dev-image/mihir.jpeg';
import prashant from '/dev-image/prashant.jpeg';

export default function About() {
    return (
        <div className="wrapper">

            <div className=" w-full max-w-[1280px] mx-auto">

                <h1 className="text-2xl md:text-3xl font-semibold text-center my-2">About</h1>


                <p className="text-justify mx-4 sm:mx-6">

                    This is an realtime AI based Yoga Trainer which detects your pose how well you are doing.
                    We created this as a Major project, and We have also deployed this project
                    so people can use it and mainly the developers can who are learning AI can learn
                    from this project and make their own AI or they can also improve in this project.
                    This is an open source project, The code is available on the <a className='text-blue-400' href="https://github.com/Rambo8390/YogaFit" >GitHub</a>.

                    This AI first predicts keypoints or coordinates of different parts of the body(basically where
                    they are present in an image) and then it use another classification model to classify the poses if
                    someone is doing a pose and if AI detects that pose more than 95% probability and then it will notify you are
                    doing correctly(by making virtual skeleton green). I have used Tensorflow pretrained Movenet Model To Predict the
                    Keypoints and building a neural network top of that which uses these coordinates and classify a yoga pose.

                    I have trained the model in python because of tensorflowJS we can leverage the support of browser so I converted
                    the keras/tensorflow model to tensorflowJS.
                </p>

                <div className="mx-2 md:mx-4">
                    <h4 className='font-semibold text-lg text-center my-2 sm:mt-4'>About Team Members</h4>

                    <div className='grid grid-rows-2 grid-cols-2 w-fit mx-auto gap-2 sm:grid-rows-1 md:grid-cols-4'>

                        <div className=' text-center text-sm font-semibold'>
                            <img className='h-28 mx-auto' src={sagnik}></img>
                            <p>SAGNIK PURKAIT</p>
                        </div>

                        <div className=' text-center text-sm font-semibold'>
                            <img className="h-28 mx-auto" src={mihir}></img>
                            <p>MIHIR SANE</p>
                        </div>

                        <div className=' text-center text-sm font-semibold'>
                            <img className='h-28 mx-auto' src={lakshit}></img>
                            <p>LAKSHIT SHAH</p>
                        </div>

                        <div className=' text-center text-sm font-semibold'>
                            <img className='h-28 mx-auto' src={prashant}></img>
                            <p>PRASHANT SAW</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

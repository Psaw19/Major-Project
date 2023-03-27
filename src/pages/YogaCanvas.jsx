import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import { useRef, useEffect, useContext, useState } from "react";
import YogaContext from "../YogaContext";
import { poseImages } from "../utils/pose_images";
import { POINTS, keypointConnections } from "../utils/data";
import { drawPoint, drawSegment } from "../utils/helper";
import Webcam from "react-webcam";
import { count } from "../utils/music";
import { useNavigate } from "react-router-dom";
import modelData from "/src/model/model.json";

// flag variable is used to help capture the time when AI just detect
// the pose as correct(probability more than threshold)
let flag = false;
let skeletonColor = "rgb(255,0,0)";

// eslint-disable-next-line 
let interval;

function YogaCanvas() {
  const {
    stopPose,
    isStartPose,
    startingTime,
    startingTimefunc,
    currentTime,
    currentTimefunc,
    poseTime,
    poseTimefunc,
    bestPerform,
    bestPerformfunc,
    currentPose,
  } = useContext(YogaContext);

  let navigate = useNavigate();

  const screen = 639;

  const [width, setWidth] = useState(window.innerWidth);
  const [videoWidth, setVideoWidth] = useState(width > screen ? 640 : 360);
  const [videoHeight, setVideoHeight] = useState(width > screen ? 480 : 270);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    setVideoWidth(width > screen ? 640 : 360);
    setVideoHeight(width > screen ? 480 : 270);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  useEffect(() => {
    const timeDiff = (currentTime - startingTime) / 1000;
    if (flag) {
      poseTimefunc(timeDiff);
    }
    if ((currentTime - startingTime) / 1000 > bestPerform) {
      bestPerformfunc(timeDiff);
    }
  },
    // eslint-disable-next-line 
    [currentTime]);

  useEffect(() => {
    currentTimefunc(0);
    poseTimefunc(0);
    bestPerformfunc(0);
  },
    // eslint-disable-next-line 
    [currentPose]);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const CLASS_NO = {
    Chair: 0,
    Cobra: 1,
    Dog: 2,
    No_Pose: 3,
    Shoulderstand: 4,
    Traingle: 5,
    Tree: 6,
    Warrior: 7,
  };

  function get_center_point(landmarks, left_bodypart, right_bodypart) {
    let left = tf.gather(landmarks, left_bodypart, 1);
    let right = tf.gather(landmarks, right_bodypart, 1);
    const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5));
    return center;
  }

  function get_pose_size(landmarks, torso_size_multiplier = 2.5) {
    let hips_center = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    let shoulders_center = get_center_point(
      landmarks,
      POINTS.LEFT_SHOULDER,
      POINTS.RIGHT_SHOULDER
    );
    let torso_size = tf.norm(tf.sub(shoulders_center, hips_center));
    let pose_center_new = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    pose_center_new = tf.expandDims(pose_center_new, 1);

    pose_center_new = tf.broadcastTo(pose_center_new, [1, 17, 2]);
    // return: shape(17,2)
    let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0);
    let max_dist = tf.max(tf.norm(d, "euclidean", 0));

    // normalize scale
    let pose_size = tf.maximum(
      tf.mul(torso_size, torso_size_multiplier),
      max_dist
    );
    return pose_size;
  }

  function normalize_pose_landmarks(landmarks) {
    let pose_center = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    pose_center = tf.expandDims(pose_center, 1);
    pose_center = tf.broadcastTo(pose_center, [1, 17, 2]);
    landmarks = tf.sub(landmarks, pose_center);

    let pose_size = get_pose_size(landmarks);
    landmarks = tf.div(landmarks, pose_size);
    return landmarks;
  }

  function landmarks_to_embedding(landmarks) {
    // normalize landmarks 2D
    landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0));
    let embedding = tf.reshape(landmarks, [1, 34]);
    return embedding;
  }

  const runMovenet = async () => {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    class ModelLoader {
      constructor(modelString) {
        this.model = eval('(' + modelString + ')');
      }

      save(modelString) {
        this.model = eval('(' + modelString + ')');
      }

      load() {
        return new Promise((resolve, reject) => {
          resolve(this.model);
        });
      }
    }
    // const myModel = JSON.stringify(modelData);
    const poseClassifier = await tf.loadLayersModel(
      // new ModelLoader(JSON.stringify(modelData))
      "https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json"
      // model
    )
    console.log(poseClassifier)
    // console.log(modelData)
    const countAudio = new Audio(count);
    countAudio.loop = true;
    interval = setInterval(() => {
      detectPose(detector, poseClassifier, countAudio);
    }, 100);
  };

  const detectPose = async (detector, poseClassifier, countAudio) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      let notDetected = 0;
      const video = webcamRef.current.video;
      const pose = await detector.estimatePoses(video);
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      try {
        const keypoints = pose[0].keypoints;
        const scale = width > screen ? 1 : 0.5625;
        let input = keypoints.map((keypoint) => {
          if (keypoint.score > 0.4) {
            if (
              !(keypoint.name === "left_eye" || keypoint.name === "right_eye")
            ) {
              drawPoint(ctx, keypoint.x * scale, keypoint.y * scale, 6 * scale, "rgb(0,255,255)");
              let connections = keypointConnections[keypoint.name];
              try {
                connections.forEach((connection) => {
                  let conName = connection.toUpperCase();
                  drawSegment(
                    ctx,
                    [keypoint.x * scale, keypoint.y * scale],
                    [
                      keypoints[POINTS[conName]].x * scale,
                      keypoints[POINTS[conName]].y * scale,
                    ],
                    skeletonColor
                  );
                });
              } catch (err) {
                // console.log(err)
              }
            }
          } else {
            notDetected += 1;
          }
          return [keypoint.x, keypoint.y];
        });
        if (notDetected > 4) {
          skeletonColor = "rgb(255,0,0)";
          return;
        }
        const processedInput = landmarks_to_embedding(input);
        const classification = poseClassifier.predict(processedInput);

        classification.array().then((data) => {
          const classNo = CLASS_NO[currentPose];

          if (data[0][classNo] > 0.97) {
            if (!flag) {
              countAudio.play();
              startingTimefunc(new Date(Date()).getTime());
              flag = true;
            }
            currentTimefunc(new Date(Date()).getTime());
            skeletonColor = "rgb(0,255,0)";
          } else {
            flag = false;
            skeletonColor = "rgb(255,0,0)";
            countAudio.pause();
            countAudio.currentTime = 0;
          }
        });
      } catch (err) {
        // console.log(err);
      }
    }
  };

  if (isStartPose) {
    runMovenet();
    return (
      <div className="">

        <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-6">
          <div className="flex gap-3">
            <h4 className="btn">Pose Time: {poseTime} s</h4>
            <h4 className="btn">Best: {bestPerform} s</h4>
          </div>
          <div className="">
            <button onClick={() => { navigate(`/start`) }} className="btn effect">
              Stop Pose
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 lg:flex-row lg:gap-0">

          <div className="relative">

            <Webcam
              width={videoWidth}
              height={videoHeight}
              id="webcam"
              className="webcam rounded-xl drop-shadow-lg shadow-lg rotate-y-180"
              ref={webcamRef}
            />
            <canvas
              ref={canvasRef}
              className="my-canvas absolute top-0 left-0 z-10 rotate-y-180"
              width={videoWidth}
              height={videoHeight}
            ></canvas>

          </div>

          <div className="flex items-center justify-center w-full lg:w-[30%]" >
            <img src={poseImages[currentPose]} alt="poses" />
          </div>
        </div>

      </div>
    );
  }
}

export default YogaCanvas;


// https://api.jsonserve.com/rDP1hH
import { useContext } from "react";
import Instructions from "../components/Instructions";
import YogaContext from "../YogaContext";
import DropDown from "../components/DropDown";
import { useNavigate } from "react-router-dom";

let poseList = [
  'Tree',
  'Chair',
  'Cobra',
  'Warrior',
  'Dog',
  'Shoulderstand',
  'Triangle',
];

function Yoga() {
  const { startYoga } = useContext(YogaContext);

  let navigate = useNavigate();

  return (
    <div className="w-screen">

      <DropDown poseList={poseList} />
      <Instructions />
      <div className="w-full flex justify-center my-3">
        <button onClick={() => {
          navigate(`/yoga`);
          startYoga(true);
        }} className="btn">
          Start Pose
        </button>

      </div>

    </div>
  );
}

export default Yoga;
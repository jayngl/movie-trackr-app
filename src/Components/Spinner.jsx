import React from "react";
import { PuffLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  return (
    <div className="w-full h-[500px] borde flex justify-center items-center">
      {" "}
      <PuffLoader loading={loading} color="white" size={150} />
    </div>
  );
};

export default Spinner;

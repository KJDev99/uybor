import React from "react";

const Msg = ({ status, text, seeMsg }) => {
  return (
    <div
      className={` py-2 px-4 max-w-[600px] text-center w-full fixed z-[1110] flex items-center rounded-xl left-[50%] translate-x-[-50%]  justify-center text-white transition-all ${
        status == "warning" && "bg-yellow-500"
      } ${status == "success" && "bg-blue-500"} ${
        seeMsg == "1" ? "top-[100px]" : "top-[-300px]"
      }`}
    >
      {text}
    </div>
  );
};

export default Msg;

import Button from "./Button";
import Search from "@/assets/images/search.svg";
import { IoMdClose } from "react-icons/io";

const Hero = () => {
  return (
    <div
      className="main_bg h-[calc(100vh-80px)] bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('./images/mainbg.webp')" }}
    >
      <div className="container pt-[50px]">
        <div className="flex justify-between mx-[70px] bg-white h-[60px] rounded-2xl relative">
          <input
            type="text"
            className="ml-10 h-full border-none outline-none text-kulrang  w-[calc(100%-200px)]"
            placeholder="Qidirish"
          />
          <IoMdClose className="absolute right-[176px] top-[22px] text-xl text-qora cursor-pointer"/>
          <div className="mr-[10px] my-[10px] ml-[30px] w-[136px] h-10">
            <Button main image={Search} text="E’lon&nbsp;joylash" color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

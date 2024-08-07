import Image from "next/image";
import Img from "@/assets/images/boshelon.svg";

const NoItems = ({ text }) => (
  <div className="flex justify-center items-center h-max py-20 flex-col">
    <Image src={Img} alt="empty" className="w-[158px] mb-6" />
    <p className="font-semibold text-xl text-#343434">{text}</p>
  </div>
);

export default NoItems;

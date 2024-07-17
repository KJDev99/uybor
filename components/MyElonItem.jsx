import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import EditImg from "@/assets/images/editelon.svg";
import StarImg from "@/assets/images/starelon.svg";
import FinishImg from "@/assets/images/yakunlash.svg";
import Link from "next/link";

const MyElonItem = ({
  top,
  image,
  turi,
  name,
  address,
  data,
  price,
  edit,
  finish,
}) => {
  return (
    <Link href={'/profil/editelon'}>
      <div className="flex bg-white rounded-[20px] overflow-hidden shadow-lg relative">
        <div className="relative">
          {top && (
            <div className="absolute left-0 top-0 bg-sariq rounded-tl-[20px] rounded-tr-[0px] rounded-br-[15px] rounded-bl-[0px] color-white flex item items-center justify-center font-medium text-white h-[30px] w-[78px]">
              Top
            </div>
          )}
          <Image src={image} alt={image} className="w-full" />

          <div
            className={`absolute h-5 w-20 flex items-center justify-center text-white text-xs capitalize bottom-2 right-2 rounded-full ${
              turi == "ijara" ? "bg-ijara" : "bg-ochYashil"
            }`}
          >
            {turi}
          </div>
        </div>
        <div className="py-5 px-5 flex flex-col flex-grow">
          <h3 className="line-clamp-2 text-qora text-xl font-semibold flex-grow">
            {name}
          </h3>
          <div className="flex mt-2 mb-[10px]">
            <CiLocationOn className="text-lg" />
            <p className="text-sm text-kulrang ml-2 ">{address}</p>
          </div>
          <div className="flex justify-between mb-[10px] items-center">
            <p className="text-sm text-kulrang">{data}</p>
            <p className="text-xl text-qora font-semibold">{price}</p>
          </div>
          <div className="flex justify-end gap-5 border-t border-kulrang pt-[10px]">
            {!top && (
              <button className="text text-qora px-4 py-1 rounded-md font-medium bg-[#FFE8BC] outline-none border-none flex justify-center items-center">
                <Image src={StarImg} alt="edit" className="mr-2" />
                Topga chiqarish
              </button>
            )}
            {edit && (
              <button className="text text-qora px-4 py-1 rounded-md font-medium bg-[#E7F4FF] outline-none border-none flex justify-center items-center">
                <Image src={EditImg} alt="edit" className="mr-2" />
                Tahrirlash
              </button>
            )}
            {finish && (
              <button className="text text-qora px-4 py-1 rounded-md font-medium bg-[#CFFFDD] outline-none border-none flex justify-center items-center">
                <Image src={FinishImg} alt="edit" className="mr-2" />
                Yakunlash
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyElonItem;

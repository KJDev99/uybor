import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CiLocationOn } from "react-icons/ci";

const ElonBlockSkeleton = ({ view }) => {
  if (view === "block") {
    return (
      <div className="flex flex-col bg-white rounded-[20px] max-md:rounded-[5px] overflow-hidden shadow-lg">
        <div className="relative">
          <Skeleton height={237} />
          <div className="absolute top-4 right-4">
            <Skeleton circle={true} height={30} width={30} />
          </div>
          <div className="absolute bottom-2 right-2 flex items-center justify-center text-white text-xs capitalize rounded-full">
            <Skeleton width={60} height={20} />
          </div>
        </div>
        <div className="py-2 px-4 max-md:px-2 flex flex-col">
          <Skeleton height={24} width="80%" />
          <Skeleton height={20} count={2} />
          <div className="flex mt-2 mb-1">
            <CiLocationOn className="text-lg" />
            <Skeleton
              width={100}
              height={20}
              style={{ marginLeft: "0.5rem" }}
            />
          </div>
          <Skeleton height={20} width="40%" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex bg-white rounded-[20px] max-md:rounded-[5px] overflow-hidden shadow-lg md:relative md:h-[190px]">
        <div className="relative max-md:w-[130px] max-md:flex-shrink-0">
          <Skeleton height={190} width={268} />
          <div className="absolute bottom-2 right-2 flex items-center justify-center text-white text-xs capitalize rounded-full">
            <Skeleton width={60} height={20} />
          </div>
          <div className="absolute top-3 right-3">
            <Skeleton circle={true} height={23} width={23} />
          </div>
        </div>
        <div className="py-5 px-5 max-md:p-[10px] flex flex-col flex-grow">
          <Skeleton height={30} width="90%" />
          <Skeleton height={30} width="60%" style={{ marginBottom: "1rem" }} />
          <div className="flex mt-2 mb-4 max-md:mb-1">
            <CiLocationOn className="text-lg" />
            <Skeleton
              width={100}
              height={20}
              style={{ marginLeft: "0.5rem" }}
            />
          </div>
          <Skeleton height={30} width="40%" />
        </div>
      </div>
    );
  }
};

export default ElonBlockSkeleton;

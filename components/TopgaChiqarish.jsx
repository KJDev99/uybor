import React, { useState } from "react";

const TopgaChiqarish = () => {
  const [selectedOption, setSelectedOption] = useState("top");
  const [selectedDuration, setSelectedDuration] = useState("10 kun");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.id);
  };

  const handleDurationClick = (duration) => {
      setSelectedDuration(duration);
      console.log(selectedDuration)
  };

  return (
    <div className="flex flex-col mt-[10px]">
      <h2 className="text-qora text-xl font-semibold">
        Topga chiqarish
      </h2>
      <p className="text-sm text-kulrang mb-2 ml-[20px]">
        E’loningizni to’lov evaziga topga chiqarish bepul joylangan e’lonlardan
        ko’ra oldinroq sotish va ko’proq haridorlar oqimi imkonini beradi.
      </p>
      <form className="flex ml-5 mb-5">
        <label htmlFor="top" className="flex items-center mr-4">
          <input
            type="radio"
            id="top"
            name="oddiy"
            onChange={handleOptionChange}
            checked={selectedOption === "top"}
          />
          <span
            className={`ml-2 text-lg font-medium ${
              selectedOption === "top" ? "text-logoKok" : "text-kulrang"
            }`}
          >
            Topga chiqarish
          </span>
        </label>
        <label htmlFor="oddiy" className="flex items-center ml-[50px]">
          <input
            type="radio"
            id="oddiy"
            name="oddiy"
            onChange={handleOptionChange}
          />
          <span
            className={`ml-2 text-lg font-medium ${
              selectedOption === "oddiy" ? "text-logoKok" : "text-kulrang"
            }`}
          >
            Oddiy e’lon
          </span>
        </label>
      </form>
      <div className="w-full gap-5 flex mb-10">
        <div
          className={`rounded-[10px] p-5 border cursor-pointer ${
            selectedDuration === "3 kun" ? "border-logoKok bg-ochKok" : "bg-white border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("3 kun")}
        >
          <h2 className="font-bold mb-[10px] text-center text-[32px]">3 kun</h2>
          <h3 className="text-2xl mb-[10px] font-semibold">10 000 so’m</h3>
          <p className="text-sm text-kulrang">
            E’loningiz 3 kun davomida Topda turadi. Saytga tashrif buyuruvchilar
            sizning e’loningizni birinchilardan bo’lib ko’radi.
          </p>
        </div>
        <div
          className={`rounded-[10px] p-5 border cursor-pointer ${
            selectedDuration === "10 kun" ? "border-logoKok bg-ochKok" : "bg-white border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("10 kun")}
        >
          <h2 className="font-bold mb-[10px] text-center text-[32px]">
            10 kun
          </h2>
          <h3 className="text-2xl mb-[10px] font-semibold">80 000 so’m</h3>
          <p className="text-sm text-kulrang">
            E’loningiz 10 kun davomida Topda turadi. Saytga tashrif
            buyuruvchilar sizning e’loningizni birinchilardan bo’lib ko’radi.
          </p>
        </div>
        <div
          className={`rounded-[10px] p-5 border cursor-pointer ${
            selectedDuration === "30 kun" ? "border-logoKok bg-ochKok" : "bg-white border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("30 kun")}
        >
          <h2 className="font-bold mb-[10px] text-center text-[32px]">
            30 kun
          </h2>
          <h3 className="text-2xl mb-[10px] font-semibold">200 000 so’m</h3>
          <p className="text-sm text-kulrang">
            E’loningiz 30 kun davomida Topda turadi. Saytga tashrif
            buyuruvchilar sizning e’loningizni birinchilardan bo’lib ko’radi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopgaChiqarish;

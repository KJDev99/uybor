import React, { useState } from "react";
import Image from "next/image";
import rasmYuklash from "@/assets/images/rasmyuklash.svg";
import Camera from "@/assets/images/camera.svg";
import { FaTimes } from "react-icons/fa";

const AddImage = ({ textImage, size }) => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const uploadedImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) =>
        [...prevImages, ...uploadedImages].slice(0, 10)
      );
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-qora text-2xl font-semibold ml-[20px] mt-5 mb-2">
        Rasmlar
      </h2>
      {!textImage && (
        <p className="text-lg text-kulrang mb-5 ml-[20px]">
          Birinchi yuklangan surat asosiy bo‘ladi. Fayl .jpg yoki .png formatda
          va hajmi 10MBdan oshmasligi kerak
        </p>
      )}
      <div className="flex flex-wrap">
        <label
          className={`border border-dashed border-logoKok flex flex-col items-center justify-center rounded-[10px] mb-5 mr-5 cursor-pointer ${
            size ? "w-[115px] h-[115px] mr-3 mb-3" : "w-[150px] h-[150px] mr-5 mb-5"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            multiple
            onChange={handleImageUpload}
          />
          <Image src={rasmYuklash} alt="rasmlar" />
          <p className="text-sm text-logoKok mt-3">Rasm yuklash</p>
        </label>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center relative rounded-[10px] bg-white ${
              size ? "w-[115px] h-[115px] mr-3 mb-3" : "w-[150px] h-[150px] mr-5 mb-5"
            }`}
          >
            {images[index] ? (
              <>
                <Image
                  src={images[index]}
                  alt={`Rasm ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[10px]"
                />
                <button
                  className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-1"
                  onClick={() => removeImage(index)}
                >
                  <FaTimes size={12} />
                </button>
              </>
            ) : (
              <Image src={Camera} alt="rasmlar" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddImage;

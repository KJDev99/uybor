import React, { useState, useEffect } from "react";
import Image from "next/image";
import rasmYuklash from "@/assets/images/rasmyuklash.svg";
import Camera from "@/assets/images/camera.svg";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const AddImage = ({ textImage, size, formData, setFormData, value }) => {
  const [images, setImages] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        url: [...(prevFormData.media || [])],
      }));
      console.log(formData);
      setImages(value.map((img) => img.file));
    }
  }, [value]);
  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        file: file, // Binary file data
        fileURL: URL.createObjectURL(file),
      }));

      setImages((prevImages) =>
        [...prevImages, ...newImages.map((img) => img.fileURL)].slice(0, 10)
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        url: [...(prevFormData.media || [])],
        media: [...newImages],
      }));
    }
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedMedia = formData.url.filter((_, i) => i !== index);

    setImages(updatedImages);
    console.log(updatedMedia, "ad");

    // Update formData with updated images
    setFormData((prevFormData) => ({
      ...prevFormData,
      url: updatedMedia,
    }));
  };

  const prepareFormData = () => {
    const formData = new FormData();
    images.forEach((img, index) => {
      const file = formData.media[index].file;
      formData.append("files", file);
    });
    return formData;
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-qora text-2xl font-semibold ml-[20px] mt-5 mb-2 max-md:mb-1 max-md:text-[16px] max-md:ml-[0px]">
        {t("add10")}
      </h2>
      {!textImage && (
        <p className="text-lg text-kulrang mb-5 ml-[20px] max-md:text-xs max-md:ml-[10px]">
          {t("add11")}
        </p>
      )}
      <div className="flex flex-wrap max-md:justify-around">
        <label
          className={`border border-dashed border-logoKok flex flex-col items-center justify-center rounded-[10px] mb-5 mr-5 cursor-pointer ${
            size
              ? "w-[115px] h-[115px] max-md:w-[140px] max-md:h-[140px] mr-3 mb-3"
              : "w-[150px] h-[150px] max-md:w-full max-md:h-[140px] mr-5 mb-5"
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
          <p className="text-sm text-logoKok mt-3 text-center">{t("add12")}</p>
        </label>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center relative rounded-[10px] bg-white ${
              size
                ? "w-[115px] h-[115px] mr-3 mb-3 max-md:w-[140px] max-md:h-[140px]"
                : "w-[150px] h-[150px] max-md:w-[140px] max-md:h-[140px] mr-5 mb-5"
            }`}
          >
            {images[index] ? (
              <>
                <img
                  src={images[index]}
                  alt={`Rasm`}
                  className="rounded-[10px] object-cover h-full w-full"
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

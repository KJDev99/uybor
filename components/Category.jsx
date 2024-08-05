// components/Category.js
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const Category = ({ image, text, category }) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      // Perform API request based on category
      await api.get(`/api/v1/ads/list?category=${category}`);
      // Redirect to search page
      router.push(`/search?category=${category}`);
    } catch (error) {
      console.error("Failed to fetch ads:", error);
    }
  };

  return (
    <div
      className="flex flex-col bg-white rounded-[10px] w-[224px] items-center shadow-lg max-md:flex-shrink-0 max-md:w-[90px] cursor-pointer"
      onClick={handleClick}
    >
      <Image
        className="w-full rounded-[10px] px-10 my-6 h-[146px] object-cover"
        src={image}
        alt={text}
      />
      <p className="text-sm font-semibold text-qora md:my-2 max-md:h-[30px] max-md:text-[10px] text-center mdd:leading-3 flex items-center">
        {text}
      </p>
    </div>
  );
};

export default Category;

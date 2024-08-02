// components/Categorys.js
import React from "react";
import Category from "./Category";
import Kvartiralar from "@/assets/images/kvartiralar.webp";
import Xovlilar from "@/assets/images/xovlilar.webp";
import Ofislar from "@/assets/images/ofislar.webp";
import Dokonlar from "@/assets/images/dokonlar.webp";
import Mehmonxona from "@/assets/images/mehmonxona.webp";

const categories = [
  { image: Kvartiralar, text: "Kvartiralar", category: "APARTMENT" },
  { image: Xovlilar, text: "Xovlilar", category: "HOUSE" },
  { image: Ofislar, text: "Ofislar", category: "OFFICE" },
  { image: Dokonlar, text: "Do'konlar", category: "SHOP" },
  { image: Mehmonxona, text: "Mehmonxona va dachalar", category: "HOTEL" },
];

const Categorys = () => {
  return (
    <div className="flex flex-col container">
      <h2 className="mt-[10px] mb-[30px] text-2xl text-qora font-semibold max-md:text-lg max-md:mt-5 max-md:mb-4">
        Kategoriyalar
      </h2>
      <div className="flex justify-between max-md:overflow-x-scroll category_scroll gap-[10px] max-md:pb-2">
        {categories.map((cat, index) => (
          <Category
            key={index}
            image={cat.image}
            text={cat.text}
            category={cat.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Categorys;

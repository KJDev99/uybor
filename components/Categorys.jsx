import React from "react";
import Category from "./Category";
import Kvartiralar from "@/assets/images/kvartira.png";
import Xovlilar from "@/assets/images/hovli.png";
import Ofislar from "@/assets/images/ofis.png";
import Dokonlar from "@/assets/images/shop.png";
import Mehmonxona from "@/assets/images/hotel.png";
import { useTranslation } from "react-i18next";

const categories = [
  { image: Kvartiralar, text: "Kvartiralar", category: "APARTMENT" },
  { image: Xovlilar, text: "Xovlilar", category: "HOUSE" },
  { image: Ofislar, text: "Ofislar", category: "OFFICE" },
  { image: Dokonlar, text: "Do'konlar", category: "SHOP" },
  { image: Mehmonxona, text: "Mehmonxona va dachalar", category: "HOTEL" },
];

const Categorys = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col container">
      <h2 className="mt-[10px] mb-[30px] text-2xl text-qora font-semibold max-md:text-lg max-md:mt-5 max-md:mb-4">
        {t("kategoriya")}
      </h2>
      <div className="flex justify-between max-md:overflow-x-scroll category_scroll gap-[10px] max-md:pb-2">
        {categories.map((cat, index) => (
          <Category
            key={index}
            image={cat.image}
            text={cat.category}
            category={cat.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Categorys;

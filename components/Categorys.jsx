import React from "react";
import Category from "./Category";
import Kvartiralar from "@/assets/images/kvartiralar.webp";
import Xovlilar from "@/assets/images/xovlilar.webp";
import Ofislar from "@/assets/images/ofislar.webp";
import Dokonlar from "@/assets/images/dokonlar.webp";
import Mehmonxona from "@/assets/images/mehmonxona.webp";

const Categorys = () => {
  return (
    <div className="flex flex-col container">
      <h2 className="mt-[50px] mb-[30px] text-2xl text-qora font-semibold max-md:text-lg max-md:mt-5 max-md:mb-4">
        Kategoriyalar
      </h2>
      <div className="flex justify-between max-md:overflow-x-scroll overflow-y-clip gap-[10px]">
        <Category image={Kvartiralar} text="Kvartiralar" v />
        <Category image={Xovlilar} text="Xovlilar" />
        <Category image={Ofislar} text="Ofislar" />
        <Category image={Dokonlar} text="Do'konlar" />
        <Category image={Mehmonxona} text="Mehmonxona va dachalar" />
      </div>
    </div>
  );
};

export default Categorys;

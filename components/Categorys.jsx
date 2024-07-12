import React from "react";
import Category from "./Category";
import Kvartiralar from "@/assets/images/Kvartiralar.png";
import Xovlilar from "@/assets/images/Xovlilar.png";
import Ofislar from "@/assets/images/Ofislar.png";
import Dokonlar from "@/assets/images/Dokonlar.png";
import Mehmonxona from "@/assets/images/Mehmonxona.png";

const Categorys = () => {
  return (
    <div className="flex flex-col container">
      <h2 className="mt-[50px] mb-[30px] text-2xl text-qora font-semibold">Kategoriyalar</h2>
      <div className="flex justify-between flex-wrap">
        <Category image={Kvartiralar} text="Kvartiralar" v/>
        <Category image={Xovlilar} text="Xovlilar" />
        <Category image={Ofislar} text="Ofislar" />
        <Category image={Dokonlar} text="Do'konlar" />
        <Category image={Mehmonxona} text="Mehmonxona va dachalar" />
      </div>
    </div>
  );
};

export default Categorys;

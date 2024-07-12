import Image from "next/image";
import LogoImg from "@/assets/images/logo.svg";
import Elonberish from "@/assets/images/elonberish.svg";
import Profil from "@/assets/images/profil.svg";
import Savedmsg from "@/assets/images/savedmsg.svg";
import LanguageSelector from "./SelectLanguage";
import Button from "./Button";

const Navbar = () => {
  return (
    <div className="bg-[#EDF7FF]">
      <div className="container h-20 flex justify-between border-b-[0.5px] border-logoKok">
      <Image src={LogoImg} alt="Logo" className="w-[74px] ml-[70px]"  />
      <div className="flex items-center">
        <LanguageSelector />
        <div className="ml-8">
          <Button color="qora" image={Savedmsg} text="Tanlanganlar" />
        </div>
        <div className="ml-8">
          <Button color="qora" image={Profil} text="Profil" />
        </div>
        <div className="w-[200px] h-10 ml-10">
          <Button
            main
            borderRadiusFull
            color="white"
            image={Elonberish}
            text="E’lon joylash"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;

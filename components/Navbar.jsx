import Image from "next/image";
import LogoImg from "@/assets/images/logo.svg";
import Elonberish from "@/assets/images/elonberish.svg";
import Profil from "@/assets/images/profil.svg";
import Savedmsg from "@/assets/images/savedmsg.svg";
import LanguageSelector from "./SelectLanguage";
import Button from "./Button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-[#EDF7FF]">
      <div className="container h-20 flex justify-between border-b-[0.5px] border-logoKok">
        <Link href="/">
          <Image src={LogoImg} alt="Logo" className="w-[74px] ml-[70px] mt-4" />
        </Link>
        <div className="flex items-center">
          <LanguageSelector />
          <Link href="/tanlanganlar">
            <div className="ml-8">
              <Button color="qora" image={Savedmsg} text="Tanlanganlar" />
            </div>
          </Link>
          <div className="ml-8">
            <Button color="qora" image={Profil} text="Profil" />
          </div>
          <Link href="/addelon">
            <div className="w-[200px] h-10 ml-10">
              <Button
                main
                borderRadiusFull
                color="white"
                image={Elonberish}
                text="E’lon joylash"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

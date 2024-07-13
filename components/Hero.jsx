import Filter from "./Filter";
import Search from "./Search";

const Hero = () => {
  return (
    <div
      className="main_bg h-[calc(100vh-80px)] bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('./images/mainbg.webp')" }}
    >
      <div className="container pt-[50px]">
        <div className="flex flex-col bg-[#FDFEFF] rounded-2xl p-5">
          <Search />
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default Hero;

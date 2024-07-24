import Filter from "./Filter";
import Search from "./Search";

const Hero = () => {
  return (
    <div
      className="main_bg h-[calc(100vh-80px)] bg-no-repeat bg-cover bg-center max-md:hidden"
      style={{ backgroundImage: "url('./images/mainbg.webp')" }}
    >
      <div className="container pt-[50px]">
        <div className="flex flex-col bg-[#ffffffd8] rounded-2xl p-5">
          <Search />
          <Filter />
        </div>
        <div className="flex flex-col">
          <h1 className="mt-7 mb-3 font-semibold text-logoKok text-[42px]">
            Istaganingizni oson toping
          </h1>
          <p className="text-logoKok font-semibold">
            Ko’chmas mulklarning katta bozori
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

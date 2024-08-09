const InnerBg = () => {
  return (
    <div
      className="main_bg h-[306px] max-md:h-[151px] bg-no-repeat bg-cover bg-center my-[50px] max-md:mt-5 flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('./images/innerBg.png')" }}
    >
      <div className="ml-24">
        <span className="inline-block mb-[22px] max-md:mb-1 text-2xl py-[6px] px-[28px] bg-[#E3E6ED] text-black max-md:px-5 max-md:py-1 max-md:text-[10px]">
          Barcha ko’chmas mulklar bozori
        </span>
        <h2 className="text-[70px] text-black font-medium max-md:text-2xl">
          Siz to‘g‘ri joydasiz!
        </h2>
      </div>
    </div>
  );
};

export default InnerBg;

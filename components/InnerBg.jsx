const InnerBg = () => {
  return (
    <div
      className="main_bg h-[306px] bg-no-repeat bg-cover bg-center my-[50px] flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('./images/innerBg.png')" }}
    >
      <div className="ml-24">
        <span className="inline-block mb-[22px] text-2xl py-[6px] px-[28px] bg-[#E3E6ED] text-black">Barcha ko’chmas mulklar bozori</span>
        <h2 className="text-[70px] text-black font-medium">Siz to‘g‘ri joydasiz!</h2>
      </div>
    </div>
  );
};

export default InnerBg;

const SarlavhaKiritish = () => {
  return (
    <div className="flex flex-col relative mr-[10px]">
      <h2 className="text-kulrang font-medium ml-[20px] mt-5 mb-2 text-sm">
        Sarlavhani kiriting
      </h2>
      <div className="flex flex-col">
        <input
          type="text"
          className="outline-none pr-4 overflow-hidden text-qora font-medium flex p-[10px] h-10 w-full rounded-[10px] justify-between items-center cursor-pointer border border-yozish"
        />
        <p className="text-sm mt-1 ml-5 text-kulrang">Kamida 10 belgi</p>
      </div>
    </div>
  );
};

export default SarlavhaKiritish;

const page = () => {
  return (
    <div className=" rounded-[10px] bg-white p-[30px] flex items-center justify-center flex-col mb-[50px]">
      <h1 className="text-2xl text-qora font-semibold mt-20 mb-5">
        Profildan chiqmoqchimisiz?
      </h1>
      <p className="text text-qora mb-[60px] max-w-[350px] text-center font-medium">
        Chiqsangiz profilingiz o’chib ketmaydi. <br /> Parolni kiritib profilga qayta
        kirishingiz mumkin
      </p>
      <div className="flex mb-20">
        <button className="h-[44px] w-[173px] border border-kulrang text-kulrang text-lg rounded-[10px] mx-5 hover:border-logoKok hover:bg-logoKok hover:text-white transition-all">
          Yo'q
        </button>
        <button className="h-[44px] w-[173px] border border-kulrang text-kulrang text-lg rounded-[10px] mx-5 hover:border-logoKok hover:bg-logoKok hover:text-white transition-all">
          Ha
        </button>
      </div>
    </div>
  );
};

export default page;

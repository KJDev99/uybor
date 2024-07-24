import ProfilMenu from "@/components/ProfilMenu";

const Profil = ({ children }) => {
  return (
    <div className="container">
      <div className="flex md:gap-[30px] mt-5  ">
        <div className="w-1/4 max-md:w-full max-md:hidden  ">
          <ProfilMenu />
        </div>
        <div className="w-3/4 flex flex-col max-md:w-full">
          <div className="w-full h-[70px] bg-white rounded-[10px] flex justify-end mb-5 max-md:hidden">
            <div className="flex items-center ">
              <h2 className="text-qora text-2xl font-medium">Xoshimjon</h2>
              <img
                src="/images/person.png"
                alt=""
                className="h-10 w-10 mr-[60px] ml-10"
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Profil;

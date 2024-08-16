import { useEffect, useState } from "react";
import api from "@/lib/api";

const InnerBg = () => {
  const [backgroundData, setBackgroundData] = useState({
    bannerUrl: "",
    linkUrl: "",
  });

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await api.get("/api/v1/banner");
        const data = response.data;
        setBackgroundData({ bannerUrl: data.banner1_uz, linkUrl: data.url1 });
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBannerData();
  }, []);

  return (
    <a href={backgroundData.linkUrl} target="blank" rel="noopener noreferrer">
      <div
        className="main_bg h-[300px] max-md:h-[151px] bg-no-repeat bg-cover bg-center my-[50px] max-md:mt-5"
        style={{ backgroundImage: `url(${backgroundData.bannerUrl})` }}
      ></div>
    </a>
  );
};

export default InnerBg;

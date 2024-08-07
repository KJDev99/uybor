import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import api from "@/lib/api";
import ElonBlock from "./ElonBlock";

export default function ElonSlider({ userId, category, adId }) {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchAds = async () => {
    setLoading(true);
    try {
      let response = "";
      if (userId) response = await api.get(`/api/v1/ads/author/${userId}`);
      if (category)
        response = await api.get(`/api/v1/ads/list?category=${category}`);
      const transformedAds = response.data.results
        .filter((ad) => ad.id != adId) // Exclude ad with matching id
        .map((ad) => ({
          image: ad.media,
          top: ad.is_top,
          save: true,
          turi: ad.ad_type.toLowerCase(),
          name: ad.title,
          address: `${ad.region.name_uz} ${ad.district.name_uz}`,
          data: new Date(ad.created).toLocaleDateString("en-GB"),
          price: ad.price,
          view: "block",
          id: ad.id,
        }));
      setAds(transformedAds);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={10}
      navigation={true}
      breakpoints={{
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      modules={[Navigation]}
      className="mySwiper mySwiper3"
    >
      {ads.map((ad) => (
        <SwiperSlide key={ad.id} className="flex w-auto">
          <ElonBlock {...ad} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

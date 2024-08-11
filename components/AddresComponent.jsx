"use client";

import React, { useState, useEffect } from "react";
import { getGeoCodeAddressList } from "./getGeoCodeAddressList"; // Update the import path as needed

const AddressComponent = () => {
  const [formData, setFormData] = useState({ address: "" });
  const [addressList, setAddressList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 41.292906,
    lng: 69.24132,
  });

  const handleAddressChange = async (e) => {
    const newAddress = e.target.value;
    setFormData({ address: newAddress });
    console.log(newAddress);

    if (newAddress) {
      try {
        const response = await getGeoCodeAddressList(newAddress);
        if (response.status === 200) {
          const addresses =
            response.data.response.GeoObjectCollection.featureMember.map(
              (address) => ({
                label: address.GeoObject.name,
                value: address.GeoObject.Point.pos,
                description: address.GeoObject.description,
                location: address.GeoObject.Point.pos,
                ...address,
              })
            );
          console.log(response.data);
          setAddressList(addresses);

          // Update map coordinates to the first result
          if (addresses.length > 0) {
            const [lon, lat] = addresses[0].value.split(" ");
            setSelectedLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
          }
        }
      } catch (error) {
        console.error("Error fetching geocode data:", error);
      }
    }
  };

  const getMapSrc = () => {
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
      formData.address
    )}`;
  };

  return (
    <div>
      <input
        type="text"
        value={formData.address}
        onChange={handleAddressChange}
        className="mb-5 mt-[10px] outline-none pr-4 overflow-hidden text-qora font-medium flex p-[10px] h-10 w-full rounded-[10px] justify-between items-center cursor-pointer border border-yozish"
      />
      <iframe
        src={`https://yandex.ru/map-widget/v1/?ll=${selectedLocation.lng},${selectedLocation.lat}&z=12`}
        loading="lazy"
        className="mb-5 rounded-[10px] border-none outline-none h-[380px] w-full max-md:h-[335px]"
      ></iframe>
    </div>
  );
};

export default AddressComponent;

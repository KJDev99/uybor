"use client";
import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import axios from "axios";

function MyMap({ formData, setFormData, value }) {
  const [searchValue, setSearchValue] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [selectedCoords, setSelectedCoords] = useState([40.0902, 65.3312]); // Default center coordinates
  const [userLocation, setUserLocation] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapState, setMapState] = useState({
    center: [40.0902, 65.3312],
    zoom: 12,
  });

  const apiKey = "a2617277-0573-40b0-a017-85d5da6270eb";

  useEffect(() => {
    // setSearchValue(value)
    console.log(value);
  }, []);

  // API ga so‘rov yuboradigan funksiya
  const getGeoCodeAddressList = async (geocoder) => {
    try {
      const response = await axios({
        method: "get",
        url: "https://geocode-maps.yandex.ru/1.x/",
        params: {
          format: "json",
          apikey: apiKey,
          geocode: geocoder,
          sco: "latlong",
          lang: "en-US", // Change to your desired language
          results: 5,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching geocode data:", error);
      return null;
    }
  };

  // Input qiymati o‘zgarganda chaqiriladigan funksiya
  const handleInputChange = async (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    if (newValue) {
      const data = await getGeoCodeAddressList(newValue);
      if (data && data.response && data.response.GeoObjectCollection) {
        const addresses = data.response.GeoObjectCollection.featureMember.map(
          (address) => {
            const coords = address.GeoObject.Point.pos.split(" ").map(Number);
            // Ensure coords are in [latitude, longitude] format
            return {
              label: address.GeoObject.name,
              value: coords.length === 2 ? [coords[1], coords[0]] : coords,
              description: address.GeoObject.description,
            };
          }
        );
        setAddressList(addresses);
      }
    } else {
      setAddressList([]);
    }
  };

  // Dropdowndan tanlangan manzilni holatda saqlash
  const handleAddressSelect = (address) => {
    const coords = address.value;

    setFormData({ ...formData, latitude: coords[0], longitude: coords[1] });

    setSelectedCoords(coords);
    setMapState({ center: coords, zoom: 12 }); // Center map on selected location
    setSearchValue(address.label);
    setAddressList([]);
  };

  // Foydalanuvchi joyini aniqlash
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setSelectedCoords([latitude, longitude]);
        setMapState({ center: [latitude, longitude], zoom: 12 }); // Center map on user's location
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Xarita holatini yangilash
  const handleMapBoundsChange = () => {
    if (mapInstance) {
      mapInstance.events.add("boundschange", () => {
        setMapState(mapInstance.getState());
      });
    }
  };

  return (
    <>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Qidirish..."
        className="outline-none pr-4 overflow-hidden text-qora font-medium flex p-[10px] h-10 w-full rounded-[10px] justify-between items-center cursor-pointer border border-yozish mb-5"
      />
      {/* <button onClick={handleLocateMe}>Men</button>{" "} */}
      {/* Button to locate user */}
      {addressList.length > 0 && (
        <ul
          style={{
            border: "1px solid #ddd",
            padding: "0",
            margin: "0",
            listStyle: "none",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {addressList.map((address, index) => (
            <li
              key={index}
              onClick={() => handleAddressSelect(address)}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              {address.label}
            </li>
          ))}
        </ul>
      )}
      <YMaps>
        <Map
          state={mapState}
          width="100%"
          height="400px"
          onLoad={(ymaps) => {
            setMapInstance(ymaps);
            handleMapBoundsChange(); // Ensure map instance is set
          }}
        >
          {selectedCoords && <Placemark geometry={selectedCoords} />}
          {userLocation && <Placemark geometry={userLocation} />}
        </Map>
        {/* {selectedCoords && <div>Координаты: {selectedCoords.join(", ")}</div>} */}
      </YMaps>
    </>
  );
}

export default MyMap;

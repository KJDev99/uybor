"use client";
import { useEffect, useRef } from "react";

const YANDEX_API_KEY = "dd3d8e42-b837-42e6-8f97-5dab7d542d03"; // Your Yandex Maps API key

function MapComponent({ position }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const scriptId = "yandex-maps-script";
    let script = document.getElementById(scriptId);

    if (!script) {
      // Create script element if it doesn't exist
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://api-maps.yandex.com/2.1/?apikey=${YANDEX_API_KEY}&lang=en_US`;
      script.async = true;
      document.head.appendChild(script);
    }

    const initializeMap = () => {
      const ymaps = window.ymaps;

      ymaps.ready(() => {
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new ymaps.Map(mapContainerRef.current, {
            center: position,
            zoom: 12,
          });

          const placemark = new ymaps.Placemark(position, {
            balloonContent: "Your Location",
          });
          mapInstanceRef.current.geoObjects.add(placemark);
        } else {
          mapInstanceRef.current.setCenter(position);
        }
      });
    };

    if (window.ymaps) {
      initializeMap();
    } else {
      script.onload = initializeMap;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null; // Clean up reference
      }
    };
  }, [position]);

  return (
    <div ref={mapContainerRef} style={{ height: "380px", width: "100%" }} />
  );
}

export default MapComponent;

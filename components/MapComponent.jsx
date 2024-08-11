// components/MapComponent.js
import { useEffect, useRef } from "react";

const YANDEX_API_KEY = "dd3d8e42-b837-42e6-8f97-5dab7d542d03"; // Your Yandex Maps API key

function MapComponent({ position, onPositionChange }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      if (!mapInstanceRef.current) {
        // Load Yandex Maps script
        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.com/2.1/?apikey=${YANDEX_API_KEY}&lang=en_US`;
        script.async = true;
        script.onload = () => {
          const ymaps = window.ymaps;

          ymaps.ready(() => {
            mapInstanceRef.current = new ymaps.Map(mapContainerRef.current, {
              center: position,
              zoom: 12,
            });

            const placemark = new ymaps.Placemark(position, {
              balloonContent: "Your Location",
            });

            mapInstanceRef.current.geoObjects.add(placemark);

            // Add search control
            const searchControl = new ymaps.SearchControl({
              provider: "yandex#search",
              options: {
                noPlacemark: true,
              },
            });
            mapInstanceRef.current.controls.add(searchControl);

            // Event handler for search results
            searchControl.events.add("resultselect", (e) => {
              const index = e.get("index");
              searchControl.getResultsArray().then((results) => {
                const result = results[index];
                const coords = result.geometry.getCoordinates();
                onPositionChange(coords);
                mapInstanceRef.current.setCenter(coords);
                mapInstanceRef.current.geoObjects.removeAll();
                mapInstanceRef.current.geoObjects.add(
                  new ymaps.Placemark(coords, {
                    balloonContent: "Search Result",
                  })
                );
              });
            });
          });
        };

        document.head.appendChild(script);
      } else {
        // Update map position if already initialized
        mapInstanceRef.current.setCenter(position);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy(); // Clean up map instance
      }
    };
  }, [position, onPositionChange]);

  return (
    <div ref={mapContainerRef} style={{ height: "380px", width: "100%" }} />
  );
}

export default MapComponent;

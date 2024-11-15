import axios from "axios";

export const getGeoCodeAddressList = async (
  geocoder,
  lat = null,
  lng = null
) => {
  try {
    const params = {
      format: "json",
      apikey: "a2617277-0573-40b0-a017-85d5da6270eb",
      geocode: geocoder,
      sco: "latlong",
      lang: "ru-RU",
      results: 5,
      spn: "6.5,6.5",
      rspn: 1,
    };

    if (lat && lng) {
      params.geocode = `${lng},${lat}`;
    }

    const response = await axios.get("https://geocode-maps.yandex.ru/1.x/", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching geocode data:", error);
    throw error;
  }
};

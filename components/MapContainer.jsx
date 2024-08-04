// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';

// // Leaflet ikonalarni sozlash
// const DefaultIcon = L.icon({
//   iconUrl: '/leaflet/marker-icon.png', // Ensure these paths are correct
//   iconRetinaUrl: '/leaflet/marker-icon-2x.png',
//   shadowUrl: '/leaflet/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// const MapComponent = ({ latitude, longitude }) => {
//   return (
//     <MapContainer center={[latitude, longitude]} zoom={13} style={{ width: '100%', height: '280px' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[latitude, longitude]}>
//         <Popup>
//           <span>Location: {latitude}, {longitude}</span>
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default MapComponent;

import React from "react";

const MapContainer = () => {
  return <div>MapContainer</div>;
};

export default MapContainer;

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const Map = ({ projects }) => {
//   return (
//     <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "400px", width: "100%" }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {projects.map((proj, index) => (
//         proj.coordinates && (
//           <Marker key={index} position={[proj.coordinates.latitude, proj.coordinates.longitude]}>
//             <Popup>
//               <b>{proj.name}</b>
//               <p>{proj.price}</p>
//               <p>{proj.builder}</p>
//             </Popup>
//           </Marker>
//         )
//       ))}
//     </MapContainer>
//   );
// };

// export default Map;

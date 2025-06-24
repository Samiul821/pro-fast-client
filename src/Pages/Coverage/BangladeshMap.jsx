// BangladeshMap.jsx

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Default center position of Bangladesh
const defaultPosition = [23.685, 90.3563];

// Optional custom icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Component to fly to a district
function FlyToDistrict({ coords }) {
  const map = useMap();

  if (coords) {
    map.flyTo(coords, 14, { duration: 1.5 });
  }

  return null;
}

// Main BangladeshMap component
const BangladeshMap = ({ branches, activeCoords, activeDistrict }) => {
  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg relative">

      <MapContainer
        center={defaultPosition}
        zoom={8}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Auto-move to district if searched */}
        <FlyToDistrict coords={activeCoords} />

        {/* Show all district markers */}
        {branches.map((branch, index) => (
          <Marker
            key={index}
            position={[branch.latitude, branch.longitude]}
            icon={customIcon}
          >
            <Popup autoOpen={branch.district === activeDistrict}>
              <strong>{branch.district}</strong>
              <br />
              {branch.covered_area?.join(", ") || "No area info"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;

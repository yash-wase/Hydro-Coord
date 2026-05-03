import { MapContainer, TileLayer } from "react-leaflet";
import SectorLayer from "./SectorLayer";
import "leaflet/dist/leaflet.css";
import "./LeafletMap.css";

export default function LeafletMap({ onSectorClick, pressureData }) {
  return (
    <MapContainer
      center={[19.2, 75.8]}
      zoom={6}
      className="leaflet-map"
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <SectorLayer onSectorClick={onSectorClick} pressureData={pressureData} />
    </MapContainer>
  );
}

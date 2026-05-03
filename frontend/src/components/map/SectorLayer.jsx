import { GeoJSON, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import geojson from "../../data/sectors.json";

function getColor(p) {
  if (p < 30) return "#EF4444";
  if (p < 70) return "#F59E0B";
  return "#22C55E";
}

function centroid(coords) {
  const pts = coords[0];
  let x = 0, y = 0;
  pts.forEach(([lng, lat]) => { x += lng; y += lat; });
  return [y / pts.length, x / pts.length];
}

export default function SectorLayer({ pressureData = {}, onSectorClick }) {
  const geoJsonRef = useRef(null);
  const labelsRef = useRef([]);
  const map = useMap();

  // Re-style polygons when pressure updates
  useEffect(() => {
    if (!geoJsonRef.current) return;
    geoJsonRef.current.eachLayer((layer) => {
      const id = layer.feature.properties.id;
      const p = pressureData[id]?.pressure ?? 50;
      layer.setStyle({
        fillColor: getColor(p),
        weight: 1.5,
        color: "#475569",
        fillOpacity: 0.60,
      });
    });
  }, [pressureData]);

  // Render / update pressure labels
  useEffect(() => {
    labelsRef.current.forEach((m) => m.remove());
    labelsRef.current = [];

    geojson.features.forEach((feature) => {
      const id = feature.properties.id;
      const p = pressureData[id]?.pressure;
      const label = p !== undefined ? `${p}` : '–';
      const color = p !== undefined ? getColor(p) : '#64748B';
      const [lat, lng] = centroid(feature.geometry.coordinates);

      const icon = L.divIcon({
        className: '',
        html: `<div style="background:rgba(255,255,255,0.95);border:2px solid ${color};border-radius:6px;padding:3px 7px;font-size:11px;font-weight:700;color:#0F172A;font-family:Inter,sans-serif;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.22);line-height:1.4;text-align:center;pointer-events:none;"><div style="font-size:9px;font-weight:600;color:#475569;letter-spacing:0.04em;margin-bottom:1px">${feature.properties.name.split('–')[1]?.trim() || id}</div><span style="color:#0F172A;font-weight:800">${label} PSI</span></div>`,
        iconAnchor: [32, 20],
      });

      const marker = L.marker([lat, lng], { icon, interactive: false });
      marker.addTo(map);
      labelsRef.current.push(marker);
    });

    return () => {
      labelsRef.current.forEach((m) => m.remove());
      labelsRef.current = [];
    };
  }, [pressureData, map]);

  return (
    <GeoJSON
      ref={geoJsonRef}
      data={geojson}
      style={(feature) => {
        const id = feature.properties.id;
        const p = pressureData[id]?.pressure ?? 50;
        return {
          fillColor: getColor(p),
          weight: 1.5,
          color: "#475569",
          fillOpacity: 0.60,
        };
      }}
      onEachFeature={(feature, layer) => {
        const id = feature.properties.id;

        layer.on("mouseover", () => {
          const p = pressureData[id]?.pressure ?? "N/A";
          const alert = pressureData[id]?.alert;
          layer.bindTooltip(
            `<strong>${feature.properties.name}</strong><br/>Pressure: ${p} PSI${alert ? `<br/><span style="color:#EF4444">⚠ ${alert}</span>` : ""}`,
            { sticky: true }
          ).openTooltip();
          layer.setStyle({ weight: 2.5, color: "#2563EB" });
        });

        layer.on("mouseout", () => {
          layer.closeTooltip();
          const p = pressureData[id]?.pressure ?? 50;
          layer.setStyle({ weight: 1.5, color: "#475569", fillColor: getColor(p) });
        });

        layer.on("click", () => {
          if (onSectorClick) {
            onSectorClick({ id, ...feature.properties, ...(pressureData[id] || {}) });
          }
        });
      }}
    />
  );
}

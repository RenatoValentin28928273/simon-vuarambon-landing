import { useEffect, useRef } from "react";
import * as L from "leaflet";

// Coordinates for each city
const COORDS: Record<string, [number, number]> = {
  "Buenos Aires": [-34.6037, -58.3816],
  "São Paulo":    [-23.5505, -46.6333],
  "Bogotá":       [4.7110,  -74.0721],
  "Berlin":       [52.5200,  13.4050],
  "London":       [51.5074,  -0.1278],
  "Ibiza":        [38.9067,   1.4206],
  "Córdoba":      [-31.4201, -64.1888],
};

const PIN_HTML = `
  <div style="position:relative;width:18px;height:18px;display:flex;align-items:center;justify-content:center;">
    <div style="
      position:absolute;
      width:18px;height:18px;
      border-radius:50%;
      border:1px solid rgba(255,255,255,0.35);
      animation:tourPulse 2.2s ease-out infinite;
    "></div>
    <div style="
      position:absolute;
      width:30px;height:30px;
      border-radius:50%;
      border:1px solid rgba(255,255,255,0.12);
      animation:tourPulse 2.2s ease-out 0.4s infinite;
    "></div>
    <div style="
      width:8px;height:8px;
      background:white;
      border-radius:50%;
      box-shadow:0 0 8px rgba(255,255,255,0.6);
    "></div>
  </div>
`;

const TourMap = ({ city }: { city: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef      = useRef<L.Map | null>(null);
  const markerRef   = useRef<L.Marker | null>(null);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const coords = COORDS[city] ?? [0, 0];

    const map = L.map(containerRef.current, {
      center: coords,
      zoom: 9,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    const icon = L.divIcon({
      className: "",
      html: PIN_HTML,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    markerRef.current = L.marker(coords, { icon }).addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pan + move marker when city changes
  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;
    const coords = COORDS[city] ?? [0, 0];
    mapRef.current.flyTo(coords, 9, { duration: 0.75, easeLinearity: 0.25 });
    markerRef.current.setLatLng(coords);
  }, [city]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-md overflow-hidden"
      style={{
        height: 200,
        // Blueprint style: grayscale → full invert → boost contrast
        filter: "grayscale(100%) invert(100%) contrast(140%) brightness(65%)",
        pointerEvents: "none",
      }}
    />
  );
};

export default TourMap;

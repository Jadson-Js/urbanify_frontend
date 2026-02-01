import React from "react";

import { ReportContext } from "../../../../context/reportContext";

import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";

import style from "./style.module.css";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import L from "leaflet";
import mediaOfChildrensForReports from "../../../../utils/mediaOfChildrensForReports";
import { useNavigate } from "react-router-dom";
import Search from "./search/Search";
import { reverseGeocode } from "../../../../utils/reverseGeocode";
import { takeScreenshot } from "../../../../services/takeScreenshot";

import ModalCreateReport from "../modal/ModalCreateReport";

const MapReports = ({ reports }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [createReportData, setCreateReportData] = React.useState({});
  const { setModalData } = React.useContext(ReportContext);
  const [coordinates, setCoordinates] = React.useState({});
  const [position] = React.useState([-2.5387, -44.2825]);
  const [bounds] = React.useState([
    [0, -42], // Sudoeste
    [-4, -46], // Nordeste
  ]);
  const mapRef = React.useRef(null);

  const navigate = useNavigate();

  const ClusterMarkers = ({ reports }) => {
    const map = useMap();

    React.useEffect(() => {
      const markers = L.markerClusterGroup();

      reports.forEach((report) => {
        const latitude = parseFloat(
          report.coordinates.latitude.replace(/['"]/g, ""),
        );
        const longitude = parseFloat(
          report.coordinates.longitude.replace(/['"]/g, ""),
        );

        const childrenLength = report.childrens.length;
        const childrenMedia = mediaOfChildrensForReports(reports);
        let colorMarker = ["#1e88e5", "#bbdefb"];
        if (childrenLength > childrenMedia / 2)
          colorMarker = ["#43a047", "#c8e6c9"];
        if (childrenLength > childrenMedia / 1.5)
          colorMarker = ["#fb8c00", "#ffe0b2"];
        if (childrenLength > childrenMedia / 0.6)
          colorMarker = ["#e53935", "##F5C2C3"];

        const marker = L.marker([latitude, longitude], {
          icon: L.divIcon({
            className: "font-xs c12 custom-marker",
            html: `<div class="marker-content" style="
              border: 3px solid ${colorMarker[1]};
              background-color: ${colorMarker[0]};
              border-radius: 50%;
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">${childrenLength}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          }),
        });

        marker.on("click", () => {
          setModalData(report);

          navigate(`/management`);
        });

        markers.addLayer(marker);
      });

      // Limpa os marcadores antigos antes de adicionar os novos
      map.eachLayer((layer) => {
        if (layer instanceof L.MarkerClusterGroup) {
          map.removeLayer(layer);
        }
      });

      map.addLayer(markers);

      return () => {
        map.removeLayer(markers);
      };
    }, [map, reports]);

    React.useEffect(() => {
      if (!coordinates.lat || !coordinates.lon) return;
      const { lat, lon } = coordinates;

      map.setView([lat, lon], 16, { animate: true, duration: 1.5 });
    }, [coordinates]);

    return null;
  };

  const ClickHandler = () => {
    const map = useMap(); // <-- pega a instância real do mapa Leaflet

    useMapEvents({
      contextmenu: async (e) => {
        const { lat, lng } = e.latlng;

        try {
          setModalOpen(true);
          const data = await reverseGeocode(lat, lng);
          const screenshot = await takeScreenshot(map);
          const file = new File([screenshot], "imagem.jpg", {
            type: "image/jpeg",
          });

          setCreateReportData({ ...data, file });
        } catch (error) {
          console.error("Erro ao gerar o screenshot:", error);
        }
      },
    });

    return null;
  };

  return (
    <div className={`${style.map__container}`} ref={mapRef}>
      <Search setCoordinates={setCoordinates} />

      <MapContainer
        className={`${style.map__display}`}
        center={position}
        zoom={14}
        scrollWheelZoom={true}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
          attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          crossOrigin="anonymous"
        />
        <ClusterMarkers reports={reports} />
        <ClickHandler />
      </MapContainer>

      {modalOpen && (
        <ModalCreateReport
          setModalOpen={setModalOpen}
          createReportData={createReportData}
        />
      )}
    </div>
  );
};

export default MapReports;

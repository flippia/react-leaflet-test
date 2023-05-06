import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";

const Map = (props) => {
  const { filterData: data } = props;

  return (
    <MapContainer
      center={[45.44868, -73.81669]}
      zoom={6}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "80%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {data &&
          data.map((datapoint, index) => {
            let customMarkerIcon = new Icon({
              iconUrl: require("../img/default.png"),
              iconSize: [38, 38],
            });

            if (datapoint["Risk Rating"] <= 0.5) {
              customMarkerIcon = new Icon({
                iconUrl: require("../img/default.png"),
                iconSize: [38, 38],
              });
            } else if (datapoint["Risk Rating"] <= 0.75) {
              customMarkerIcon = new Icon({
                iconUrl: require("../img/warning.png"),
                iconSize: [38, 38],
              });
            } else {
              customMarkerIcon = new Icon({
                iconUrl: require("../img/bad.png"),
                iconSize: [38, 38],
              });
            }

            return (
              <Marker
                position={[datapoint.Lat, datapoint.Long]}
                icon={customMarkerIcon}
                key={index}
              >
                <Popup>
                  {`Asset Name: ${datapoint["Asset Name"]}`}
                  <br />
                  {`Business Category: ${datapoint["Business Category"]}`}
                  <br />
                  {`Risk Rating: ${datapoint["Risk Rating"]}`}
                  <br />
                  {`Latitude: ${datapoint.Lat}`}
                  <br />
                  {`Longitude: ${datapoint.Long}`}
                </Popup>
                <Tooltip>
                  {datapoint["Asset Name"]}
                  <br />
                  {datapoint["Business Category"]}
                </Tooltip>
              </Marker>
            );
          })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;

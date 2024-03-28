import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import ShowPlaceData from "../dummy/show_place.json";

const dataPlace = ShowPlaceData;

const PlaceMap = () => {
  const { kakao } = window;

  return (
    <div>
      <Map
        center={{ lat: dataPlace.la, lng: dataPlace.lo }}
        style={{
          width: "900px",
          height: "500px",
          borderRadius: "20px",
          margin: "20px",
        }}
      >
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <MapMarker
          style={{ border: "tranparent" }}
          position={{ lat: dataPlace.la, lng: dataPlace.lo }}
        ></MapMarker>
      </Map>
    </div>
  );
};

export default PlaceMap;

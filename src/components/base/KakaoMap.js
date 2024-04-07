import React, { useEffect, useState } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { PongButton } from "../features/Ticketing/TicketingPayment";
import axios from "axios";

const PlaceMap = ({ mt10id }) => {
  const { kakao } = window;
  const [dataPlace, setDataPlace] = useState(null);

  // mt10id에 해당하는 장소 데이터 필터링
  const selectedPlace = dataPlace.find((place) => place.mt10id === mt10id);

  const sanitizedName = selectedPlace.fcltynm.replace(
    /[^\u3131-\u3163\uac00-\ud7a3()]/g,
    ""
  );

  const URL = "http://localhost:8080/viewall"; //공연 시설 URL로 수정 해야함

  useEffect(() => {
    fetchData();
  }, [mt10id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      const selectedData = response.data.find((item) => item.mt10id === mt10id);
      setDataPlace(selectedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Map
        center={{ lat: selectedPlace.la, lng: selectedPlace.lo }}
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
          position={{ lat: selectedPlace.la, lng: selectedPlace.lo }}
        ></MapMarker>
      </Map>
      <PongButton
        onClick={() => {
          window.open(
            `https://map.kakao.com/link/map/${sanitizedName},${selectedPlace.la},${selectedPlace.lo}`
          );
        }}
      >
        길 찾기
      </PongButton>
    </div>
  );
};

export default PlaceMap;

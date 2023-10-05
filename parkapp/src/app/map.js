"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);
  const [test, setTest] = useState(false);

  // load script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  });

  if (!isLoaded) return <div>Loading....</div>;

  // static lat and lng
  var center = { lat: 0, lng: 0 };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    setSelectedPlace(place);
    setSearchLngLat({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    setCurrentLocation(null);
  };
  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedPlace(null);
          setSearchLngLat(null);
          setCurrentLocation({ lat: latitude, lng: longitude });
          center = { lat: latitude, lng: longitude };
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <main className="  overflow-hidden ">
      <div className=" bg-white m-5 p-1 rounded-lg flex items-center justify-center ">
        <GoogleMap
          zoom={currentLocation || selectedPlace ? 18 : 12}
          center={currentLocation || searchLngLat || center}
          mapContainerClassName="map"
          mapContainerStyle={{
            width: "100%",
            height: "80vh",
            // margin: "auto",
            borderRadius: "10px",
            overflow: "hidden",
          }}
          options={{ mapId: "5488f286511c8b8b" }}
          onLoad={handleGetLocationClick}
        >
          <MarkerF
            position={currentLocation}
            icon={{
              //<img width="50" height="50" src="https://img.icons8.com/ios-filled/50/228BE6/map-pin.png" alt="map-pin"/>
              url: "https://img.icons8.com/ios-filled/50/22C3E6/user-location.png",
              // url: "https://giphy.com/embed/XDXAoqk0qOicLgOkMZ",
              anchor: new google.maps.Point(17, 46),

              scaledSize: new google.maps.Size(37, 37),
            }}
          />
          <MarkerF
            position={{
              lat: 43.266938877681334,
              lng: -79.959905856123541,
            }}
            icon={{
              //<img width="50" height="50" src="https://img.icons8.com/ios-filled/50/228BE6/map-pin.png" alt="map-pin"/>
              url: "https://img.icons8.com/ios-filled/50/228BE6/map-pin.png",
              // url: "https://giphy.com/embed/XDXAoqk0qOicLgOkMZ",
              anchor: new google.maps.Point(17, 46),

              scaledSize: new google.maps.Size(37, 37),
            }}
          />
        </GoogleMap>
      </div>
    </main>
  );
}

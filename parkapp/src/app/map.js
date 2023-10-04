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
  var center = { lat: 43.2590876, lng: -79.9785403 };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    setSelectedPlace(place);
    setSearchLngLat({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    setCurrentLocation(null);
  };

  // //   if (navigator.geolocation) {
  // //     navigator.geolocation.getCurrentPosition(
  // //       (position) => {
  // //         const { latitude, longitude } = position.coords;
  // //         setSelectedPlace(null);
  // //         setSearchLngLat(null);
  // //         setCurrentLocation({ lat: latitude, lng: longitude });
  // //         center = { lat: latitude, lng: longitude };
  // //       },
  // //       (error) => {
  // //         console.log(error);
  // //       }
  // //     );
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }

  return (
    <main className="overflow-hidden">
      <div className=" w-full h-full ">
        <GoogleMap
          zoom={currentLocation || selectedPlace ? 18 : 12}
          center={currentLocation || searchLngLat || center}
          mapContainerClassName="map"
          mapContainerStyle={{
            width: "100%",
            height: "700px",
            margin: "auto",
          }}
          //   onLoad={handleGetLocationClick}
        >
          <MarkerF position={currentLocation} />
        </GoogleMap>
      </div>
    </main>
  );
}

"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
export default function Home() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);

  // load script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  });
  console.log(process.env);

  if (!isLoaded) return <div>Loading....</div>;

  // static lat and lng
  var center = { lat: 43.2590758, lng: -79.9809648 };

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

  return (
    <main className="">
      <div className=" w-full h-full ">
        <GoogleMap
          zoom={currentLocation || selectedPlace ? 18 : 12}
          center={currentLocation || searchLngLat || center}
          mapContainerClassName="map"
          mapContainerStyle={{
            width: "100%",
            height: "1000px",
            margin: "auto",
          }}
        ></GoogleMap>
      </div>
    </main>
  );
}

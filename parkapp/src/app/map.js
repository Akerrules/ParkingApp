"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Decimal from "decimal.js";
import {
  GoogleMap,
  Marker,
  MarkerF,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);
  const [markers, setMarker] = useState(null);
  const [bikeRacks, setBikeRacks] = useState(null);
  const [bikePath, setBikePath] = useState(null);
  const [makerUi, seMarkerUI] = useState(false);
  const [path, setPath] = useState([
    { lat: 43.222508605467127, lng: -79.916662440761016 }, // Example starting point
    { lat: 43.222474629272796, lng: -79.916677664180142 }, // Example ending point
  ]);
  // load script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  });

  const fetchData = async () => {
    try {
      const response = await fetch("/api/parking_meter");
      const data = await response.json();
      setMarker(data);
      // console.log(markers.keys());
      console.log("Testing");
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  const fetchData_bikeRack = async () => {
    try {
      const response = await fetch("/api/bike_rack");
      const data = await response.json();
      setBikeRacks(data);
      // console.log(markers.keys());
      console.log("bike)rack");
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  const fetchData_bikePath = async () => {
    try {
      const response = await fetch("/api/bike_path");
      const data = await response.json();
      setBikePath(data);
      // console.log(markers.keys());
      console.log("bike path ");
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchData_bikeRack();
    fetchData_bikePath();
  }, []);

  useEffect(() => {
    if (bikePath) console.log(bikePath[0].geometry.coordinates[0][1]);
  }, [bikePath]);

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
          console.log("test");
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const setMakerUiF = () => {
    seMarkerUI(!makerUi);
  };
  return (
    <main className=" overflow-hidden   ">
      <div className=" bg-white flex items-center justify-center">
        <GoogleMap
          zoom={currentLocation || selectedPlace ? 18 : 12}
          center={currentLocation || searchLngLat || center}
          mapContainerClassName="map"
          mapContainerStyle={{
            width: "100%",
            height: "100vh",
            // margin: "auto",
            borderRadius: "10px",
            overflow: "hidden",
            mapTypeControl: false,
          }}
          options={{ mapId: "5488f286511c8b8b", disableDefaultUI: true }}
          onLoad={handleGetLocationClick}
        >
          <MarkerF
            position={currentLocation}
            icon={{
              //<img width="50" height="50" src="https://img.icons8.com/ios-filled/50/228BE6/map-pin.png" alt="map-pin"/>
              url: "https://img.icons8.com/ios-filled/50/FA5252/visit.png",
              // url: "https://giphy.com/embed/XDXAoqk0qOicLgOkMZ",
              anchor: new google.maps.Point(17, 46),

              scaledSize: new google.maps.Size(37, 37),
            }}
          />

          {/* {markers &&
            Object.keys(markers).map((key, index) => (
              <MarkerF
                position={{
                  lat: markers[key].geometry.coordinates[1],
                  lng: markers[key].geometry.coordinates[0],
                }}
                icon={{
                  //<img width="50" height="50" src="https://img.icons8.com/ios-filled/50/228BE6/map-pin.png" alt="map-pin"/>
                  url: "https://img.icons8.com/ios/50/228BE6/parking.png",
                  // url: "https://giphy.com/embed/XDXAoqk0qOicLgOkMZ",
                  anchor: new google.maps.Point(17, 46),

                  scaledSize: new google.maps.Size(37, 37),
                }}
              />
            ))}
          {bikeRacks &&
            Object.keys(bikeRacks).map((key, index) => (
              <MarkerF
                position={{
                  lat: bikeRacks[key].geometry.coordinates[1],
                  lng: bikeRacks[key].geometry.coordinates[0],
                }}
                icon={{
                  //<img width="50" height="50" src="https://img.icons8.com/ios-filled/50/228BE6/map-pin.png" alt="map-pin"/>
                  url: "https://img.icons8.com/material-sharp/24/40C057/bicycle.png",
                  // url: "https://giphy.com/embed/XDXAoqk0qOicLgOkMZ",
                  anchor: new google.maps.Point(17, 46),

                  scaledSize: new google.maps.Size(37, 37),
                }}
                onClick={setMakerUiF}
              />
            ))} */}
          <Polyline path={path} options={{ strokeColor: "#FF0000" }} />
          {bikePath &&
            Object.keys(bikePath).map((key, index) => (
              <Polyline
                path={bikePath[key].geometry.coordinates.map((coord) => ({
                  lat: coord[1],
                  lng: coord[0],
                }))}
                options={{ strokeColor: "#FF0000" }}
              />
            ))}
        </GoogleMap>
        {makerUi && (
          <div
            id="defaultModal"
            tabindex="-1"
            aria-hidden="true"
            class="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative w-full max-w-2xl max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Terms of Service
                  </h3>
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="defaultModal"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div class="p-6 space-y-6">
                  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union
                    enacts new consumer privacy laws for its citizens, companies
                    around the world are updating their terms of service
                    agreements to comply.
                  </p>
                  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation
                    (G.D.P.R.) goes into effect on May 25 and is meant to ensure
                    a common set of data rights in the European Union. It
                    requires organizations to notify users as soon as possible
                    of high-risk data breaches that could personally affect
                    them.
                  </p>
                </div>
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={setMakerUiF}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

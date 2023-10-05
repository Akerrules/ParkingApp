"use client";
import Image from "next/image";
import Map from "./map";
import { useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { validateConfig } from "next/dist/server/config-shared";
export default function Home() {
  const [radius, setRadius] = useState(0);
  return (
    <main className="bg-slate-600 min-h-screen overflow-hidden">
      <div className=" flex bg-white text-4xl text-black rounded-full m-5 shadow-xl p-1 justify-center">
        <a>
          <p>Hamilton Parking</p>
        </a>
      </div>
      <div className="flex justify-center items-center flex-col">
        <div className=" p-10 w-full">
          <form className="flex flex-row place-content-evenly">
            <label>
              <a className="p-10">Name:</a>
              <input type="text" name="name" />
            </label>
            <label
              for="default-range"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              <a className="p-10">Radius:</a>
              <input
                id="default-range"
                type="range"
                value={radius}
                class="w-96 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                onChange={(e) => setRadius(e.target.value)}
              />
            </label>
          </form>
        </div>
        <div className="w-full  overflow-hidden">
          <Map></Map>
        </div>
      </div>
    </main>
  );
}

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
export default function Home() {
  return (
    <main className="bg-slate-600 min-h-screen overflow-hidden">
      <div className=" flex bg-white text-6xl text-black rounded-full m-5 shadow-xl justify-center">
        <a>
          <p>Aker</p>
        </a>
      </div>
      <div className="flex justify-center items-center flex-col">
        <div className=" p-10 w-full">
          <form>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="w-full absolute inset-x-0 bottom-0">
          <Map></Map>
        </div>
      </div>
    </main>
  );
}

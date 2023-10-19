import { useState, useRef, useEffect } from "react";

export default function MarkerUi(parentToChild) {
  return (
    <main>
      <div>
        <div
          id="defaultModal"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50  p-4  overflow-y-auto overflow-x-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative max-w-sm max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Information
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-6 text-sm flex flex-col space-y-6">
                <div>
                  Location: {bikeRacks[markerUi].properties.LOCATION_NAME}
                </div>
                <div>
                  Capacity: {bikeRacks[markerUi].properties.TOTAL_CAPACITY}
                </div>
                <div>Rack type: {bikeRacks[markerUi].properties.RACK_TYPE}</div>
              </div>
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => hideMarkerUI()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

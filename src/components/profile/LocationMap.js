import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const LocationMap = ({ currentLocation }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markerIcon, setMarkerIcon] = useState(null);

  useEffect(() => {
    if (mapLoaded && window.google) {
      setMarkerIcon({
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9333ea">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 40)
      });
    }
  }, [mapLoaded]);

  if (!currentLocation) {
    return (
      <div className="text-center text-gray-400 p-4 bg-gray-800 rounded-lg">
        Location data not available
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-purple-400 mb-6 pd-18">CURRENT LOCATION</h2>
      <LoadScript 
        googleMapsApiKey="AIzaSyAflAB_4f4BOkyqyx9wRFeDs8FuTe1PrDk"
        onLoad={() => setMapLoaded(true)}
      >
        <GoogleMap
          mapContainerStyle={{ 
            height: "400px", 
            width: "100%", 
            borderRadius: "8px" 
          }}
          center={currentLocation}
          zoom={18}
        >
          {markerIcon && (
            <Marker 
              position={currentLocation}
              title="Your Exact Location"
              icon={markerIcon}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LocationMap;
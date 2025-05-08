import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import { Props } from "@root/host/src/types/Map.type";
import homeIcon from "@root/assets/Images/icons/home.svg";

const MAP_API_KEY = process.env.NEXT_PUBLIC_MAP_SECRET;

const defaultCenter = { lat: 37.09024, lng: -95.712891 }; // Center of the USA
const defaultZoom = 4;

const CustomMap = (props: Props): JSX.Element | null => {
  const { centers, isPPC, selectedStore } = props;
  const [mapCenters, setMapCenters] = useState(centers);
  const mapRef = useRef<any>(null);
  const [updateMarker, setUpdateMarker] = useState(false);
  const [centerPoint, setCenterPoint] = useState({
    zoom: defaultZoom,
    center: defaultCenter,
  });

  useEffect(() => {
    if (isPPC) {
      if (selectedStore) {
        setCenterPoint({
          zoom: 20,
          center: { lat: selectedStore.Latitude, lng: selectedStore.Longitude },
        });
      } else {
        updateCenter();
        setTimeout(() => {
          updateZoom();
        }, 100);
      }
    }
  }, [props.selectedStore]);

  useEffect(() => {
    updateZoom();
  }, [mapCenters, updateMarker]);

  const updateZoom = () => {
    if (isPPC && mapRef.current && mapCenters.length > 1) {
      const bounds = new window.google.maps.LatLngBounds();
      mapCenters.forEach((marker) => {
        bounds.extend(
          new window.google.maps.LatLng(
            marker.coordinates.lat,
            marker.coordinates.lng
          )
        );
      });
      mapRef.current.fitBounds(bounds);
    }
  };

  const updateCenter = () => {
    setCenterPoint({
      zoom: mapCenters.length > 0 ? 8 : defaultZoom,
      center: mapCenters.length > 0 ? mapCenters[0].coordinates : defaultCenter,
    });
  };

  useEffect(() => {
    setMapCenters(centers);
  }, [centers]);
  useEffect(() => {
    updateCenter();
  }, [mapCenters]);

  const containerStyle: React.CSSProperties = {
    height: "100%",
    width: "100%",
  };

  if (!MAP_API_KEY) {
    return null;
  }

  const getPixelPositionOffset = (width: any, height: any) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  return (
    <LoadScript googleMapsApiKey={MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerPoint.center || defaultCenter}
        zoom={centerPoint.zoom || defaultZoom}
        onLoad={(map) => {
          setUpdateMarker(true);
          mapRef.current = map;
        }}
      >
        {mapCenters.map((location, index) => (
          <React.Fragment key={location.id}>
            <Marker
              position={location.coordinates}
              icon={location.showIcon ? { url: homeIcon } : undefined}
            />
            <OverlayView
              position={location.coordinates}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={getPixelPositionOffset}
            >
              {!location.showIcon ? (
                <div className="mapPinText">{location.name}</div>
              ) : (
                <></> /* Empty Fragment for home icon */
              )}
            </OverlayView>
          </React.Fragment>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default CustomMap;
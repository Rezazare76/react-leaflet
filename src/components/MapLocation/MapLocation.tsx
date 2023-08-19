import { useRef } from "react";
import { Marker, useMapEvent } from "react-leaflet";
import MapLocationProps from "../../interfaces/MapLocationProps";
import { Marker as LeafletMarker } from "leaflet";
import markerRed from "../../assets/images/thumbtack-solid-red.svg";
import markerGreen from "../../assets/images/thumbtack-solid-green.svg";
import L from "leaflet";
const MapLocation: React.FC<MapLocationProps> = ({
  selections,
  setSelections,
}) => {
  const originRef = useRef<LeafletMarker | null>(null);
  const destination = useRef<LeafletMarker | null>(null);
  // change marker icn
  const originIcon = new L.Icon({
    iconUrl: markerRed,
    iconSize: [50, 64],
  });
  const destinationIcon = new L.Icon({
    iconUrl: markerGreen,
    iconSize: [50, 64],
  });
  // event for add markers "only to marker"
  useMapEvent("click", (event) => {
    const { latlng } = event;

    if (!selections.origin?.[0]) {
      setSelections((prev) => ({ ...prev, origin: [latlng.lat, latlng.lng] }));
    } else if (!selections?.destination?.[0]) {
      setSelections((prev) => ({
        ...prev,
        destination: [latlng.lat, latlng.lng],
      }));
    }
  });

  // make marker draggable
  function dragend(markerId: string, event: L.DragEndEvent) {
    const latlng = event.target._latlng;
    if (markerId == "origin") {
      setSelections((prev) => ({ ...prev, origin: [latlng.lat, latlng.lng] }));
    } else if (markerId == "destination") {
      setSelections((prev) => ({
        ...prev,
        destination: [latlng.lat, latlng.lng],
      }));
    }
  }

  return (
    <>
      {selections?.origin?.[0] && (
        <Marker
          draggable={true}
          eventHandlers={{
            dragend: (event) => dragend("origin", event),
          }}
          position={{
            lat: selections.origin[0],
            lng: selections.origin[1],
          }}
          ref={originRef}
          key={"origin"}
          icon={originIcon}
        />
      )}
      {selections?.destination?.[0] && (
        <Marker
          draggable={true}
          eventHandlers={{
            dragend: (event) => dragend("destination", event),
          }}
          position={{
            lat: selections.destination[0],
            lng: selections.destination[1],
          }}
          ref={destination}
          key={"destination"}
          icon={destinationIcon}
        />
      )}
    </>
  );
};

export default MapLocation;

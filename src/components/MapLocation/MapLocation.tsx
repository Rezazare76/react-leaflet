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
  const originIcon = new L.Icon({
    iconUrl: markerRed,
    iconSize: [50, 64],
  });
  const destinationIcon = new L.Icon({
    iconUrl: markerGreen,
    iconSize: [50, 64],
  });
  // find current position
  // const map = useMapEvents({
  //   click() {
  //     map.locate();
  //   },
  //   locationfound(e) {
  //     setPosition(e.latlng);
  //     map.flyTo(e.latlng, map.getZoom());
  //   },
  // });

  useMapEvent("click", (event) => {
    const { latlng } = event;
    if (!selections?.origin) {
      setSelections((prev) => ({ ...prev, origin: latlng }));
    } else if (!selections?.destination) {
      setSelections((prev) => ({
        ...prev,
        destination: latlng,
      }));
    }
  });

  function dragend(markerId: string, target: L.LeafletEvent) {
    const { _latlng } = target;

    if (markerId == "origin") {
      setSelections((prev) => ({ ...prev, origin: _latlng }));
    } else if (markerId == "destination") {
      setSelections((prev) => ({ ...prev, destination: _latlng }));
    }
  }

  return (
    <>
      {selections?.origin && (
        <Marker
          draggable={true}
          eventHandlers={{
            dragend: ({ target }) => dragend("origin", target),
          }}
          position={selections.origin}
          ref={originRef}
          key={"origin"}
          icon={originIcon}
        />
      )}
      {selections?.destination && (
        <Marker
          draggable={true}
          eventHandlers={{
            dragend: ({ target }) => dragend("destination", target),
          }}
          position={selections.destination}
          ref={destination}
          key={"destination"}
          icon={destinationIcon}
        />
      )}
    </>
  );
};

export default MapLocation;

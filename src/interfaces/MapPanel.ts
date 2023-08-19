import { ReactNode } from "react";
import { LatLngExpression } from "leaflet";

export default interface MapPanelProps {
  children: ReactNode;
  selections: {
    origin?: LatLngExpression;
    destination?: LatLngExpression;
  };
  vehicleType?: number;
  sendRequest: () => void;
}

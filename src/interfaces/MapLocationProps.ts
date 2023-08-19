import { LatLngExpression } from "leaflet";
export default interface MapLocationProps {
  selections: {
    origin?: LatLngExpression;
    destination?: LatLngExpression;
  };
  setSelections: React.Dispatch<
    React.SetStateAction<{
      origin?: LatLngExpression;
      destination?: LatLngExpression;
    }>
  >;
}

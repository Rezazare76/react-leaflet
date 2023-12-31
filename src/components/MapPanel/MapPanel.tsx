import locationIconGreen from "../../assets/images/location-dot-green.svg";
import locationIconRed from "../../assets/images/location-dot-red.svg";
import MapPanelProps from "../../interfaces/MapPanel";
import "./MapPanel.scss";
const MapPanel: React.FC<MapPanelProps> = ({
  children,
  selections,
  vehicleType,
  sendRequest,
  isLoading,
}) => {
  const state =
    selections.origin?.[0] && selections.destination?.[0] && vehicleType;
  return (
    <section className="map-panel bg-secondary position-fixed p-2 d-flex  flex-column rounded-3-top">
      <span className="d-flex align-items-center text-danger">
        <img src={locationIconRed} alt="location-icon" width="50px" />
        مبدأ :{" "}
        {selections.origin?.[0]
          ? `${selections.origin[0]}, ${selections.origin[0]}`
          : ""}
      </span>

      <span className="d-flex align-items-center text-success ">
        <img src={locationIconGreen} alt="location-icon" width="50px" />
        مقصد :{" "}
        {selections.destination?.[0]
          ? `${selections.destination[0]}, ${selections.destination[0]}`
          : ""}
      </span>
      {children}
      <button
        className={`rounded-3 p-1  ${
          state ? "bg-warning cursor-pointer" : " bg-gray cursor-none-drop"
        }`}
        onClick={state ? sendRequest : () => {}}
      >
        {isLoading ? "درحال ثبت درخواست..." : "ثبت درخواست"}
      </button>
    </section>
  );
};
export default MapPanel;

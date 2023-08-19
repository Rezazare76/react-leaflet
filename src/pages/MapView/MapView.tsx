import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import MapLocation from "../../components/MapLocation/MapLocation";
import MapPanel from "../../components/MapPanel/MapPanel";
import Search from "../../components/Search/Search";
import Alert from "../../components/Alert/Alert";
const MapView = () => {
  const [selections, setSelections] = useState({});
  const [vehicleType, setVehicleType] = useState<number | undefined>();
  const [alert, setAlert] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // bc i don't have access to  the server for set time out for token this way is simple i used
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);
  const sendRequest = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://exam.pishgamanasia.com/webapi/Request/SendRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userToken: JSON.parse(localStorage.getItem("token") || "")?.token,
            vehicleUserTypeId: vehicleType,
            source: `${selections.origin.lat}, ${selections.origin.lng}`,
            destination: `${selections.destination.lat}, ${selections.destination.lng}`,
          }),
        }
      ).then((response) => response.json());
      if (response.status) {
        setSelections({});
        setVehicleType(undefined);
        setAlert("انجام شد");
        setTimeout(() => {
          setAlert("");
        }, 2000);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <MapContainer
        center={[35.42444789279202, 411.15628335442864]}
        zoom={13}
        scrollWheelZoom={true}
        className="map-view w-100 h-100"
        style={{ zIndex: 1 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapLocation
          // positions={[51.505, -0.09]}
          selections={selections}
          setSelections={setSelections}
        />
      </MapContainer>
      <MapPanel
        selections={selections}
        vehicleType={vehicleType}
        sendRequest={sendRequest}
        isLoading={isLoading}
      >
        <Search setVehicleType={setVehicleType} />
      </MapPanel>
      <Alert message={alert} success={true} />
    </>
  );
};

export default MapView;

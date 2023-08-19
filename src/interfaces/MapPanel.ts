import { ReactNode } from "react";

export default interface MapPanelProps {
  children: ReactNode;
  selections: {
    origin?: number[];
    destination?: number[];
  };
  vehicleType?: number;
  sendRequest: () => void;
  isLoading?: boolean;
}

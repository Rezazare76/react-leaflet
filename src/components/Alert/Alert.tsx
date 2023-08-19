import { memo } from "react";
import AlertProps from "../../interfaces/AlertProps";
import "./Alert.scss";
const Alert: React.FC<AlertProps> = ({ message, success }) => {
  return (
    <span
      className={`alert p-2 text-center position-fixed transition bg-primary text-secondary rounded-1-right ${
        message && "true"
      } ${success && "success"}`}
    >
      {message}
    </span>
  );
};

export default memo(Alert);

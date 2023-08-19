import { useNavigate } from "react-router-dom";
import gifImage from "../../assets/gif/404-Error.gif";
import "./NotFound.scss";
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="not-found d-flex bg-secondary align-items-center justify-content-center h-100">
      <div className="position-relative ">
        <img src={gifImage} alt="Animated GIF" width="400px" />
        <div
          className="back-to-login position-absolute bg-tertiary text-secondary rounded-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Login
        </div>
      </div>
    </section>
  );
};

export default NotFound;

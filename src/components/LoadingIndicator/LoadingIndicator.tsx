import "./LoadingIndicator.scss";
import logo from "../../assets/logo.svg";

function LoadingIndicator(): React.ReactElement {
  return (
    <div className="wrapper">
      <img src={logo} alt="eco₂rd" className="loading rotate" />
      <span className="text">Loading..</span>
    </div>
  );
}

export default LoadingIndicator;

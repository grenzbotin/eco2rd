import logo from "assets/logo.svg";
import "./LoadingIndicator.scss";

function LoadingIndicator(): React.ReactElement {
  return (
    <div className="wrapper">
      <img src={logo} alt="eco₂rd" className="loading rotate" />
      <span className="text">Loading..</span>
    </div>
  );
}

export default LoadingIndicator;

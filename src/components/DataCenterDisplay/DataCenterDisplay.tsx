import Logo from "components/Logo";

import {
  DATA_CENTER_GREEN,
  DATA_CENTER_RED,
  DATA_CENTER_UNKNOWN,
} from "config/datacenterTypes";

import "./DataCenterDisplay.style.scss";

const DataCenterDisplay = ({
  status,
  variant = "large",
  timestamp,
}: {
  status: boolean;
  variant?: string;
  timestamp: Date;
}): React.ReactElement => {
  const typeInformation = {
    [+true]: DATA_CENTER_UNKNOWN,
    [+(status === true)]: DATA_CENTER_GREEN,
    [+(status === false)]: DATA_CENTER_RED,
  }[1];

  const renderedText = {
    [+true]: typeInformation.shortText,
    [+(variant === "large")]: typeInformation.text,
  }[1];

  return (
    <div className={`datacenter ${variant}`}>
      <Logo type={typeInformation.icon} width={30} height={30} />
      <div>
        <b>{renderedText}</b>
        <span>
          (last updated:{" "}
          {timestamp ? new Date(timestamp).toLocaleDateString() : "unknown"})
        </span>
      </div>
    </div>
  );
};

export default DataCenterDisplay;

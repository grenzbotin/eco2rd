import Logo from "components/Logo";

import { getDataCenterType } from "./helpers";
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
  const typeInformation = getDataCenterType(status);

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

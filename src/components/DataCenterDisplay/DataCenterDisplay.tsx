import Logo from "../Logo";
import { getDataCenterType } from "../Results/helpers";
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
        <span>(last updated: {new Date(timestamp).toLocaleDateString()})</span>
      </div>
    </div>
  );
};

export default DataCenterDisplay;

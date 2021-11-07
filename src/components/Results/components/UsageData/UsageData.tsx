import consumptionTypes from "../../consumptionTypes";

import "./UsageData.style.scss";

function UsageData({
  type,
  value,
}: {
  type: string;
  value: number | string;
}): React.ReactElement {
  return (
    <>
      <div className="avatar">
        <figure className="avatar-image">
          <img
            alt={consumptionTypes[type].alt}
            src={consumptionTypes[type].image}
          />
        </figure>
      </div>
      <div>
        <span className="category-label">{consumptionTypes[type].title}</span>{" "}
        <br />
        <span className="category-number">
          {value} {consumptionTypes[type].unit}
        </span>
      </div>
    </>
  );
}

export default UsageData;

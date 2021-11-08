import { useState, KeyboardEvent, ReactNode } from "react";
import { Button, Columns } from "react-bulma-components";

import consumptionTypes from "config/consumptionTypes";
import "./UsageData.style.scss";

function UsageItem({
  type,
  value,
  onSelect,
  selected,
}: {
  type: string;
  value: number | string;
  onSelect: (value: string) => void;
  selected: boolean;
}): React.ReactElement {
  const consumptionType = consumptionTypes[type];

  return (
    <>
      <div
        className={`usagedata-wrapper ${selected && "selected"}`}
        tabIndex={0}
        role="button"
        onClick={() => onSelect(type)}
        onKeyUp={(e: KeyboardEvent<HTMLDivElement>) =>
          (e.key === "Enter" || e.key === " ") && onSelect(type)
        }
      >
        <div className="avatar">
          <figure className="avatar-image">
            <img alt={consumptionType.alt} src={consumptionType.image} />
          </figure>
        </div>
        <div>
          <span className="category-label">{consumptionType.title}</span> <br />
          <span className="category-number">
            {consumptionType.convert(value)}
          </span>
        </div>
      </div>
    </>
  );
}

function UsageData({
  co2,
  bytes,
  kwhTotal,
}: {
  co2: number;
  bytes: number;
  kwhTotal: number;
}): React.ReactElement {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const handleSelect = (type: string) => {
    if (selected === type) {
      setSelected(undefined);
    } else {
      setSelected(type);
    }
  };

  const CONSUMPTION_TYPES = {
    co2: co2,
    download: bytes,
    electricity: kwhTotal,
  };

  return (
    <div className="wrapper">
      <Columns breakpoint="mobile" className="column-wrapper">
        {Object.keys(CONSUMPTION_TYPES).map((item) => (
          <Columns.Column key={item} size="one-third">
            <UsageItem
              type={item}
              value={CONSUMPTION_TYPES[item]}
              selected={selected === item}
              onSelect={handleSelect}
            />
          </Columns.Column>
        ))}
      </Columns>
      <div className="extended-wrapper">
        {selected && (
          <div className="content-wrapper">
            <div className="btn-close">
              <Button
                aria-label="close settings"
                size="small"
                onClick={() => setSelected(undefined)}
              >
                <span className="icon-close" />
              </Button>
            </div>
            <p className="category-label">
              With{" "}
              <span className="category-number">
                {consumptionTypes[selected].convert(
                  CONSUMPTION_TYPES[selected]
                )}
              </span>
              ..
            </p>
            {consumptionTypes[selected].equivalents.map(
              (item: {
                key: string;
                image: string;
                alt: string;
                convert: (value: number) => ReactNode;
              }) => (
                <div className="consumptionType-item" key={item.key}>
                  <div className="avatar">
                    <figure className="avatar-image">
                      <img alt={item.alt} src={item.image} />
                    </figure>
                  </div>
                  <div>
                    <span className="category-label">
                      {item.convert(CONSUMPTION_TYPES[selected])}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UsageData;

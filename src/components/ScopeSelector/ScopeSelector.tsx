import React, { KeyboardEvent } from "react";
import { Tabs } from "react-bulma-components";

import { SCOPES } from "config/constants";
import { useUserSettings } from "context/userContext";

function ScopeSelector(): React.ReactElement {
  const {
    settings: { scope },
    setSettingsPerKey,
  } = useUserSettings();

  const handleChange = (value: string) => {
    setSettingsPerKey("scope", value);
  };

  return (
    <Tabs align="right" size="small" type="toggle">
      {SCOPES.map((content) => (
        <Tabs.Tab
          key={content.name}
          active={content.value === scope}
          tabIndex={0}
          onClick={() => handleChange(content.value)}
          onKeyUp={(e: KeyboardEvent<HTMLAnchorElement>) =>
            (e.key === "Enter" || e.key === " ") && handleChange(content.value)
          }
        >
          {content.name}
        </Tabs.Tab>
      ))}
    </Tabs>
  );
}

export default ScopeSelector;

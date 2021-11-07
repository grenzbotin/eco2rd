import React, { useState } from "react";
import { Box, Button, Form, Icon } from "react-bulma-components";

import regions from "config/regions";
import { useUserSettings } from "context/userContext";
import { KWH_MODIFIER_OPTIONS } from "config/energy";
import { useStats } from "hooks/useStats";

import { getRoughSizeOfObject, sortByKey } from "./helpers";
import { getConvertedBytes } from "../helpers";

import "./Options.style.scss";

const { Field, Control, Label, Select } = Form;

function Options(): React.ReactElement {
  const [showSetting, setShowSetting] = useState(false);
  const { settings, setSettingsPerKey } = useUserSettings();
  const { stats, deleteStats } = useStats();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: string
  ) => {
    setSettingsPerKey(key, e.target.value);
  };

  const handleDelete = () => deleteStats();

  const handleChangeRecording = () => {
    setSettingsPerKey("stoppedRecording", !settings.stoppedRecording);
  };

  return showSetting ? (
    <Box className="options-wrapper">
      <div className="btn-close">
        <Button
          aria-label="close settings"
          size="small"
          onClick={() => setShowSetting(false)}
        >
          <span className="icon-close" />
        </Button>
      </div>
      <Field>
        <Label size="small">Select your region</Label>
        <Control>
          <Select
            size="small"
            onChange={(e) => handleChange(e, "co2Region")}
            value={settings.co2Region}
          >
            {sortByKey(regions, "title").map((region) => (
              <option key={region.key} value={region.key}>
                {region.title}
              </option>
            ))}
          </Select>
          <Icon align="left" size="small" color="grey-light">
            <span className="icon-earth" />
          </Icon>
        </Control>
      </Field>
      <Field>
        <Label size="small">Select your kWh Modifier</Label>
        <Control>
          <Select
            size="small"
            onChange={(e) => handleChange(e, "kwhModifier")}
            value={settings.kwhModifier}
          >
            {KWH_MODIFIER_OPTIONS.map((modifier) => (
              <option key={modifier.key} value={modifier.key}>
                {modifier.name}
              </option>
            ))}
          </Select>
          <Icon align="left" size="small" color="grey-light">
            <span className="icon-flash" />
          </Icon>
        </Control>
      </Field>
      <Button.Group>
        <Button size="small" onClick={handleChangeRecording}>
          <span
            className={`button-icon ${
              settings.stoppedRecording
                ? "icon-play-circle-o"
                : "icon-pause-circle-o"
            }`}
          />
          {settings.stoppedRecording ? "Start" : "Pause"} recording
        </Button>
        <Button size="small" onClick={handleDelete}>
          <span className="button-icon icon-trash-o" />
          Delete consumption data ( ~
          {getConvertedBytes(getRoughSizeOfObject(stats))})
        </Button>
      </Button.Group>
    </Box>
  ) : (
    <div className="btn-open">
      <Button
        aria-label="open settings"
        size="small"
        onClick={() => setShowSetting(true)}
      >
        <span className="icon-gears" />
      </Button>
    </div>
  );
}

export default Options;

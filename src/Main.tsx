import React from "react";

import Options from "./components/Options";
import Result from "./components/Results";
import ScopeSelector from "./components/ScopeSelector";
import { useUserSettings } from "./context/userContext";
import LottieIllustration from "./components/LottieIllustration";
import LoadingIndicator from "./components/LoadingIndicator";
import { RouteProvider } from "./context/routeContext";

function MainContentSwitch(): React.ReactElement {
  const {
    settings: { stoppedRecording },
  } = useUserSettings();

  const content = {
    true: <LottieIllustration type="sleeping" />,
    false: (
      <>
        <ScopeSelector />
        <RouteProvider>
          <Result />
        </RouteProvider>
      </>
    ),
  };

  return content[stoppedRecording.toString()];
}

function Main(): React.ReactElement {
  const { isLoading } = useUserSettings();

  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      <Options />
      <MainContentSwitch />
    </>
  );
}

export default Main;

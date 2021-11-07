import React from "react";

import Options from "components/Options";
import Result from "components/Results";
import ScopeSelector from "components/ScopeSelector";
import LottieIllustration from "components/LottieIllustration";
import LoadingIndicator from "components/LoadingIndicator";
import { RouteProvider } from "context/routeContext";
import { useUserSettings } from "context/userContext";

function MainContentSwitch(): React.ReactElement {
  const {
    settings: { stoppedRecording },
  } = useUserSettings();

  const content = {
    true: (
      <LottieIllustration
        height="281px"
        width="290px"
        type="sleeping"
        subtitle="eco₂rd is in pause mode"
      />
    ),
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

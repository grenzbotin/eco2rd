import React from "react";

import { RouteProvider } from "context/routeContext";
import { useUserSettings } from "context/userContext";
import Options from "components/Options";
import ScopeSelector from "components/ScopeSelector";
import LottieIllustration from "components/LottieIllustration";
import LoadingIndicator from "components/LoadingIndicator";
import Result from "container";

function MainContentSwitch(): React.ReactElement {
  const {
    settings: { stoppedRecording }
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
    )
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

import Lottie from "react-lottie-player/dist/LottiePlayerLight";

import sleeping from "assets/sleeping.json";
import waiting from "assets/waiting.json";
import "./LottieIllustration.style.scss";

const ANIMATIONS = {
  sleeping: sleeping,
  waiting: waiting,
};

interface LottieIllustrationProps {
  type: "sleeping" | "waiting";
  height?: string;
  width?: string;
  subtitle?: string;
}

function LottieIllustration({
  type,
  height,
  width,
  subtitle,
}: LottieIllustrationProps): React.ReactElement {
  return (
    <>
      <Lottie
        loop
        play
        animationData={ANIMATIONS[type]}
        className="lottie-animation"
        style={{ height, width }}
      />
      {subtitle && <p className="sub">{subtitle}</p>}
    </>
  );
}

export default LottieIllustration;

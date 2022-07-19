import { Portal } from "solid-js/web";
import { createSignal } from "solid-js";
import devTools from "devtools-detect";
import yarnImage from "openmoji/color/svg/1F9F6.svg?raw";
import githubImage from "openmoji/color/svg/E045.svg?raw";
import waveImage from "openmoji/color/svg/1F44B.svg?raw";
import linkedinImage from "openmoji/color/svg/E046.svg";
import twitterImage from "openmoji/color/svg/E040.svg";
import "./yarn.scss";
import "./github.scss";
import "./wave.scss";
import "./Playground.scss";

import { currentCursor, setCurrentCursor } from "@/devStore";

export default function Playground({ children }) {
  const [plaything, setPlaything] = createSignal({
    rendered: false,
    showing: false,
  });
  const [devToolsShown, setDevToolsShown] = createSignal(false);
  const message = "Hi. Check the page again ☝️";

  if (typeof window !== "undefined") {
    window.addEventListener("devtoolschange", (ev) => {
      // let the note show also after you potentially close the dev tools again
      if (ev.detail.isOpen) {
        setDevToolsShown(true);
        console.info(message);
      }
    });

    // also perform an initial check
    if (devTools.isOpen) {
      setDevToolsShown(true);
      console.info(message);
    }
  }

  const handleMouseEnter = (ev) => {
    setCurrentCursor("yarn");
    setPlaything({ rendered: true, showing: true });
  };
  const handleMouseLeave = (ev) => {
    setCurrentCursor();
    setPlaything({ rendered: true, showing: false });
  };
  const handleAnimalEnter = (ev) => {
    setCurrentCursor("github");
  };
  const handleAnimalLeave = (ev) => {
    setCurrentCursor("yarn");
  };
  const handleSocialEnter = (ev) => {
    setCurrentCursor("wave");
  };
  const handleSocialLeave = (ev) => {
    setCurrentCursor("yarn");
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ontouchstart={handleMouseEnter}
      ontouchend={handleMouseLeave}
      class="playground"
    >
      <div
        class="animal"
        onMouseEnter={handleAnimalEnter}
        onMouseLeave={handleAnimalLeave}
      >
        {children}
      </div>

      <div
        class="social"
        onMouseEnter={handleSocialEnter}
        onMouseLeave={handleSocialLeave}
      >
        <div class="links">
          <a href="//linked.in/oddcelot" title="Visit oddcelot on LinkedIn">
            <img alt="LinkedIn" src={linkedinImage} />
          </a>
          <a href="//twitter.com/oddcelot" title="Visit oddcelot on Twitter">
            <img alt="Twitter" src={twitterImage} />
          </a>
        </div>
        {devToolsShown() && (
          <code class={devToolsShown() && "visible"}>
            hello there, wanna build something <i>blazingly fast</i>?
          </code>
        )}
      </div>

      <Portal mount={document.getElementById("cursors")}>
        <div
          class="yarn"
          data-name="yarn"
          data-showing={currentCursor() === "yarn"}
          innerHTML={yarnImage}

        />
        <div
          class="github"
          data-name="github"
          data-showing={currentCursor() === "github"}
          innerHTML={githubImage}
        />
        <div
          class="wave"
          data-name="wave"
          data-showing={currentCursor() === "wave"}
          innerHTML={waveImage}
        />
      </Portal>
    </div>
  );
}

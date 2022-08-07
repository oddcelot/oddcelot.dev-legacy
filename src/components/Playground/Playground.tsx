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

import { currentCursor, setCurrentCursor, cursorMessage } from "@/cursorStore";

export function Nested() {
  return <div innerHTML="yoooo"></div>;
}

export default function Playground({ children }) {
  const [plaything, setPlaything] = createSignal({
    rendered: false,
    showing: false,
  });
  const [devToolsShown, setDevToolsShown] = createSignal(false);
  const [hasConsoleMessage, setHasConsoleMessage] = createSignal(false);
  // const message = "Hi. Check the page again 🤫";
  const message = [
    "%c" + "Hi. Check the page again 🤫",
    "color: #ff52f9; font-weight:bold;",
  ];

  if (typeof window !== "undefined") {
    window.addEventListener("devtoolschange", (ev) => {
      // let the note show also after you potentially close the dev tools again
      if (ev.detail.isOpen && !hasConsoleMessage()) {
        console.info(...message);
        setDevToolsShown(true);
        setHasConsoleMessage(true);
      }
    });

    // also perform an initial check
    if (devTools.isOpen) {
      console.info(...message);
      setDevToolsShown(true);
      setHasConsoleMessage(true);
    }
  }

  const handleMouseEnter = (ev) => {
    setCurrentCursor("yarn");
    setPlaything({ rendered: true, showing: true });
  };
  const handleMouseLeave = (ev) => {
    setCurrentCursor(undefined);
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
          <a
            href="//linked.in/oddcelot"
            aria-label="Visit oddcelot on LinkedIn"
          >
            <img alt="LinkedIn" src={linkedinImage} />
          </a>
          <a
            href="//twitter.com/oddcelot"
            aria-label="Visit oddcelot on Twitter"
          >
            <img alt="Twitter" src={twitterImage} />
          </a>
        </div>
        {devToolsShown() && (
          <code class={devToolsShown() && "visible"}>
            hello there, wanna build something <i>blazingly fast</i>?
          </code>
        )}
      </div>

      {currentCursor() === "yarn" && (
        <Portal mount={document.getElementById("cursor")}>
          <div
            class="yarn"
            data-name="yarn"
            data-showing={currentCursor() === "yarn"}
          >
            <div class="cursor" innerHTML={yarnImage} />
            {cursorMessage() && (
              <span class="cursor-message">{cursorMessage()}</span>
            )}
          </div>
        </Portal>
      )}

      {currentCursor() === "github" && (
        <Portal mount={document.getElementById("cursor")}>
          <div
            class="github"
            data-name="github"
            data-showing={currentCursor() === "github"}
          >
            <div class="cursor" innerHTML={githubImage} />
            {cursorMessage() && (
              <span class="cursor-message">{cursorMessage()}</span>
            )}
          </div>
        </Portal>
      )}

      {currentCursor() === "wave" && (
        <Portal mount={document.getElementById("cursor")}>
          <div
            class="wave"
            data-name="wave"
            data-showing={currentCursor() === "wave"}
          >
            <div class="cursor" innerHTML={waveImage} />
            {cursorMessage() && (
              <span class="cursor-message">{cursorMessage()}</span>
            )}
          </div>
        </Portal>
      )}
    </div>
  );
}

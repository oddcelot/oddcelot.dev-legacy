import { Portal } from "solid-js/web";
import {
  cursorPosition,
  setCursorPosition,
  currentCursor,
} from "@/devStore";
import cursorImage from "openmoji/color/svg/E258.svg?raw";
import "./Cursor.scss";

export default function Cursor({}) {
  const handleMouseMove = (ev: MouseEvent) => {
    setCursorPosition({ x: ev.pageX, y: ev.pageY });
  };

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
  }

  return (
    <div>
      <Portal mount={document.body}>
        <div class="tracker">
          <div
            class="cursor"
            style={`transform: translate3d(
                ${cursorPosition().x}px, 
                ${cursorPosition().y}px, 
                0)`}
          >
            <div class="inner" id="cursors">
              <div
                data-name="default"
                data-showing={currentCursor() === undefined}
                innerHTML={cursorImage}
              ></div>
            </div>
          </div>
        </div>
      </Portal>
    </div>
  );
}

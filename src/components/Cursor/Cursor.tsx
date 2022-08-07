import { Portal } from "solid-js/web";
import {
  cursorPosition,
  setCursorPosition,
  currentCursor,
  setCursorMessage,
  cursorMessage,
} from "@/cursorStore";
import cursorImage from "openmoji/color/svg/E258.svg?raw";
import "./Cursor.scss";

export default function Cursor({}) {
  const assignCursorPosition = (transform: string) => {
    document.getElementById("cursor").style.transform = transform;
  };

  const handleMouseMove = (ev: MouseEvent) => {
    const target = ev.target as any;

    // provide a bunch of fallback values to display in the message
    setCursorMessage(
      target.dataset.cursorMessage ||
        target.getAttribute("aria-label") ||
        target.title
    );
    setCursorPosition({ x: ev.pageX, y: ev.pageY });
    assignCursorPosition(`translate3d(
      ${cursorPosition().x}px, 
      ${cursorPosition().y}px, 
      0)`);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
  }

  return (
    <Portal mount={document.getElementById("cursor")}>
      {currentCursor() === undefined && (
        <>
          <div
            class="cursor"
            data-name="default"
            data-showing={currentCursor() === undefined}
            innerHTML={cursorImage}
          />
          {cursorMessage() && (
            <span class="cursor-message">{cursorMessage()}</span>
          )}
        </>
      )}
    </Portal>
  );
}

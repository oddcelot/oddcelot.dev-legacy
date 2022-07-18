import { createSignal } from "solid-js";

export const [cursorPosition, setCursorPosition] = createSignal({ x: 0, y: 0 });
export const [cursorName, setCursorName] = createSignal("default");
export const [currentCursor, setCurrentCursor] = createSignal();


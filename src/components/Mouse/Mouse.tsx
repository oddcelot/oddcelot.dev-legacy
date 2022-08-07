import { Portal } from "solid-js/web";
import { currentCursor, cursorMessage } from "@/cursorStore";
import "./Mouse.scss";

export default function Mouse({ name, children }) {
  return (
    <>
      {/* currently there are some issues with the solid portal working in astro */}
      {/*  TODO: find a more elegant solution for now  */}
      {name === currentCursor() && children}
      {/* <Portal mount={document.getElementById("cursor")}>
    
        
      </Portal> */}
    </>
  );
}

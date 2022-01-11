import { useSettingsContext } from "../contexts/SettingsContext";
import { useEffect, useRef } from "react";

function Shade({ animateOut, tab, menuVisible, setShadeVisible }) {
  const enableAnimations = useSettingsContext().enableAnimations;
  const shadeRef = useRef();

  useEffect(() => {
    if (tab !== "todolist") {
      shadeRef.current.classList.remove("opacity-25");
      shadeRef.current.classList.add("opacity-60");
    }
  }, [])

  useEffect(() => {
    if (menuVisible) {
      let x = getComputedStyle(shadeRef.current).opacity;
      shadeRef.current.classList.remove("opacity-25");
      shadeRef.current.classList.add("opacity-60");
    }
    else {
      if (tab !== "todolist") return;
      shadeRef.current.classList.remove("opacity-60");
      shadeRef.current.classList.add("opacity-25");
    }
  }, [menuVisible])

  useEffect(() => {
    if (animateOut) {
      shadeRef.current.classList.remove("opacity-60");
      shadeRef.current.classList.add("opacity-25");
    }
  }, [animateOut])

  useEffect(() => {
    if (!enableAnimations && tab === "todolist" && !menuVisible) {
      setShadeVisible(false);
    }
  }, [tab])

  return (
    <div className={`${enableAnimations && "transition-[opacity] duration-default"} opacity-25 h-screen bg-color-800 z-20`}
      onTransitionEnd={(e) => { if (getComputedStyle(e.target).opacity === "0.25") { setShadeVisible(false) } }} ref={shadeRef} ></div>
  );
}

export default Shade;
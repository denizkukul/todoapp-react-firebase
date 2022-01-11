import { useAnimationDurationContext, useSettingsContext } from "../contexts/SettingsContext";
import { useState, useEffect } from "react";

function About({ setTab, animateOut, setAnimateOut }) {
  const animationDurations = useAnimationDurationContext();
  const enableAnimations = useSettingsContext().enableAnimations;
  const [active, setActive] = useState(false);

  useEffect(() => {
    /* Animate Slide In */
    if (enableAnimations) {
      setActive(true);
    }
  }, [])

  useEffect(() => {
    /* Animate Slide Out */
    if (animateOut) {
      setActive(false);
      setTimeout(() => {
        setAnimateOut(false);
        setTab("todolist");
      }, animationDurations.default)
    }
  }, [animateOut])

  return (
    <div className={`${enableAnimations ? `transition-[height] duration-default ${active ? "h-full" : "h-0"}` : "h-full"} overflow-scroll px-2 4xs:px-4 sm:px-6 md:px-10 lg:px-16 fixed top-12 4xs:top-16 xs:top-20 bottom-0 w-full min-w-[240px] max-w-4xl lg:max-w-5xl bg-color-200 text-color-700 z-50`}>
      <div className="pt-7 4xs:pt-8 xs:pt-10 h-[700px]">
        <h1 className="text-[22px]">
          App
        </h1>
        <p className="ml-5">
          Todo app with functions to add, edit and remove list items.
        </p>
        <h1 className="text-[22px] mt-3">
          Built with
        </h1>
        <h2 className="text-lg ml-5 mt-1">
          Frontend
        </h2>
        <ul className="list-disc ml-10">
          <li>App is built with React and Tailwindcss.</li>
          <li>Tailwindcss screen breakpoints are used for responsive design.</li>
          <li>Icons are taken from material design icons.</li>
          <li>React-Icons is used for material design icon components.</li>
        </ul>
        <h2 className="text-lg ml-5 mt-1">
          Backend
        </h2>
        <ul className="list-disc ml-10">
          <li>Server side of the app uses firebase services.</li>
          <li>Firebase authentication for user login.</li>
          <li>Firebase realtime databse for storing data.</li>
          <li>Firebase hosting for deployment.</li>
        </ul>
        <h1 className="text-[22px] mt-3">
          Links
        </h1>
        <ul className="ml-5">
          <li>
            <a href="https://github.com/denizkukul/todoapp-react-firebase" className="outline-none focus-visible:text-color-800 focus-visible:underline hoverable:hover:text-color-800 hoverable:hover:underline" target={"_blank"}>
              Github
            </a>
          </li>
          <li>
            <a href="https://reactjs.org/" className="outline-none focus-visible:text-color-800 focus-visible:underline hoverable:hover:text-color-800 hoverable:hover:underline" target={"_blank"}>
              React
            </a>
          </li>
          <li>
            <a href="https://tailwindcss.com/" className="outline-none focus-visible:text-color-800 focus-visible:underline hoverable:hover:text-color-800 hoverable:hover:underline" target={"_blank"}>
              Tailwindcss
            </a>
          </li>
          <li>
            <a href="https://google.github.io/material-design-icons/" className="outline-none focus-visible:text-color-800 focus-visible:underline hoverable:hover:text-color-800 hoverable:hover:underline" target={"_blank"}>
              Material Design Icons
            </a>
          </li>
          <li>
            <a href="https://github.com/react-icons/react-icons" className="outline-none focus-visible:text-color-800 focus-visible:underline hoverable:hover:text-color-800 hoverable:hover:underline" target={"_blank"}>
              React Icons
            </a>
          </li>
          <li>
            <a href="https://firebase.google.com/" className="outline-none focus-visible:text-color-800 focus-visible:underline hoverable:hover:text-color-800 hoverable:hover:underline" target={"_blank"}>
              Firebase
            </a>
          </li>
        </ul>
        <div className="mt-5 pb-12 text-center">
          Created by <a href="https://github.com/denizkukul" className="outline-none focus-visible:text-color-800 focus-visible:underline hoverable:hover:text-color-800 hoverable:hover:underline" target={"_blank"}>Deniz Kukul</a>
        </div>
      </div>
    </div>
  );
}

export default About;
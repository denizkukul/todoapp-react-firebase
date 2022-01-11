import { ref, set } from "firebase/database";
import { useState, useEffect, useRef } from "react";
import { MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";
import { useAuthContext } from "../contexts/AuthContext";
import { useAnimationDurationContext, useSettingsContext } from "../contexts/SettingsContext";
import { db } from "../firebase";

function Settings({ setTab, animateOut, setAnimateOut, setShadeVisible }) {
  const settings = useSettingsContext();
  const user = useAuthContext();
  const animationDurations = useAnimationDurationContext();
  const enableAnimations = settings.enableAnimations;
  const [enableAnimationsUpdated, setEnableAnimationsUpdated] = useState(settings.enableAnimations);
  const [confirmClearAllUpdated, setConfirmClearAllUpdated] = useState(settings.confirmClearAll);
  const [animating, setAnimating] = useState(enableAnimations);
  const [active, setActive] = useState(false);
  const settingsRef = useRef();

  useEffect(() => {
    /* Animate Slide In */
    if (enableAnimations) {
      setActive(true);
      setTimeout(() => {
        setAnimating(false);
      }, animationDurations.default)
    }
  }, [])

  useEffect(() => {
    /* Animate Slide Out */
    if (animateOut) {
      setAnimating(true);
      setActive(false);
      setTimeout(() => {
        setAnimateOut(false);
        setTab("todolist");
      }, animationDurations.default)
    }
  }, [animateOut])

  useEffect(() => {
    if (enableAnimationsUpdated) {
      setShadeVisible(true);
    }
    else {
      setShadeVisible(false);
    }
  }, [enableAnimationsUpdated])

  const saveSettings = () => {
    set(ref(db, `${user.uid}/settings`), { enableAnimations: enableAnimationsUpdated, confirmClearAll: confirmClearAllUpdated });
    if (enableAnimationsUpdated) {
      setAnimateOut(true);
    }
    else {
      setTab("todolist");
      setShadeVisible(false);
    }
  }

  return (
    <>
      <div className={`${enableAnimations ? `transition-[height] duration-default ${active ? "h-full" : "h-0"}` : "h-full"} overflow-scroll px-2 4xs:px-4 sm:px-6 md:px-10 lg:px-16 fixed top-12 4xs:top-16 xs:top-20 bottom-0 w-full min-w-[240px] max-w-4xl lg:max-w-5xl bg-color-200 z-50`} ref={settingsRef}>
        <div className="pt-7 4xs:pt-8 xs:pt-10 h-[450px]">
          <div className="pb-4 xs:pb-7">
            <button className={`bg-color-000 outline-color-500 outline outline-1 h-28 rounded-3xl overflow-hidden xs:h-20 xs:rounded-full group w-full flex flex-col xs:flex-row justify-between items-center cursor-default ${enableAnimations && "transition-[background-color] duration-fast active:duration-[0ms]"} ${!animating && "hoverable:hover:bg-color-400 focus-visible:bg-color-400 active:active:bg-color-600 cursor-pointer"}`} onClick={() => { if (animating) return; setEnableAnimationsUpdated(!enableAnimationsUpdated) }}>
              <div className={`text-[17px] text-color-700 mt-5 xs:mt-0 flex items-center justify-start xs:basis-auto xs:ml-12 ${enableAnimations && "transition-[color] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:text-color-900 group-focus-visible:text-color-900 group-active:group-active:text-color-000"} `}>
                Enable animations
              </div>
              <div className={`bg-color-300 relative flex items-center mb-5 xs:mb-0 w-24 basis-9 xs:basis-24 xs:mr-5 px-[10px] h-10 rounded-full ${enableAnimations && "transition-[background-color] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:bg-color-600 group-focus-visible:bg-color-600 group-active:group-active:bg-color-000"} `}>
                <div className={`bg-color-000 absolute h-[22px] w-[22px] rounded-full ${enableAnimations && "transition-[visibility,opacity,left] duration-[75ms] ease-linear"} ${enableAnimationsUpdated ? "invisible opacity-0 left-[37px]" : "visible opacity-100 left-[8px] xs:left-[10px] delay-[75ms]"}`}>
                  <MdOutlineCancel className={`fill-color-700 rounded-full h-[32px] w-[32px] absolute top-[-5px] left-[-5px] ${enableAnimations && "transition-[fill] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:group-active:fill-color-900"} `} />
                </div>
                <div className={`bg-color-000 absolute h-[22px] w-[22px] rounded-full ${enableAnimations && "transition-[visibility,opacity,right] duration-[75ms] ease-linear"} ${enableAnimationsUpdated ? "visible opacity-100 right-[8px] xs:right-[10px] delay-[75ms]" : "invisible opacity-0 right-[37px]"}`}>
                  <MdOutlineCheckCircle className={`fill-color-700 rounded-full h-[32px] w-[32px] absolute top-[-5px] left-[-5px] ${enableAnimations && "transition-[fill] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:group-active:fill-color-900"} `} />
                </div>
              </div>
            </button>
          </div>

          <div className="pb-4 xs:pb-7">
            <button className={`bg-color-000 outline-color-500 outline outline-1 h-28 rounded-3xl overflow-hidden xs:h-20 xs:rounded-full group w-full flex flex-col xs:flex-row justify-between items-center cursor-default ${enableAnimations && "transition-[background-color] duration-fast active:duration-[0ms]"} ${!animating && "hoverable:hover:bg-color-400 focus-visible:bg-color-400 active:active:bg-color-600 cursor-pointer"}`} onClick={() => { if (animating) return; setConfirmClearAllUpdated(!confirmClearAllUpdated) }}>
              <div className={`text-[17px] text-color-700 mt-5 xs:mt-0 flex items-center justify-start xs:basis-auto xs:ml-12 ${enableAnimations && "transition-[color] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:text-color-900 group-focus-visible:text-color-900 group-active:group-active:text-color-000"} `}>
                Confirm clearing all todos
              </div>
              <div className={`bg-color-300 relative flex items-center mb-5 xs:mb-0 w-24 basis-9 xs:basis-24 xs:mr-5 px-[10px] h-10 rounded-full ${enableAnimations && "transition-[background-color] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:bg-color-600 group-focus-visible:bg-color-600 group-active:group-active:bg-color-000"} `}>
                <div className={`bg-color-000 absolute h-[22px] w-[22px] rounded-full ${enableAnimations && "transition-[visibility,opacity,left] duration-[75ms] ease-linear"} ${confirmClearAllUpdated ? "invisible opacity-0 left-[37px]" : "visible opacity-100 left-[8px] xs:left-[10px] delay-[75ms]"}`}>
                  <MdOutlineCancel className={`fill-color-700 rounded-full h-[32px] w-[32px] absolute top-[-5px] left-[-5px] ${enableAnimations && "transition-[fill] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:group-active:fill-color-900"} `} />
                </div>
                <div className={`bg-color-000 absolute h-[22px] w-[22px] rounded-full ${enableAnimations && "transition-[visibility,opacity,right] duration-[75ms] ease-linear"} ${confirmClearAllUpdated ? "visible opacity-100 right-[8px] xs:right-[10px] delay-[75ms]" : "invisible opacity-0 right-[37px]"}`}>
                  <MdOutlineCheckCircle className={`fill-color-700 rounded-full h-[32px] w-[32px] absolute top-[-5px] left-[-5px] ${enableAnimations && "transition-[fill] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:group-active:fill-color-900"} `} />
                </div>
              </div>
            </button>
          </div>

          <div className="flex justify-center pt-7">
            <button className={`bg-color-000 text-color-700 outline-none border-color-600 text-lg border border-1 h-16 w-32 4xs:w-40 xs:w-48 rounded-full overflow-hidden cursor-default xs:rounded-full justify-center ${enableAnimations && "transition-[color,background-color] duration-fast active:duration-[0ms]"} ${!animating && "hoverable:hover:bg-color-500 focus-visible:bg-color-500 hoverable:hover:text-color-900 focus-visible:text-color-900 active:active:bg-color-700 active:active:text-color-000 hoverable:hover:cursor-pointer"} `} onClick={() => { if (animating) return; saveSettings() }}>
              Save
            </button>
          </div>
        </div>
      </div >
    </>
  );
}

export default Settings;
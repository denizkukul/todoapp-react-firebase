import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { MdSettings, MdInfo, MdLogout } from "react-icons/md";
import { useRef } from "react";
import { useSettingsContext } from "../contexts/SettingsContext";
import { auth } from "../firebase";

function Menu({ tab, setTab, menuVisible, setMenuVisible, setShadeVisible }) {
  const enableAnimations = useSettingsContext().enableAnimations;
  const [animating, setAnimating] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    if (enableAnimations) {
      setAnimating(true);
    }
    if (menuVisible) {
      setShadeVisible(true);
    }
    if (!enableAnimations) {
      !menuVisible && setShadeVisible(false);
      setAnimating(false);
    }
  }, [menuVisible])

  const handleBlur = (e) => {
    if (!e.relatedTarget || !e.relatedTarget.classList.contains("menu-item")) {
      if (enableAnimations) {
        setMenuVisible(false);
        setAnimating(true);
      }
      else {
        setMenuVisible(false);
      }
    }
  }

  return (
    <>
      <div className={`${tab !== "todolist" && "hidden"} ${enableAnimations && "transition-[height] duration-default"} ${menuVisible ? "h-[128px] 4xs:h-[177px] xs:h-60" : "h-0"} z-20 overflow-hidden`} onBlurCapture={handleBlur}
        onTransitionEnd={(e) => { setAnimating(false); }} ref={menuRef}>
        {/* <!-- Settings Button --> */}
        <button className={`menu-item cursor-default bg-color-100 flex w-full h-[43px] 4xs:h-[59px] xs:h-20 items-center border-b border-b-color-500 px-2 4xs:px-4 sm:px-6 md:px-10 lg:px-16 group outline-none ${enableAnimations && "transition-[background-color] duration-fast active:duration-[0ms]"} ${!animating && "cursor-pointer hoverable:hover:bg-color-500 focus-visible:bg-color-500 active:active:bg-color-700"}`}
          onClick={() => { if (!animating) { setTab("settings"); setMenuVisible(false); } }} tabIndex={`${menuVisible ? 1 : -1}`}>
          <MdSettings className={`fill-color-700 h-7 w-9 4xs:w-10 2xs:h-8 2xs:w-12 xs:h-9 xs:w-14 ${enableAnimations && "transition-[fill] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:group-active:fill-color-000"} `} />
          <span className={`pl-2 text-color-700 text-base 4xs:text-lg xs:text-xl ${enableAnimations && "transition-[color] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:text-color-900 group-active:group-active:text-color-000 group-focus-visible:text-color-900"} `}>
            Settings
          </span>
        </button>
        {/* <!-- About Button --> */}
        <button className={`menu-item cursor-default bg-color-100 flex w-full h-[43px] 4xs:h-[59px] xs:h-20 items-center border-b border-b-color-500 px-2 4xs:px-4 sm:px-6 md:px-10 lg:px-16 group outline-none ${enableAnimations && "transition-[background-color] duration-fast active:duration-[0ms]"} ${!animating && "cursor-pointer hoverable:hover:bg-color-500 focus-visible:bg-color-500 active:active:bg-color-700"}`}
          onClick={() => { if (!animating) { setTab("about"); setMenuVisible(false); } }} tabIndex={`${menuVisible ? 1 : -1}`}>
          <MdInfo className={`fill-color-700 h-7 w-9 4xs:w-10 2xs:h-8 2xs:w-12 xs:h-9 xs:w-14 ${enableAnimations && "transition-[fill] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:group-active:fill-color-000"} `} />
          <span className={`pl-2 text-color-700 text-base 4xs:text-lg xs:text-xl ${enableAnimations && "transition-[color] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:text-color-900 group-active:group-active:text-color-000 group-focus-visible:text-color-900"} `}>
            About
          </span>
        </button>
        {/* <!-- Logout Button --> */}
        <button className={`menu-item cursor-default bg-color-100 flex w-full h-[43px] 4xs:h-[59px] xs:h-20 items-center border-b border-b-color-500 px-2 4xs:px-4 sm:px-6 md:px-10 lg:px-16 group outline-none ${enableAnimations && "transition-[background-color] duration-fast active:duration-[0ms]"} ${!animating && "cursor-pointer hoverable:hover:bg-color-500 focus-visible:bg-color-500 active:active:bg-color-700"}`}
          onClick={() => { if (!animating) { signOut(auth) } }} tabIndex={`${menuVisible ? 1 : -1}`}>
          <MdLogout className={`fill-color-700 h-7 w-9 4xs:w-10 2xs:h-8 2xs:w-12 xs:h-9 xs:w-14 pl-[4px] 4xs:pl-[6px] xs:pl-[7px] ${enableAnimations && "transition-[fill] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:group-active:fill-color-000"} `} />
          <span className={`pl-2 text-color-700 text-base 4xs:text-lg xs:text-xl ${enableAnimations && "transition-[color] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:text-color-900 group-active:group-active:text-color-000 group-focus-visible:text-color-900"} `}>
            Sign out
          </span>
        </button>
      </div>
    </>
  );
}

export default Menu;
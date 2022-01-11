import { useEffect, useRef, useState } from "react";
import { MdMenu, MdArrowBack, MdArrowUpward } from "react-icons/md";
import { useAnimationDurationContext, useSettingsContext } from "../contexts/SettingsContext";

function Header({ tab, setTab, scroll, setMenuVisible, animateOut, setAnimateOut, todoAppRef }) {
  const enableAnimations = useSettingsContext().enableAnimations;
  const [animating, setAnimating] = useState(false);
  const [menuButtonActive, setMenuButtonActive] = useState(true);
  const [title, setTitle] = useState("todolist");
  const menuButtonRef = useRef();
  const backButtonRef = useRef();

  useEffect(() => {
    if (tab !== "todolist") {
      setMenuButtonActive(false);
    }
    else {
      setMenuButtonActive(true);
    }
    setTitle(tab);
  }, [tab])

  useEffect(() => {
    if (enableAnimations) {
      setMenuButtonActive(true);
      setTitle("todolist");
    }
  }, [animateOut])

  const handleBlur = (e) => {
    if (!e.relatedTarget || !e.relatedTarget.classList.contains("menu-item")) {
      setMenuVisible(false);
    }
  }

  const scrollToTop = () => {
    todoAppRef.current.scrollTo(0, 0);
  }

  const backButtonClickHandler = () => {
    if (enableAnimations) {
      setAnimateOut(true);
    }
    else {
      setTab("todolist");
      setTitle("todolist");
      setMenuButtonActive(true);
    }
  }

  const menuButtonClickHandler = () => {
    setMenuVisible(prevState => !prevState)
  }

  return (
    <div className="bg-color-100 border-b-color-700 border-b flex h-12 4xs:h-16 xs:h-20 px-2 4xs:px-4 sm:px-6 md:px-10 lg:px-16 ">
      <div className="relative flex items-center justify-center w-9 4xs:w-10 2xs:w-12 xs:w-14">
        <button className={`${menuButtonActive ? "visible opacity-100 ease-headerButton delay-headerButton" : "invisible opacity-0"} menu-item flex items-center outline-none cursor-default justify-center absolute h-9 w-9 4xs:h-10 4xs:w-10 2xs:w-12 2xs:h-12 xs:h-14 xs:w-14 rounded-full group ${enableAnimations && "transition-[background-color,opacity,visibility] duration-fast active:duration-[0ms]"} ${!animating && "hoverable:hover:bg-color-500 focus-visible:bg-color-500 active:active:bg-color-700 cursor-pointer"}`}
          onClick={menuButtonClickHandler}
          onBlurCapture={handleBlur} tabIndex={1}
          ref={menuButtonRef}>
          <MdMenu className={`fill-color-700 h-7 w-7 4xs:h-8 4xs:w-8 2xs:h-9 2xs:w-9 xs:h-10 xs:w-10 ${enableAnimations && "transition-[fill] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:fill-color-900 group-active:group-active:fill-color-000 group-focus-visible:fill-color-900"} `} />
        </button>
        <button className={`${!menuButtonActive ? "visible opacity-100 ease-headerButton delay-headerButton" : "invisible opacity-0"} flex items-center outline-none cursor-default justify-center absolute h-9 w-9 4xs:h-10 4xs:w-10 2xs:w-12 2xs:h-12 xs:h-14 xs:w-14 rounded-full group ${enableAnimations && "transition-[background-color,opacity,visibility] duration-fast active:duration-[0ms]"} ${!animating && "hoverable:hover:bg-color-500 focus-visible:bg-color-500 active:active:bg-color-700 cursor-pointer"}`}
          onClick={backButtonClickHandler}
          tabIndex={1}
          ref={backButtonRef} >
          <MdArrowBack className={`fill-color-700 h-7 w-7 4xs:h-8 4xs:w-8 2xs:h-9 2xs:w-9 xs:h-10 xs:w-10 ${enableAnimations && "transition-[fill] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:fill-color-900 group-active:group-active:fill-color-000 group-focus-visible:fill-color-900"} `} />
        </button>
      </div>
      {/*  Title */}
      <div className="flex items-center justify-center relative flex-1">
        <span className={`uppercase ${enableAnimations && `transition-[opacity] ease-linear duration-fast ${title === "todolist" && "delay-fast"}`} ${title === "todolist" ? "opacity-100" : "opacity-0"} absolute text-color-700 text-2xl tracking-[.15em] font-extrabold pl-1 4xs:text-[28px] 4xs:tracking-[.18em] xs:text-4xl sm:tracking-[.25em]`}>
          todolist
        </span>
        <span className={`uppercase ${enableAnimations && `transition-[opacity] ease-linear duration-fast ${title === "settings" && "delay-fast"}`} ${title === "settings" ? "opacity-100" : "opacity-0"}  absolute text-color-700 text-2xl tracking-[.15em] font-extrabold pl-1 4xs:text-[28px] 4xs:tracking-[.18em] xs:text-4xl sm:tracking-[.25em]`}>
          settings
        </span>
        <span className={`uppercase ${enableAnimations && `transition-[opacity] ease-linear duration-fast ${title === "about" && "delay-fast"}`} ${title === "about" ? "opacity-100" : "opacity-0"}  absolute text-color-700 text-2xl tracking-[.15em] font-extrabold pl-1 4xs:text-[28px] 4xs:tracking-[.18em] xs:text-4xl sm:tracking-[.25em]`}>
          about
        </span>
      </div>
      <div className="flex items-center justify-center">
        {/* GotoTop Button */}
        <button className={`${tab === "todolist" && "delay-[0ms]"} ${title === "todolist" && scroll ? "delay-headerButton opacity-100 visible" : "opacity-0 invisible"} ${enableAnimations && "transition-[background-color,opacity,visibility] duration-fast active:duration-[0ms] ease-headerButton"} ${!animating && "hoverable:hover:bg-color-500 focus-visible:bg-color-500 active:active:bg-color-700 cursor-pointer"} flex items-center justify-center outline-none h-9 w-9 4xs:h-10 4xs:w-10 2xs:w-12 2xs:h-12 md:h-14 md:w-14 rounded-full group`}
          onClick={scrollToTop} tabIndex={3}>
          <MdArrowUpward className={`fill-color-700 h-7 w-7 4xs:h-8 4xs:w-8 2xs:h-9 2xs:w-9 xs:h-10 xs:w-10 ${enableAnimations && "transition-[fill] duration-fast group-active:duration-[0ms]"} ${!animating && "hoverable:group-hover:fill-color-900 group-active:group-active:fill-color-000 group-focus-visible:fill-color-900"} `} />
        </button>
      </div>
    </div >
  );
}

export default Header;
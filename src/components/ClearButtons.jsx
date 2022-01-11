import { ref, set } from "firebase/database";
import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useAnimationDurationContext, useInitialRenderContext, useSettingsContext } from "../contexts/SettingsContext";
import { db } from "../firebase";

function ClearButtons({ todos, tab, setModalVisible, clearTodos, setClearTodos, deleting, setDeleting }) {
  const user = useAuthContext();
  const enableAnimations = useSettingsContext().enableAnimations;
  const confirmClearAll = useSettingsContext().confirmClearAll;
  const initialRender = useInitialRenderContext();
  const animationDurations = useAnimationDurationContext();
  const [animating, setAnimating] = useState(false);
  const [active, setActive] = useState(todos.length > 0);


  useEffect(() => {
    if (enableAnimations) {
      if (todos.length - deleting > 0 && !active) {
        setActive(true);
      }
      else if (todos.length - deleting === 0 && active) {
        setActive(false);
      }
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
      }, animationDurations.default)
    }
  }, [todos, deleting])

  const deleteCompleted = () => {
    if (animating) return;
    if (enableAnimations) {
      if (clearTodos !== false) return;
      let updatedTodos = todos.filter(item => item.completed === false);
      let todoCount = todos.length - updatedTodos.length
      setDeleting(prevState => prevState + todoCount);
      setClearTodos("completed");
      setTimeout(() => {
        setDeleting(prevState => prevState - todoCount);
        set(ref(db, `${user.uid}/todos`), updatedTodos);
        setClearTodos(false);
      }, animationDurations.default)
    }
    else {
      let updatedTodos = todos.filter(item => item.completed === false);
      set(ref(db, `${user.uid}/todos`), updatedTodos);
    }
  }

  const handleDeleteAll = () => {
    if (animating) return;
    if (confirmClearAll) {
      setModalVisible(true);
      return
    }
    if (enableAnimations) {
      if (clearTodos !== false) return;
      setClearTodos("all");
      let todoCount = todos.length;
      setDeleting(prevState => prevState + todoCount);
      setTimeout(() => {
        setDeleting(prevState => prevState - todoCount);
        set(ref(db, `${user.uid}/todos`), []);
        setClearTodos(false);
      }, animationDurations.default)
    }
    else {
      set(ref(db, `${user.uid}/todos`), []);
    }
  }

  return (
    <div className={`flex flex-col justify-around pt-4 mx-auto 4xs:flex-row 3xs:pr-4 pb-10 max-w-[700px] box-content overflow-hidden ${(enableAnimations && !initialRender) && `transition-[opacity,visibility] duration-default ${active ? "visible opacity-100" : "invisible opacity-0"}`} 
    ${(!enableAnimations || initialRender) && `${todos.length > 0 ? "visible opacity-100" : "invisible opacity-0"}`}`} onTransitionEnd={(e) => { if (e.propertyName === "opacity") { setAnimating(false) } }}>
      <button className={`text-base relative text-color-700 mb-2 4xs:mb-0 2xs:text-lg outline-none cursor-default ${enableAnimations && "transition-[color] duration-fast after:transition-[width,background-color] after:duration-fast active:active:after:duration-[0ms] active:duration-[0ms]"} ${!animating && "hoverable:hover:text-color-900 focus-visible:text-color-900 active:active:text-color-000 hoverable:hover:after:w-full focus-visible:after:w-full active:active:after:w-full after:bg-color-700 hoverable:hover:after:bg-color-900 focus-visible:after:bg-color-900 active:active:after:bg-color-000 cursor-pointer"} after:mx-auto after:w-0 after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:h-[2px]`} onClick={deleteCompleted} tabIndex={tab === "todolist" ? 0 : -1}>
        Clear completed
      </button>
      <button className={`text-base relative text-color-700 mb-2 4xs:mb-0 2xs:text-lg outline-none cursor-default ${enableAnimations && "transition-[color] duration-fast after:transition-[width,background-color] after:duration-fast active:active:after:duration-[0ms] active:duration-[0ms]"} ${!animating && "hoverable:hover:text-color-900 focus-visible:text-color-900 active:active:text-color-000 hoverable:hover:after:w-full focus-visible:after:w-full active:active:after:w-full after:bg-color-700 hoverable:hover:after:bg-color-900 focus-visible:after:bg-color-900 active:active:after:bg-color-000 cursor-pointer"} after:mx-auto after:w-0 after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:h-[2px]`} onClick={handleDeleteAll} tabIndex={tab === "todolist" ? 0 : -1}>
        Clear all
      </button>
    </div>
  );
}

export default ClearButtons;
import { ref, set } from "firebase/database"
import { useRef, useEffect, useState } from "react"
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext"
import { useAnimationDurationContext, useSettingsContext } from "../contexts/SettingsContext";

function Modal({ setModalVisible, clearTodos, setClearTodos, todos, setDeleting }) {
  const cancelButtonRef = useRef()
  const confirmButtonRef = useRef()
  const user = useAuthContext();
  const enableAnimations = useSettingsContext().enableAnimations;
  const animationDurations = useAnimationDurationContext();
  const [active, setActive] = useState(false);
  const [animating, setAnimating] = useState(enableAnimations);
  const modalRef = useRef();

  const cancel = () => {
    if (enableAnimations) {
      setActive(false);
      setAnimating(true);
      setTimeout(() => {
        setModalVisible(false)
      }, animationDurations.fast)
    }
    else {
      setModalVisible(false);
    }
  }

  const deleteAll = () => {
    if (enableAnimations) {
      setActive(false);
      setAnimating(true);
      setTimeout(() => {
        setModalVisible(false)
      }, animationDurations.fast)
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
      setModalVisible(false)
      set(ref(db, `${user.uid}/todos`), []);
    }
  }

  const modalTab = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      let element = document.activeElement;
      if (element === confirmButtonRef.current) {
        cancelButtonRef.current.focus();
      }
      else {
        confirmButtonRef.current.focus();
      }
    }
  }

  useEffect(() => {
    if (enableAnimations) {
      setActive(true);
      setTimeout(() => {
        setAnimating(false);
      }, animationDurations.fast)
    }
    window.addEventListener("keydown", modalTab)
    return () => { window.removeEventListener("keydown", modalTab) }
  }, [])

  return (
    <div className={`${enableAnimations && `transition-[opacity] duration-fast ${active ? "opacity-100" : "opacity-0"}`} z-50 fixed text-color-700`} ref={modalRef}>
      <div className="fixed inset-0 bg-opacity-60 bg-color-900">
      </div>
      <div className="bg-color-000 fixed flex flex-col justify-center items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[25px] h-[200px] w-[90%] max-w-[600px]">
        <p className="pb-5 justify-center text-[22px] 2xs:text-[24px] xs:text-[26px]">Delete all todos?</p>
        <div className="flex justify-around text-base">
          <button className={`mx-3 h-[32px] xs:h-[38px] w-[62px] 2xs:w-[72px] xs:w-[80px] lg:w-20 xs:text-lg flex justify-center items-center outline-none border border-color-600 rounded-full ${enableAnimations && "transition-[background-color,color] duration-fast active:duration-[0ms]"} ${!animating && "hoverable:hover:bg-color-500 focus-visible:bg-color-500 hoverable:hover:text-color-900 focus-visible:text-color-900 active:active:bg-color-700 active:active:text-color-000"}`} onClick={deleteAll} ref={confirmButtonRef}>Yes</button>
          <button className={`mx-3 h-[32px] xs:h-[38px] w-[62px] 2xs:w-[72px] xs:w-[80px] lg:w-20 xs:text-lg flex justify-center items-center outline-none border border-color-600 rounded-full ${enableAnimations && "transition-[background-color,color] duration-fast active:duration-[0ms]"} ${!animating && "hoverable:hover:bg-color-500 focus-visible:bg-color-500 hoverable:hover:text-color-900 focus-visible:text-color-900 active:active:bg-color-700 active:active:text-color-000"}`} onClick={cancel} ref={cancelButtonRef}>No</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
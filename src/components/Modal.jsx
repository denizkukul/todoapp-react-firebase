import { ref, set } from "firebase/database"
import { useRef, useEffect } from "react"
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext"

function Modal({ setModalVisible }) {
  const cancelButtonRef = useRef()
  const confirmButtonRef = useRef()
  const user = useAuthContext();

  const cancel = () => {
    setModalVisible(false)
  }

  const deleteAll = () => {
    setModalVisible(false)
    set(ref(db, `${user.uid}/todos`), []);
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
    window.addEventListener("keydown", modalTab)
    return () => { window.removeEventListener("keydown", modalTab) }
  }, [])

  return (
    <div className="z-50 fixed text-color-700">
      <div className="fixed inset-0 bg-opacity-60 bg-color-900">
      </div>
      <div className="bg-color-000 fixed flex flex-col justify-center items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[25px] h-[200px] w-[90%] max-w-[600px]">
        <p className="pb-5 justify-center text-[22px] 2xs:text-[24px] xs:text-[26px]">Delete all todos?</p>
        <div className="flex justify-around text-base">
          <button className="mx-3 h-[32px] xs:h-[38px] w-[62px] 2xs:w-[72px] xs:w-[80px] lg:w-20 xs:text-lg flex justify-center items-center outline-none border border-color-600 rounded-full hover:bg-color-500 focus-visible:bg-color-500 hover:text-color-900 focus-visible:text-color-900 active:bg-color-700 active:text-color-000" onClick={deleteAll} ref={confirmButtonRef}>Yes</button>
          <button className="mx-3 h-[32px] xs:h-[38px] w-[62px] 2xs:w-[72px] xs:w-[80px] lg:w-20 xs:text-lg flex justify-center items-center outline-none border border-color-600 rounded-full hover:bg-color-500 focus-visible:bg-color-500 hover:text-color-900 focus-visible:text-color-900 active:bg-color-700 active:text-color-000" onClick={cancel} ref={cancelButtonRef}>No</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
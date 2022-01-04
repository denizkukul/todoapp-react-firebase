import { signOut } from "firebase/auth";
import { MdSettings, MdInfo, MdLogout } from "react-icons/md";
import { auth } from "../firebase";

function Menu({ setTab, setMenuVisible, todoAppRef }) {

  const handleBlur = (e) => {
    if (!e.relatedTarget || !e.relatedTarget.classList.contains("menu-item")) {
      setMenuVisible(false)
    }
  }

  return (
    <>
      <div className="flex flex-col h-32 4xs:h-44 xs:h-60 z-50" onBlurCapture={handleBlur}>
        {/* <!-- Settings Button --> */}
        <button className="menu-item bg-color-100 flex flex-1 items-center border-b border-b-color-500 px-2 4xs:px-4 sm:px-6 md:px-10 lg:px-16 group hover:bg-color-500 focus-visible:bg-color-500 focus-visible:outline-none active:bg-color-700"
          onClick={() => { setTab("settings"); setMenuVisible(false); todoAppRef.current.scrollTo(0, 0) }} tabIndex={1}>
          <MdSettings className="fill-color-700 h-7 w-9 4xs:w-10 2xs:h-8 2xs:w-12 xs:h-9 xs:w-14 group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:fill-color-000" />
          <span className="pl-2 text-color-700 text-base 4xs:text-lg xs:text-xl group-hover:text-color-900 group-active:text-color-000 group-focus-visible:text-color-900">
            Settings
          </span>
        </button>
        {/* <!-- About Button --> */}
        <button className="menu-item bg-color-100 flex flex-1 items-center border-b border-b-color-500 px-2 4xs:px-4 sm:px-6 md:px-10 lg:px-16 group hover:bg-color-500 focus-visible:bg-color-500 focus-visible:outline-none active:bg-color-700 scroll-auto"
          onClick={() => { setTab("about"); setMenuVisible(false); todoAppRef.current.scrollTo(0, 0) }} tabIndex={1}>
          <MdInfo className="fill-color-700 h-7 w-9 4xs:w-10 2xs:h-8 2xs:w-12 xs:h-9 xs:w-14 group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:fill-color-000" />
          <span className="pl-2 text-color-700 text-base 4xs:text-lg xs:text-xl group-hover:text-color-900 group-active:text-color-000 group-focus-visible:text-color-900">
            About
          </span>
        </button>
        {/* <!-- Logout Button --> */}
        <button className="menu-item bg-color-100 flex flex-1 items-center border-b border-b-color-500 px-2 4xs:px-4 sm:px-6 md:px-10 lg:px-16 group hover:bg-color-500 focus-visible:bg-color-500 focus-visible:outline-none active:bg-color-700"
          onClick={() => { signOut(auth) }} tabIndex={1}>
          <MdLogout className="fill-color-700 h-7 w-9 4xs:w-10 2xs:h-8 2xs:w-12 xs:h-9 xs:w-14 group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:fill-color-000" />
          <span className="pl-2 text-color-700 text-base 4xs:text-lg xs:text-xl group-hover:text-color-900 group-active:text-color-000 group-focus-visible:text-color-900">
            Sign out
          </span>
        </button>
      </div>
      <div className="bg-opacity-60 bg-color-800 h-screen z-50"></div>
    </>
  );
}

export default Menu;
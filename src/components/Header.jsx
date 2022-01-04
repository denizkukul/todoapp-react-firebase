import { MdMenu, MdArrowBack, MdArrowUpward } from "react-icons/md";

function Header({ tab, setTab, scroll, setMenuVisible, todoAppRef }) {

  const handleBlur = (e) => {
    if (!e.relatedTarget || !e.relatedTarget.classList.contains("menu-item")) {
      setMenuVisible(false)
    }
  }

  const scrollToTop = () => {
    todoAppRef.current.classList.add("scroll-smooth");
    todoAppRef.current.scrollTo(0, 0);
    todoAppRef.current.classList.remove("scroll-smooth");
  }

  return (
    <div className="bg-color-100 border-b-color-700 border-b flex h-12 4xs:h-16 xs:h-20 px-2 4xs:px-4 sm:px-6 md:px-10 lg:px-16 ">
      <div className="flex items-center justify-center">
        {
          tab === "todolist" ?
            /* Menu Button */
            <button className="menu-item flex items-center justify-center h-9 w-9 4xs:h-10 4xs:w-10 2xs:w-12 2xs:h-12 xs:h-14 xs:w-14 rounded-full group hover:bg-color-500 focus-visible:bg-color-500 focus-visible:outline-none active:bg-color-700"
              onClick={() => { setMenuVisible(prevState => !prevState) }} onBlurCapture={handleBlur} tabIndex={1}>
              <MdMenu className="fill-color-700 h-7 w-7 4xs:h-8 4xs:w-8 2xs:h-9 2xs:w-9 xs:h-10 xs:w-10 group-hover:fill-color-900 group-active:fill-color-000 group-focus-visible:fill-color-900" />
            </button> :
            /* Back Button */
            <button className="flex items-center justify-center h-9 w-9 4xs:h-10 4xs:w-10 2xs:w-12 2xs:h-12 md:h-14 md:w-14 rounded-full group hover:bg-color-500 focus-visible:bg-color-500 focus-visible:outline-none active:bg-color-700"
              onClick={() => { setTab("todolist") }} tabIndex={1}>
              <MdArrowBack className="fill-color-700 h-7 w-7 4xs:h-8 4xs:w-8 2xs:h-9 2xs:w-9 xs:h-10 xs:w-10 group-hover:fill-color-900 group-active:fill-color-000 group-focus-visible:fill-color-900" />
            </button>
        }
      </div>
      {/*  Title */}
      <div className="flex items-center justify-center flex-1">
        <span className="uppercase text-color-700 text-2xl tracking-[.15em] font-extrabold pl-1 4xs:text-[28px] 4xs:tracking-[.18em] xs:text-4xl sm:tracking-[.25em]">
          {tab}
        </span>
      </div>
      <div className="flex items-center justify-center">
        {/* GotoTop Button */}
        <button className={`${tab === "todolist" && scroll > 0 ? "visible" : "invisible"} flex items-center justify-center h-9 w-9 4xs:h-10 4xs:w-10 2xs:w-12 2xs:h-12 md:h-14 md:w-14 rounded-full group hover:bg-color-500 focus-visible:bg-color-500 focus-visible:outline-none active:bg-color-700`}
          onClick={scrollToTop} tabIndex={3}>
          <MdArrowUpward className="fill-color-700 h-7 w-7 4xs:h-8 4xs:w-8 2xs:h-9 2xs:w-9 xs:h-10 xs:w-10 group-hover:fill-color-900 group-active:fill-color-000 group-focus-visible:fill-color-900" />
        </button>
      </div>
    </div>
  );
}

export default Header;
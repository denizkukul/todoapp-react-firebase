import { ref, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useSettingsContext } from "../contexts/SettingsContext";
import { db } from "../firebase";

function AddTodo({ todos, tab, todoAppRef }) {
  const addInputRef = useRef();
  const addButtonRef = useRef();
  const [input, setInput] = useState("");
  const user = useAuthContext();
  const enableAnimations = useSettingsContext().enableAnimations;

  const inputChange = (e) => {
    setInput(e.target.value);
  }

  const addTodo = () => {
    let regex = new RegExp(/[a-z]/i);
    if (regex.test(input)) {
      let userTodosRef = ref(db, `${user.uid}/todos`);
      let id = new Date().getTime();
      set(userTodosRef, [...todos, { value: input, completed: false, id: id }]);
    }
    setInput("");
    addInputRef.current.focus();
  }

  const addTodoBlur = (e) => {
    if (e.relatedTarget === addInputRef.current || e.relatedTarget === addButtonRef.current) {
      return
    }
    setInput("");
  }

  const addTodoFocus = () => {
    todoAppRef.current.scroll(0, 0);
  }

  const inputEnter = (e) => {
    if (e.key !== "Enter") return;
    addTodo();
  }

  useEffect(() => {
    if (todos.length === 0) {
      addInputRef.current.focus();
    }
  }, [todos])


  return (
    <div className="px-2 4xs:px-4 sm:px-6 md:px-10 lg:px-16 mb-4 xs:mb-5">
      <div className={`bg-color-000 outline-color-500 outline outline-1 h-28 rounded-3xl overflow-hidden flex flex-col 4xs:flex-row  xs:h-20 xs:rounded-full focus-within:shadow-color-500 focus-within:shadow-[0_0_0_4px] ${enableAnimations && "transition-[box-shadow] duration-fast"}`}>
        <input className="outline-none flex-1 placeholder:text-color-600 text-center 4xs:text-left 4xs:pl-5 4xs:pr-3 2xs:pl-16 sm:pl-20" type="text"
          placeholder="What needs to be done?" onChange={inputChange} onBlur={addTodoBlur} onFocus={addTodoFocus} onKeyPress={inputEnter} value={input} ref={addInputRef} tabIndex={tab === "todolist" ? 0 : -1} />
        <button
          className={`text-color-700 basis-12 4xs:basis-14 3xs:basis-16 xs:basis-[104px] sm:basis-28 outline-none text-base 2xs:text-lg border-t border-color-500  4xs:border-t-0 4xs:border-l hoverable:hover:bg-color-500 hoverable:hover:text-color-900 focus-visible:bg-color-500 focus-visible:text-color-900 active:active:bg-color-700 active:active:text-color-000 ${enableAnimations && "transition-[color,background-color,visibility] duration-fast active:duration-[0ms]"}`} onClick={addTodo} onBlur={addTodoBlur} ref={addButtonRef} tabIndex={tab === "todolist" ? 0 : -1}>
          Add
        </button>
      </div>
    </div >
  );
}

export default AddTodo;
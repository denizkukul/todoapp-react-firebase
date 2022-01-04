import { ref, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";

function AddTodo({ todos }) {
  const addInputRef = useRef();
  const addButtonRef = useRef();
  const [input, setInput] = useState("");
  const user = useAuthContext();

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

  const inputEnter = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    addTodo();
  }

  useEffect(() => {
    if (todos.length === 0) {
      addInputRef.current.focus();
    }
  }, [todos])

  return (
    <div className={`bg-color-000 outline-color-500 outline outline-1 h-28 rounded-3xl overflow-hidden flex flex-col mb-4 4xs:flex-row xs:mb-5 xs:h-20 xs:rounded-full focus-within:outline-4`}>
      <input className="outline-none flex-1 placeholder:text-color-600 text-center 4xs:text-left 4xs:pl-5 4xs:pr-3 2xs:pl-16 sm:pl-20" type="text"
        placeholder="What needs to be done?" onChange={inputChange} onBlur={addTodoBlur} onKeyPress={inputEnter} value={input} ref={addInputRef} />
      <button
        className="text-color-700 basis-12 border-t border-color-500 text-base 4xs:border-t-0 4xs:border-l 4xs:basis-14 3xs:basis-16 2xs:text-lg xs:basis-[104px] sm:basis-28 hover:bg-color-500 hover:text-color-900 focus-visible:bg-color-500 focus-visible:text-color-900 focus-visible:outline-none active:bg-color-700 active:text-color-000"
        onClick={addTodo} onBlur={addTodoBlur} ref={addButtonRef}>
        Add
      </button>
    </div>
  );
}

export default AddTodo;
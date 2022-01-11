import { ref, runTransaction, set } from "firebase/database";
import { useRef, useState } from "react";
import { MdCheck, MdEdit, MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useSettingsContext, useInitialRenderContext, useAnimationDurationContext } from "../contexts/SettingsContext";
import { db } from "../firebase";

function Todo({ todo, todos, tab, clearTodos, setDeleting }) {
  const [edit, setEdit] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [editVal, setEditVal] = useState("");
  const editInputRef = useRef();
  const saveButtonRef = useRef();
  const user = useAuthContext();
  const enableAnimations = useSettingsContext().enableAnimations;
  const todoContainerRef = useRef();
  const todoRef = useRef();
  const initialRef = useRef(true);
  const initialRender = useInitialRenderContext();
  const animationDurations = useAnimationDurationContext();

  if (initialRender) {
    initialRef.current = false;
  }

  useEffect(() => {
    if (enableAnimations) {
      if ((clearTodos === "completed" && todo.completed) || (clearTodos === "all")) {
        setEdit(false);
        setAnimating(true);
        todoContainerRef.current.classList.remove("py-2", "xs:py-3");
        todoContainerRef.current.classList.add("py-0", "opacity-0");
        todoRef.current.classList.remove("h-28", "xs:h-20");
        todoRef.current.classList.add("h-0");
      }
    }
  }, [clearTodos])

  useEffect(() => {
    /* Adding Animation */
    let timeout;
    if (enableAnimations && !initialRender) {
      setAnimating(true);
      timeout = setTimeout(() => {
        setAnimating(false);
      }, animationDurations.default)
    }
    let x = todoContainerRef.current.offsetWidth; // To prevent browser batching css transition.
    todoContainerRef.current.classList.add("py-2", "xs:py-3");
    todoContainerRef.current.classList.remove("py-0", "opacity-0");
    todoRef.current.classList.add("h-28", "xs:h-20");
    todoRef.current.classList.remove("h-0");
    initialRef.current = false;
    return () => { clearTimeout(timeout) };
  }, [])

  const toggleCompleted = () => {
    if (animating) return;
    let updatedTodos = todos.map(
      item => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed }
        }
        else {
          return item;
        }
      }
    )
    set(ref(db, `${user.uid}/todos`), updatedTodos);
  }

  const startEdit = () => {
    if (animating) return;
    if (enableAnimations) {
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
      }, animationDurations.fast)
    }
    setEdit(true);
    setEditVal(todo.value);
  }

  const saveEdit = () => {
    if (enableAnimations) {
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
      }, animationDurations.fast)
    }
    setEdit(false);
    let regex = new RegExp(/[a-z]/i);
    if (regex.test(editVal)) {
      let updatedTodos = todos.map(
        item => {
          if (item.id === todo.id) {
            return { ...item, value: editVal }
          }
          else {
            return item;
          }
        }
      )
      set(ref(db, `${user.uid}/todos`), updatedTodos);
    }
  }

  const inputEnter = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    saveEdit();
  }

  const editBlur = (e) => {
    if (e.relatedTarget === editInputRef.current || e.relatedTarget === saveButtonRef.current) {
      return
    }
    if (enableAnimations) {
      setAnimating(true);
      setTimeout(() => {
        if (setTimeout) {
          setAnimating(false);
        }
      }, animationDurations.fast)
    }
    setEdit(false);
  }

  const deleteTodo = () => {
    if (animating) return;
    if (enableAnimations) {
      setEdit(false);
      setAnimating(true);
      setDeleting(prevState => prevState + 1);
      todoContainerRef.current.classList.remove("py-2", "xs:py-3");
      todoContainerRef.current.classList.add("py-0", "opacity-0");
      todoRef.current.classList.remove("h-28", "xs:h-20");
      todoRef.current.classList.add("h-0");
      setTimeout(() => {
        setDeleting(prevState => prevState - 1);
        runTransaction(ref(db, `${user.uid}/todos`), todos => {
          if (todos) {
            return todos.filter(item => item.id !== todo.id);
          }
          else {
            return [];
          }
        })
      }, animationDurations.default)
    }
    else {
      let updatedTodos = todos.filter(item => item.id !== todo.id);
      set(ref(db, `${user.uid}/todos`), updatedTodos);
    }
  }

  return (
    <div className={`${enableAnimations && initialRef.current ? "py-0 opacity-0" : "py-2 xs:py-3"} px-2 4xs:px-4 sm:px-6 md:px-10 lg:px-16 ${enableAnimations && "transition-[opacity,padding-top,padding-bottom] duration-default"}`}
      ref={todoContainerRef}>
      <div className={`${enableAnimations && initialRef.current ? "h-0" : "h-28 xs:h-20"} bg-color-000 outline-color-500 outline outline-1 rounded-3xl overflow-hidden flex xs:rounded-full ${enableAnimations && "transition-[height,opacity,box-shadow] duration-todo"} ${edit && "shadow-[0_0_0_4px] shadow-color-500"}`} ref={todoRef}>
        <div className="flex justify-center items-center basis-14 3xs:basis-16 sm:basis-20">
          {/* Check Button */}
          <button className={`flex justify-center items-center h-9 w-9 border border-color-500 2xs:h-10 2xs:w-10 cursor-default rounded-full group outline-none ${enableAnimations && "transition-[opacity,background-color,visibility] duration-fast"} ${(!animating && !edit) && "hoverable:hover:bg-color-500 focus-visible:bg-color-500 active:active:bg-color-700 hoverable:hover:cursor-pointer active:duration-[0ms]"} ${edit ? "invisible opacity-0" : "visible"}`}
            onClick={toggleCompleted} tabIndex={tab === "todolist" ? 0 : -1}>
            {
              todo.completed &&
              <MdCheck className={`fill-color-700 h-6 w-6 2xs:h-7 2xs:w-7 ${enableAnimations && "transition-[fill] duration-fast"} ${!animating && "hoverable:group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:group-active:fill-color-000 group-active:duration-[0ms]"}`} />
            }
          </button>
        </div>
        {/* Todo Value */}
        <div className="flex-1 flex items-center 4xs:pr-3 sm:pr-3">
          {
            edit ?
              <input className="outline-none text-color-700 w-full leading-normal" type="text"
                autoFocus value={editVal} onChange={(e) => { setEditVal(e.target.value) }} onFocus={(e) => { e.target.select() }} onBlur={editBlur} ref={editInputRef} onKeyPress={inputEnter} /> :
              <div className={`${enableAnimations && "transition-[color] duration-default"} h-full flex items-center ${todo.completed ? "line-through text-color-600" : "text-color-700"}`}>
                {todo.value}
              </div>
          }
        </div>
        <div
          className="h-full relative basis-14 flex flex-col justify-evenly items-center 3xs:basis-16 xs:flex-row xs:basis-[104px] xs:justify-between sm:basis-28">
          {/* Save Button */}
          <button className={`bg-color-000 text-color-700 border-l cursor-default border-color-500 text-base 2xs:text-lg w-full h-full absolute outline-none z-10 ${enableAnimations && "transition-[right,color,background-color,visibility] duration-fast"} ${!animating && "hoverable:hover:bg-color-500 hoverable:hover:text-color-900 focus-visible:bg-color-500 focus-visible:text-color-900 active:active:bg-color-700 active:active:text-color-000 hoverable:hover:cursor-pointer active:duration-[0ms]"} ${edit ? "visible right-0" : "invisible right-[-100%]"}`} onClick={saveEdit} onBlur={editBlur} ref={saveButtonRef} >Save</button>
          {/* Edit Button */}
          <button className={`flex justify-center items-center cursor-default h-9 w-9 border border-color-500 2xs:h-10 2xs:w-10 rounded-full group outline-none ${enableAnimations && "transition-[opacity,background-color,visibility] duration-fast"} ${!animating && "hoverable:hover:bg-color-500 focus-visible:bg-color-500 active:active:bg-color-700 hoverable:hover:cursor-pointer active:duration-[0ms]"} ${edit ? "invisible opacity-0" : "visible"}`} onClick={startEdit} tabIndex={tab === "todolist" ? 0 : -1}>
            <MdEdit className={`fill-color-700 h-6 w-6 2xs:h-7 2xs:w-7 ${enableAnimations && "transition-[fill] duration-fast"} ${!animating && "hoverable:group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:group-active:fill-color-000 group-active:duration-[0ms]"}`} />
          </button>
          {/* Delete Button */}
          <button className={`flex justify-center items-center cursor-default h-9 w-9 border border-color-500 2xs:h-10 2xs:w-10 xs:mr-3 sm:mr-5 rounded-full group outline-none ${enableAnimations && "transition-[opacity,background-color,visibility] duration-fast"} ${!animating && "hoverable:hover:bg-color-500 focus-visible:bg-color-500 active:active:bg-color-700 hoverable:hover:cursor-pointer active:duration-[0ms]"} ${edit ? "invisible opacity-0" : "visible"}`} tabIndex={tab === "todolist" ? 0 : -1}>
            <MdDelete className={`fill-color-700 h-6 w-6 2xs:h-7 2xs:w-7 ${enableAnimations && "transition-[fill] duration-fast"} ${!animating && "hoverable:group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:group-active:fill-color-000 group-active:duration-[0ms]"}`} onClick={deleteTodo} />
          </button>
        </div>
      </div>
    </div >
  );
}

export default Todo;
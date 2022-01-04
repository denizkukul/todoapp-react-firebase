import { ref, set } from "firebase/database";
import { useRef, useState } from "react";
import { MdCheck, MdEdit, MdDelete } from "react-icons/md";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";

function Todo({ todo, todos }) {
  const [edit, setEdit] = useState(false);
  const [editVal, setEditVal] = useState("");
  const editInputRef = useRef();
  const saveButtonRef = useRef();
  const user = useAuthContext();

  const toggleCompleted = () => {
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

  const saveEdit = () => {
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
    setEdit(false);
  }

  const deleteTodo = () => {
    let updatedTodos = todos.filter(item => item.id !== todo.id);
    set(ref(db, `${user.uid}/todos`), updatedTodos);
  }

  return (
    <div className="py-2 xs:py-3">
      <div className={`bg-color-000 outline-color-500 outline h-28 rounded-3xl overflow-hidden flex xs:h-20 xs:rounded-full ${edit ? "outline-4" : "outline-1"} `}>
        <div className="flex justify-center items-center basis-14 3xs:basis-16 sm:basis-20">
          {/* Check Button */}
          <button className={`flex justify-center items-center h-9 w-9 border border-color-500 2xs:h-10 2xs:w-10 rounded-full group hover:bg-color-500 focus-visible:bg-color-500 focus-visible:outline-none active:bg-color-700 ${edit ? "invisible" : "visible"}`}
            onClick={toggleCompleted}>
            {
              todo.completed &&
              <MdCheck className="fill-color-700 h-6 w-6 2xs:h-7 2xs:w-7 group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:fill-color-000" />
            }
          </button>
        </div>
        {/* Todo Value */}
        <div className="flex-1 flex items-center 4xs:pr-3 sm:pr-3">
          {
            edit ?
              <input className="outline-none text-color-700 w-full leading-normal" type="text"
                autoFocus value={editVal} onChange={(e) => { setEditVal(e.target.value) }} onFocus={(e) => { e.target.select() }} onBlur={editBlur} ref={editInputRef} onKeyPress={inputEnter} /> :
              <div className={`h-full flex items-center ${todo.completed ? "line-through text-color-600" : "text-color-700"}`}>
                {todo.value}
              </div>
          }
        </div>
        <div
          className="h-full relative basis-14 flex flex-col justify-evenly items-center 3xs:basis-16 xs:flex-row xs:basis-[104px] xs:justify-between sm:basis-28">
          {
            /* Save Button */
            edit && <button className="text-color-700 border-l border-color-500 text-base 2xs:text-lg w-full h-full absolute right-0 hover:bg-color-500 hover:text-color-900 focus-visible:bg-color-500 focus-visible:text-color-900 focus-visible:outline-none active:bg-color-700 active:text-color-000" onClick={saveEdit} onBlur={editBlur} ref={saveButtonRef}>Save</button>}
          {/* Edit Button */}
          <button className={`flex justify-center items-center h-9 w-9 border border-color-500 2xs:h-10 2xs:w-10 rounded-full group hover:bg-color-500 focus-visible:bg-color-500 focus-visible:outline-none active:bg-color-700 ${edit ? "invisible" : "visible"}`}
            onClick={() => { setEdit(true); setEditVal(todo.value) }}>
            <MdEdit className="fill-color-700 h-6 w-6 2xs:h-7 2xs:w-7 group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:fill-color-000" />
          </button>
          {/* Delete Button */}
          <button className={`flex justify-center items-center h-9 w-9 border border-color-500 2xs:h-10 2xs:w-10 xs:mr-3 sm:mr-5 rounded-full group hover:bg-color-500 focus-visible:bg-color-500 focus-visible:outline-none active:bg-color-700 ${edit ? "invisible" : "visible"}`}
            onClick={deleteTodo}>
            <MdDelete className="fill-color-700 h-6 w-6 2xs:h-7 2xs:w-7 group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:fill-color-000" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
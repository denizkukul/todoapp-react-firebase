import { useEffect, useRef, useState } from "react";
import About from "./About";
import AddTodo from "./AddTodo";
import ClearButtons from "./ClearButtons";
import Header from "./Header";
import Settings from "./Settings";
import Todolist from "./Todolist";
import Menu from "./Menu";
import Modal from "./Modal";
import { useAuthContext } from "../contexts/AuthContext";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";
import { useSetSettingsContext } from "../contexts/SettingsContext";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [tab, setTab] = useState("todolist");
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scroll, setScroll] = useState(0);
  const todoAppRef = useRef();
  const user = useAuthContext();
  const setSettings = useSetSettingsContext();

  useEffect(() => {
    let unsubscribe
    if (user) {
      let userDataRef = ref(db, user.uid);
      unsubscribe = onValue(userDataRef, (snaphot) => {
        if (snaphot.exists()) {
          let data = snaphot.val();
          if (data.todos) {
            setTodos(data.todos)
          }
          else {
            setTodos([]);
          }
          if (data.settings) {
            setSettings(data.settings)
          }
        }
        else {
          setTodos([]);
        }
      })
    }
    return unsubscribe;
  }, [])

  const handleScroll = () => {
    if (tab === "todolist") {
      setScroll(todoAppRef.current.scrollTop);
    }
  }

  useEffect(() => {
    if (tab === "todolist") {
      todoAppRef.current.scrollTo(0, scroll);
    }
  }, [tab])

  return (
    <div className="bg-color-200 relative min-w-[240px] max-w-4xl lg:max-w-5xl h-screen mx-auto overflow-scroll" onScroll={handleScroll} ref={todoAppRef}>
      {
        modalVisible &&
        <Modal setTodos={setTodos} modalVisible={modalVisible} setModalVisible={setModalVisible} />
      }
      <div className="fixed w-full max-w-4xl lg:max-w-5xl z-40">
        <Header tab={tab} setTab={setTab} scroll={scroll} setMenuVisible={setMenuVisible} todoAppRef={todoAppRef} />
        {
          tab === "todolist" && menuVisible &&
          <Menu setTab={setTab} setMenuVisible={setMenuVisible} todoAppRef={todoAppRef} />
        }
      </div>
      {/* <!-- App-Container --> */}
      <div className="pt-[4.8rem]  4xs:pt-[6rem] xs:pt-[7.5rem] px-2 4xs:px-4 sm:px-6 md:px-10 lg:px-16">
        {
          tab === "todolist" ?
            <>
              <AddTodo todos={todos} />
              <Todolist todos={todos} />
              <ClearButtons todos={todos} setModalVisible={setModalVisible} />
            </>
            :
            tab === "settings" ?
              <Settings setTab={setTab} /> :
              <About />
        }
      </div>
    </div>
  );
}

export default TodoApp;
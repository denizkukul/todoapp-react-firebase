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
import { useSetInitialRenderContext, useSetSettingsContext } from "../contexts/SettingsContext";
import Shade from "./Shade";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [tab, setTab] = useState("todolist");
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [shadeVisible, setShadeVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [clearTodos, setClearTodos] = useState(false);
  const todoAppRef = useRef();
  const user = useAuthContext();
  const setSettings = useSetSettingsContext();
  const setInitialRender = useSetInitialRenderContext();
  const [deleting, setDeleting] = useState(0);

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
        setInitialRender(false);
      })
    }
    return unsubscribe;
  }, [])

  const handleScroll = () => {
    if (tab === "todolist") {
      if (todoAppRef.current.scrollTop === 0) {
        setScroll(false);
      }
      else {
        setScroll(true);
      }
    }
  }

  return (
    <div className="bg-color-200 relative min-w-[240px] max-w-4xl lg:max-w-5xl h-screen mx-auto overflow-scroll scroll-smooth" onScroll={handleScroll} ref={todoAppRef}>
      {
        modalVisible &&
        <Modal setModalVisible={setModalVisible} clearTodos={clearTodos} setClearTodos={setClearTodos} todos={todos} setDeleting={setDeleting} />
      }
      <div className="fixed w-full max-w-4xl lg:max-w-5xl z-40">
        <Header tab={tab} setTab={setTab} scroll={scroll} setMenuVisible={setMenuVisible} animateOut={animateOut} setAnimateOut={setAnimateOut} todoAppRef={todoAppRef} />
        <Menu tab={tab} setTab={setTab} menuVisible={menuVisible} setMenuVisible={setMenuVisible} setShadeVisible={setShadeVisible} />
        {
          shadeVisible && <Shade animateOut={animateOut} tab={tab} menuVisible={menuVisible} setShadeVisible={setShadeVisible} />
        }
      </div>
      {/* <!-- App-Container --> */}
      <div className="pt-[76px] 4xs:pt-[96px] xs:pt-[120px]">
        <AddTodo todos={todos} tab={tab} todoAppRef={todoAppRef} />
        <Todolist todos={todos} tab={tab} clearTodos={clearTodos} setDeleting={setDeleting} />
        <ClearButtons todos={todos} tab={tab} setModalVisible={setModalVisible} clearTodos={clearTodos} setClearTodos={setClearTodos} deleting={deleting} setDeleting={setDeleting} />
        {
          tab === "settings" && <Settings animateOut={animateOut} setAnimateOut={setAnimateOut} setShadeVisible={setShadeVisible} setTab={setTab} />
        }
        {
          tab === "about" && <About animateOut={animateOut} setAnimateOut={setAnimateOut} setShadeVisible={setShadeVisible} setTab={setTab} />
        }
      </div>
    </div>
  );
}

export default TodoApp;
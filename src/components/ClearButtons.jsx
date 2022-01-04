import { ref, set } from "firebase/database";
import { useAuthContext } from "../contexts/AuthContext";
import { useSettingsContext } from "../contexts/SettingsContext";
import { db } from "../firebase";

function ClearButtons({ todos, setModalVisible }) {
  const settings = useSettingsContext();
  const user = useAuthContext();

  const deleteCompleted = () => {
    let updatedTodos = todos.filter(item => item.completed === false);
    set(ref(db, `${user.uid}/todos`), updatedTodos);
  }

  const handleDeleteAll = () => {
    if (settings.confirmClearAll) {
      setModalVisible(true);
      return
    }
    set(ref(db, `${user.uid}/todos`), []);
  }

  return (
    <div className={`flex flex-col justify-around mx-auto 4xs:flex-row 3xs:pr-4 pb-10 max-w-[700px] ${todos.length === 0 ? "invisible" : "visible"}`}>
      <button className="text-base relative text-color-700 mb-2 4xs:mb-0 2xs:text-lg hover:text-color-900 focus-visible:text-color-900 focus-visible:outline-none active:text-color-000 after:invisible after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:h-[2px]  hover:after:visible focus-visible:after:visible active:after:visible after:bg-color-900 active:after:bg-color-000" onClick={deleteCompleted}>
        Clear completed
      </button>
      <button className="text-base relative text-color-700 mb-2 4xs:mb-0 2xs:text-lg hover:text-color-900 focus-visible:text-color-900 focus-visible:outline-none active:text-color-000 after:invisible after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:h-[2px]  hover:after:visible focus-visible:after:visible active:after:visible after:bg-color-900 active:after:bg-color-000" onClick={handleDeleteAll}>
        Clear all
      </button>
    </div>
  );
}

export default ClearButtons;
import { ref, set } from "firebase/database";
import { useState } from "react";
import { MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";
import { useAuthContext } from "../contexts/AuthContext";
import { useSettingsContext } from "../contexts/SettingsContext";
import { db } from "../firebase";

function Settings({ setTab }) {
  const settings = useSettingsContext();
  const user = useAuthContext();
  const [enableAnimations, setEnableAnimations] = useState(settings.enableAnimations);
  const [confirmClearAll, setConfirmClearAll] = useState(settings.confirmClearAll);

  const saveSettings = () => {
    set(ref(db, `${user.uid}/settings`), { enableAnimations: enableAnimations, confirmClearAll: confirmClearAll });
    setTab("todolist");
  }

  return (
    <div>
      <div className="pb-4 xs:pb-7">
        <button className="bg-color-000 outline-color-500 outline outline-1 h-28 rounded-3xl overflow-hidden xs:h-20 xs:rounded-full group w-full flex justify-between items-center hover:bg-color-400 focus-visible:bg-color-400 active:bg-color-600" onClick={() => { setEnableAnimations(!enableAnimations) }}>
          <div className="text-[17px] text-color-700 justify-start ml-12 group-hover:text-color-900 group-focus-visible:text-color-900 group-active:text-color-000">
            Enable animations
          </div>
          <div className="bg-color-300 basis-24 mr-5 px-[10px] flex justify-between h-10 rounded-full items-center group-hover:bg-color-600 group-focus-visible:bg-color-600 group-active:bg-color-000">
            <div className={`bg-color-000 relative h-[22px] w-[22px] rounded-full ${enableAnimations ? "invisible" : "visible"}`}>
              <MdOutlineCancel className="fill-color-700 rounded-full h-[32px] w-[32px] absolute top-[-5px] left-[-5px] group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:fill-color-900" />
            </div>
            <div className={`bg-color-000 relative h-[22px] w-[22px] rounded-full ${enableAnimations ? "visible" : "invisible"}`}>
              <MdOutlineCheckCircle className="fill-color-700 rounded-full h-[32px] w-[32px] absolute top-[-5px] left-[-5px] group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:fill-color-900" />
            </div>
          </div>
        </button>
      </div>

      <div className="pb-4 xs:pb-7">
        <button className="bg-color-000 outline-color-500 outline outline-1 h-28 rounded-3xl overflow-hidden xs:h-20 xs:rounded-full group w-full flex justify-between items-center hover:bg-color-400 focus-visible:bg-color-400 active:bg-color-600" onClick={() => { setConfirmClearAll(!confirmClearAll) }}>
          <div className="text-[17px] text-color-700 justify-start ml-12 group-hover:text-color-900 group-focus-visible:text-color-900 group-active:text-color-000">
            Confirm when clearing all todos
          </div>
          <div className="bg-color-300 basis-24 mr-5 px-[10px] flex justify-between h-10 rounded-full items-center group-hover:bg-color-600 group-focus-visible:bg-color-600 group-active:bg-color-000">
            <div className={`bg-color-000 relative h-[22px] w-[22px] rounded-full ${confirmClearAll ? "invisible" : "visible"}`}>
              <MdOutlineCancel className="fill-color-700 rounded-full h-[32px] w-[32px] absolute top-[-5px] left-[-5px] group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:fill-color-900" />
            </div>
            <div className={`bg-color-000 relative h-[22px] w-[22px] rounded-full ${confirmClearAll ? "visible" : "invisible"}`}>
              <MdOutlineCheckCircle className="fill-color-700 rounded-full h-[32px] w-[32px] absolute top-[-5px] left-[-5px] group-hover:fill-color-900 group-focus-visible:fill-color-900 group-active:fill-color-900" />
            </div>
          </div>
        </button>
      </div>

      <div className="flex justify-center pt-7">
        <button className="bg-color-000 text-color-700 outline-none border-color-600 text-lg border border-1 h-28 xs:h-16 w-48 rounded-3xl overflow-hidden  xs:rounded-full justify-center hover:bg-color-500 focus-visible:bg-color-500 hover:text-color-900 focus-visible:text-color-900 active:bg-color-700 active:text-color-000" onClick={saveSettings}>
          Save
        </button>
      </div>
    </div >
  );
}

export default Settings;
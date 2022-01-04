import { createContext, useState, useContext } from "react";

const SettingsContext = createContext();
const SetSettingsContext = createContext();

export const useSettingsContext = () => {
  return useContext(SettingsContext)
}

export const useSetSettingsContext = () => {
  return useContext(SetSettingsContext)
}

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({ enableAnimations: true, confirmClearAll: false });

  return (
    <SetSettingsContext.Provider value={setSettings}>
      <SettingsContext.Provider value={settings}>
        {children}
      </SettingsContext.Provider>
    </SetSettingsContext.Provider>
  );
}

export default SettingsProvider;

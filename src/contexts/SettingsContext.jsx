import { createContext, useState, useContext } from "react";

const SettingsContext = createContext();
const SetSettingsContext = createContext();
const InitialRenderContext = createContext();
const SetInitialRenderContext = createContext();
const AnimationDurationContext = createContext();

export const useAnimationDurationContext = () => {
  return useContext(AnimationDurationContext)
}

export const useSettingsContext = () => {
  return useContext(SettingsContext)
}

export const useSetSettingsContext = () => {
  return useContext(SetSettingsContext)
}

export const useInitialRenderContext = () => {
  return useContext(InitialRenderContext)
}

export const useSetInitialRenderContext = () => {
  return useContext(SetInitialRenderContext)
}

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({ enableAnimations: true, confirmClearAll: false });
  const [initialRender, setInitialRender] = useState(true);
  const animationDurations = { default: 300, fast: 150 };

  return (
    <SetInitialRenderContext.Provider value={setInitialRender}>
      <InitialRenderContext.Provider value={initialRender}>
        <SetSettingsContext.Provider value={setSettings}>
          <SettingsContext.Provider value={settings}>
            <AnimationDurationContext.Provider value={animationDurations}>
              {children}
            </AnimationDurationContext.Provider>
          </SettingsContext.Provider>
        </SetSettingsContext.Provider >
      </InitialRenderContext.Provider >
    </SetInitialRenderContext.Provider >
  );
}

export default SettingsProvider;

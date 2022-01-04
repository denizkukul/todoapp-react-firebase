import SettingsProvider from "./contexts/SettingsContext";
import AuthProvider from "./contexts/AuthContext";
import Main from "./components/Main";

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Main />
      </SettingsProvider>
    </AuthProvider>
  )
}

export default App;

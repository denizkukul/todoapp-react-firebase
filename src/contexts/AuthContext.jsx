import { createContext, useState, useContext } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();
const LoadingContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const useLoadingContext = () => {
  return useContext(LoadingContext)
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User signed in
        setUser(user);
        setLoading(false);
        //getUserData();
      }
      else {
        // User signed out
        setUser(null);
        setLoading(false);
        //clearUserData();
      }
    })
    return unsubscribe
  }, [])


  return (
    <LoadingContext.Provider value={loading}>
      <AuthContext.Provider value={user}>
        {children}
      </AuthContext.Provider>
    </LoadingContext.Provider>
  );
}

export default AuthProvider;

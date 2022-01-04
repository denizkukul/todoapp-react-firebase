import Loading from "./Loading";
import TodoApp from "./TodoApp";
import SignIn from "./SignIn";
import { useAuthContext, useLoadingContext } from "../contexts/AuthContext";

function Main() {
  const loading = useLoadingContext();
  const user = useAuthContext();

  return (
    <div className="bg-color-400 select-none">
      {
        loading ?
          <Loading /> :
          user === null ?
            <SignIn /> :
            <TodoApp />
      }
    </div>
  );
}

export default Main;
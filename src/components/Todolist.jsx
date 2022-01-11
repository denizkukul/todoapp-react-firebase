import Todo from "./Todo";

function Todolist({ todos, tab, clearTodos, setDeleting }) {
  return (
    <div>
      {
        todos.map((todo) => {
          return (
            <Todo key={todo.id} todo={todo} todos={todos} tab={tab} clearTodos={clearTodos} setDeleting={setDeleting} />
          )
        })
      }
    </div>
  )
}

export default Todolist;
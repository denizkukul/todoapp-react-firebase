import Todo from "./Todo";

function Todolist({ todos }) {
  return (
    <div className="todolist mb-4">
      {
        todos.map((todo, i) => {
          return (
            <Todo key={i} todo={todo} todos={todos} />
          )
        })
      }
    </div>
  )
}

export default Todolist;
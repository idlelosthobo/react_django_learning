function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.completed ? "line-through" : "" }}
    >
      {todo.title}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

const useFetch = url => {
  const [data, setData] = React.useState(null);

  async function fetchData() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
  }

  React.useEffect(() => {fetchData()},[url]);

  console.log(data);
  return data;
};

function App() {

  const data = useFetch("http://127.0.0.1:8000/api/todos/");

  const [todos, setTodos] = React.useState(null)

  React.useEffect(() => {
    if (data) {
      const formattedUsers = data.map((obj, i) => {
        return {
          id: obj.id,
          title: obj.title,
          description: obj.description,
        };
      });
      setTodos(formattedUsers);
    }
  }, [data]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };


  return (
    <div className="app">
      <div className="todo-list">
        { !todos ? (
          <p>Loading...</p>
        ) : (
          todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))
        )}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}
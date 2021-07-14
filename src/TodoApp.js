import { Component } from 'react';
import { todoAPI } from './api';
import { TodoForm } from './components/TodoForm';

export class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      todos: [],
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    todoAPI.getMany()
      .then((todos) => {
        this.setState({
          loading: false,
          todos,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: err,
        });
        this.errorNotification(err);
      });
  }

  createTodo = (body) => {
    todoAPI.createOne(body)
      .then((todo) => {
        const { todos } = this.state;
        this.setState({
          todos: [todo, ...todos],
        });
      });
  };


  updateTodo = (index, values) => {
    const { todos } = this.state;
    const todo = todos[index];

    todoAPI.updateOne(todo?.id, values)
      .then((updatedTodo) => {
        const { todos } = this.state;
        const newTodos = [...todos];
        newTodos[index] = updatedTodo;

        this.setState({
          todos: newTodos,
        });
      })
      .catch(this.errorNotification);
  };

  toggleTodo = (index) => {
    const { todos } = this.state;
    const todo = todos[index];

    this.updateTodo(index, {
      isDone: !todo.isDone,
    });
  };


  removeTodo = (index) => {
    const { todos } = this.state;
    const todo = todos[index];
    todoAPI.deleteOne(todo?.id)
      .then(() => {
        const { todos } = this.state;
        const newTodos = [...todos];
        newTodos.splice(index, 1);

        this.setState({
          todos: newTodos,
        });
      })
      .catch(this.errorNotification);
  };


  errorNotification = (err) => {
    alert(err.message ?? 'Something went wrong!');
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <h1>NEW APP</h1>
        <TodoForm onSubmit={(values) => {
          const { body } = values;
          this.createTodo(body);
        }} />
        <ul>
          {
            todos.map(
              (todo, index) => (
                <li key={todo.id}>
                  {JSON.stringify(todo, null, 4)}
                  <input type="checkbox" checked={todo.isDone} onChange={() => this.toggleTodo(index)} />
                  <button onClick={() => this.removeTodo(index)}>REMOVE</button>
                </li>
              ),
            )
          }
        </ul>
      </>
    );
  }
}

export default TodoApp;

import { Component } from 'react';

export const API_URL = 'http://localhost:8080';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      todos: [],
    };
  }

  createTodo = (values) => {
    fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        const { todos } = this.state;
        this.setState({
          todos: [data, ...todos],
        });
      })
      .catch((err) => {
        alert(err?.message ?? 'Something went wrong!');
      });
  };

  getManyTodos = () => {

  }

  updateTodoById = () => {

  };

  removeTodoById = () => {

  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <button
          onClick={() => {
            this.createTodo({
              body: `Todo From React Button ${Date.now()}!`,
              isDone: true,
              createdAt: new Date().toISOString(),
            });
          }}
        >
          CREATE ONE TODO
        </button>
        <h1>NEW TODOS:</h1>
        <ul>
          {
            todos.map(todo => <li>{JSON.stringify(todo, null, 4)}</li>)
          }
        </ul>
      </>);
  }
}

export default App;

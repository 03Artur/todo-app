export class TodoApi {
  /**
   *
   * @param {string} options.baseURL
   */
  constructor(options) {
    this.baseURL = `${options.baseURL}/todos`;
  }

  /**
   *
   * @param {String} body
   */
  createOne = (body) => {
    const newTodo = {
      body,
      isDone: false,
      createdAt: new Date(),
    };
    return fetch(`${this.baseURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json());
  };

  getMany = () => {
    return fetch(`${this.baseURL}?_sort=createdAt&_order=desc`)
      .then((response) => response.json());
  };

  /**
   *
   * @param {String|Number} todoId
   */
  getOne = (todoId) => {
    return fetch(`${this.baseURL}/${todoId}`)
      .then((response) => response.json());
  };

  /**
   *
   * @param {String|Number} todoId
   * @param {Boolean} values.isDone
   * @param {String} values.body
   */
  updateOne = (todoId, values) => {
    return fetch(`${this.baseURL}/${todoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((response) => response.json());
  };

  /**
   *
   * @param {String|Number} todoId
   */
  deleteOne = (todoId) => {
    return fetch(`${this.baseURL}/${todoId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        const { status, ok, statusText } = response;
        if (ok) {
          return response;
        }
        throw new Error(`Todo (id: ${todoId}) ${status} ${statusText}`);
      });
  };
}

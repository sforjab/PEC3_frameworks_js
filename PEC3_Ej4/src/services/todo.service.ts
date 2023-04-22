/**
 * @class Service
 *
 * Manages the data of the application.
 */
import { Todo } from '../models/todo.model';

export class TodoService {
  todos: Todo[];
  onTodoListChanged: (todos: Todo[]) => void = () => {};

  constructor() {
    const todoLS: string | null = localStorage.getItem('todos');
    this.todos = (todoLS ? JSON.parse(todoLS) : []).map(
      (todo: Todo) => new Todo(todo)
    );
  }

  bindTodoListChanged(callback: (todos: Todo[]) => void): void {
    this.onTodoListChanged = callback;
  }

  _commit(todos: Todo[]): void {
    this.onTodoListChanged(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  addTodo(text: string): void {
    this.todos.push(new Todo({ text }));

    this._commit(this.todos);
  }

  editTodo(id: string, updatedText: string): void {
    this.todos = this.todos.map(todo =>
      todo.id === id
        ? new Todo({
            ...todo,
            text: updatedText
          })
        : todo
    );

    this._commit(this.todos);
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter(todo => todo.id !== id);

    this._commit(this.todos);
  }

  toggleTodo(id: string): void {
    this.todos = this.todos.map(todo =>
      todo.id === id ? new Todo({ ...todo, complete: !todo.complete }) : todo
    );

    this._commit(this.todos);
  }
}

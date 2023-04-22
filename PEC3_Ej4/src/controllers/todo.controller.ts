/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { TodoView } from '../views/todo.views';

export class TodoController {
  service: TodoService;
  view: TodoView;

  constructor(service: TodoService, view: TodoView) {
    this.service = service;
    this.view = view;

    // Explicit this binding
    this.service.bindTodoListChanged(this.onTodoListChanged);
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindEditTodo(this.handleEditTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);

    // Display initial todos
    this.onTodoListChanged(this.service.todos);
  }

  onTodoListChanged = (todos: Todo[]): void => {
    this.view.displayTodos(todos);
  };

  handleAddTodo = (todoText: string): void => {
    this.service.addTodo(todoText);
  };

  handleEditTodo = (id: string, todoText: string): void => {
    this.service.editTodo(id, todoText);
  };

  handleDeleteTodo = (id: string): void => {
    this.service.deleteTodo(id);
  };

  handleToggleTodo = (id: string): void => {
    this.service.toggleTodo(id);
  };
}

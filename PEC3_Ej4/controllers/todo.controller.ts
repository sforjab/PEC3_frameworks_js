/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class TodoController {
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

  onTodoListChanged = (todos: Todo[]) => {
    this.view.displayTodos(todos);
  };

  handleAddTodo = (todoText: string) => {
    this.service.addTodo(todoText);
  };

  handleEditTodo = (id: number, todoText: string) => {
    this.service.editTodo(id, todoText);
  };

  handleDeleteTodo = (id: number) => {
    this.service.deleteTodo(id);
  };

  handleToggleTodo = (id: number) => {
    this.service.toggleTodo(id);
  };
}

// import { TodoItem } from './to-do-item.model';

// export class ToDoListService {

//     private toDoItems: TodoItem[] =
//     [new TodoItem(1, "take care of Rebecca", "My cute little daughter", 10),
//      new TodoItem(2, "Study for CCNA", "Very interesting topics", 5),
//      new TodoItem(3, "WebEngineering Project", "Very interesting topics", 5),
//      new TodoItem(4, "Cooking", "Very interesting topics", 5),
//      new TodoItem(5, "Sleeping", "Very interesting topics", 5)];


//      getToDoItems(){
//          return this.toDoItems.slice();
//      }
// }

import {Injectable} from '@angular/core';
import { TodoItem } from './to-do-item.model';

@Injectable()
export class TodoListService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of ids
  lastId: number = 0;

  // Placeholder for todos
  todos: TodoItem[] = [];

  constructor() {
  }

  // Simulate POST /todos
  addTodo(todo: TodoItem): TodoListService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoListService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): TodoItem {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Simulate GET /todos
  getAllTodos(): TodoItem[] {
    return this.todos;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): TodoItem {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleTodoComplete(todo: TodoItem){
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }

}
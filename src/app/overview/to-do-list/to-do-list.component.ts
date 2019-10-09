import { Component, OnInit } from '@angular/core';
import { TodoListService } from './to-do-list.service';
import { TodoItem } from './to-do-item.model';
import { faBriefcase, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.sass'],
  providers: [TodoListService]
})
export class ToDoListComponent implements OnInit {

  faBriefcase = faBriefcase;
  faTrash = faTrash;

  toDoItems: TodoItem[];
  newTodoItem: TodoItem = new TodoItem;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
    // this.toDoItems = this.todoListService.getToDoItems();
  }

  addTodo() {
    this.todoListService.addTodo(this.newTodoItem);
    this.newTodoItem = new TodoItem();
  }

  toggleTodoComplete(todo) {
    this.todoListService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoListService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoListService.getAllTodos();
  }

}

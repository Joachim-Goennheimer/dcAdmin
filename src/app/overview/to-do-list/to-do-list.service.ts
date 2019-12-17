import { Injectable } from '@angular/core';
import { TodoItem } from './to-do-item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class TodoListService {

  serverUrl = 'http://localhost:3000';

  // Placeholder for last id so we can simulate
  // automatic incrementing of ids
  lastId = 0;

  // Placeholder for todos
  todos: TodoItem[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  // Simulate POST /todos
  addTodo(todo: TodoItem): TodoListService {

    const accessToken = this.authService.getToken();
    const httpOptions = {
            headers: new HttpHeaders({
              'x-access-token': accessToken
            })
        };

    this.http.post(this.serverUrl + '/createTodo', {todoTitle: todo.title}, httpOptions)
    .subscribe(
      (response: Response) => {
        console.log(response);
      },
      (error) => console.log(error)
      );
    this.loadAllTodos();
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoListService {

    const accessToken = this.authService.getToken();
    const httpOptions = {
            headers: new HttpHeaders({
              'x-access-token': accessToken
            })
        };

    this.http.post(this.serverUrl + '/deleteTodo', {todoID: id}, httpOptions)
    .subscribe(
      (response: Response) => {
        console.log(response);
        this.loadAllTodos();
      },
      (error) => {
        console.log(error);
        this.loadAllTodos();
      }
      );

    // this.todos = this.todos
    //   .filter(todo => todo.id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: object = {}): TodoItem {
    const todo = this.getTodoById(id);
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

  loadAllTodos() {
    class ReturnObjectFormat {
      todos: TodoItem[];
  }
    const accessToken = this.authService.getToken();
    const httpOptions = {
            headers: new HttpHeaders({
              responseType:  'application/json',
            //   'Authorization': 'my-auth-token',
              'x-access-token': accessToken
            })
        };
    this.http.get<ReturnObjectFormat>(this.serverUrl + '/todos', httpOptions)
    .subscribe(
      (response) => {
        this.todos = [];
        response.todos.forEach((todo: TodoItem) => {
          this.todos.push(todo);
        });

        console.log(response);
      },
      (error) => console.log(error)
      );

  }

  // Simulate GET /todos/:id
  getTodoById(id: number): TodoItem {
    return this.todos
      .filter(todo => todo._id === id)
      .pop();
  }

  // Toggle todo complete
  toggleTodoComplete(todo: TodoItem) {

    const accessToken = this.authService.getToken();
    const httpOptions = {
            headers: new HttpHeaders({
              // 'responseType':  'application/json',
            //   'Authorization': 'my-auth-token',
              'x-access-token': accessToken
            })
    };

    let requestType = 'markTodo';
    if (todo.marked) {
      requestType = 'unmarkTodo';
    }

    this.http.post(this.serverUrl + '/' + requestType, {todoID: todo._id}, httpOptions)
    .subscribe(
      (response: Response) => {
        console.log(response);
        this.loadAllTodos();
      },
      (error) => {
        console.log(error);
        this.loadAllTodos();
      }
      );
    // let updatedTodo = this.updateTodoById(todo._id, {
    //   complete: !todo.marked
    // });
    // return updatedTodo;
  }

}

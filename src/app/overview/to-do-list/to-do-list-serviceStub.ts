import { Observable, of, forkJoin } from 'rxjs';
import { TodoItem } from './to-do-item.model';

const testData = [
    new TodoItem({_id: 12, title: 'testTodo1', marked: true}),
    new TodoItem({_id: 15, title: 'testTodo2', marked: false}),

];

export class TodoListStub {

    todos: TodoItem[] = [];

    public loadAllTodos() {

            this.todos.push(new TodoItem({_id: 12, title: 'testTodo1', marked: true}));
            this.todos.push(new TodoItem({_id: 15, title: 'testTodo2', marked: false}));

    }

    addTodo(todo: TodoItem) {
        this.todos.push(todo);
    }

    deleteTodoById(id: number) {

        const index = this.todos.map((item) => {
            return item._id;
        }).indexOf(12);
        this.todos.splice(index, 1);

    }

    getAllTodos(): TodoItem[] {
        return this.todos;
      }
}

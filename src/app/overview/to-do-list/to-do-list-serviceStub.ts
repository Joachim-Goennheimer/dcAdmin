import { Observable, of, forkJoin } from 'rxjs';
import { TodoItem } from './to-do-item.model';

const testData = [
    new TodoItem({_id: 12, title: "testTodo1", marked: true}),
    new TodoItem({_id: 15, title: "testTodo2", marked: false}),

]



export class TodoListStub {

    todos: TodoItem[] = [];

    public loadAllTodos() {

            this.todos.push(new TodoItem({_id: 12, title: "testTodo1", marked: true}));
            this.todos.push(new TodoItem({_id: 15, title: "testTodo2", marked: false}));

    }

    addTodo(todo: TodoItem) {
        this.todos.push(todo);
        // this.loadAllTodos;
    }

    deleteTodoById(id: number) {

        console.log("in delete function");
        console.log(this.todos);
        // let deleteTodo = new TodoItem({_id: 12, title: "testTodo1", marked: true})

        // let removeIndex = this.todos.indexOf(deleteTodo);
        // console.log("removeIndex: " + removeIndex);
        // if(removeIndex > -1) {
        //     console.log("removing");
        //     this.todos.splice(removeIndex, 1);
        // }

        // let newArray = this.todos.filter(function(todo) {
        //     return todo._id !== id;
        // });

        var index = this.todos.map(function(item) {
            return item._id
        }).indexOf(12);
        
        this.todos.splice(index, 1);

        console.log("after delete");
        console.log(this.todos);
    }

    getAllTodos(): TodoItem[] {
        console.log("getTodos in stub");
        return this.todos;
    
      }
}
import { ToDoItem } from './to-do-item.model';

export class ToDoListService {

    private toDoItems: ToDoItem[] =
    [new ToDoItem("take care of Rebecca", "My cute little daughter", 10),
     new ToDoItem("Study for CCNA", "Very interesting topics", 5),
     new ToDoItem("WebEngineering Project", "Very interesting topics", 5),
     new ToDoItem("Cooking", "Very interesting topics", 5),
     new ToDoItem("Sleeping", "Very interesting topics", 5)];


     getToDoItems(){
         return this.toDoItems.slice();
     }
}
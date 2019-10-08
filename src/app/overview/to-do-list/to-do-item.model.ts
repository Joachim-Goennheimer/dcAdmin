
export class ToDoItem {
    title: string;
    description: string;
    importance: number;


    constructor(title: string, description: string, importance: number){

        this.title = title;
        this.description = description;
        this.importance = importance;

    }
}
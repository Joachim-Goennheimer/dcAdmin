import { Component, OnInit } from '@angular/core';
import { ToDoListService } from './to-do-list.service';
import { ToDoItem } from './to-do-item.model';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.sass'],
  providers: [ToDoListService]
})
export class ToDoListComponent implements OnInit {

  toDoItems: ToDoItem[];

  constructor(private toDoListService: ToDoListService) { }

  ngOnInit() {
    this.toDoItems = this.toDoListService.getToDoItems();
  }

}

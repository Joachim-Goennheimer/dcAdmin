import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ToDoListComponent } from './to-do-list.component';
import { TodoListService } from './to-do-list.service';
import { TodoListStub } from './to-do-list-serviceStub';
import { TodoItem } from './to-do-item.model';
import { Observable, of, forkJoin } from 'rxjs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';




describe('ToDoListComponent', () => {

    let comp: ToDoListComponent;
    let fixture: ComponentFixture<ToDoListComponent>;
    let todoListStub: TodoListStub;
     

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToDoListComponent],
            imports: [
                FontAwesomeModule,
                FormsModule,
                HttpClientModule,
                RouterTestingModule
            ]
        }).overrideComponent(ToDoListComponent, {
            set: {
                providers: [ 
                    {provide: TodoListService, useClass: TodoListStub},
                    AuthService
                ]

            }
        })
        .compileComponents();
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(ToDoListComponent);

        comp = fixture.componentInstance;
        todoListStub = fixture.debugElement.injector.get(TodoListService);

        // const spy = spyOn(todoListStub, 'loadAllTodos');

        fixture.detectChanges();

    })

    it('should create', () => {
        expect(comp).toBeTruthy();
    });

    it('should load todos into component', fakeAsync(() => {
        const spy = spyOn(todoListStub, 'loadAllTodos');
        tick();
        expect(comp.todos[0]._id).toBe(12);
        expect(comp.todos[0].title).toBe('testTodo1');
        expect(comp.todos[0].marked).toBe(true);

        expect(comp.todos[1]._id).toBe(15);
        expect(comp.todos[1].title).toBe('testTodo2');
        expect(comp.todos[1].marked).toBe(false);
    }));

    it('should display todos to the user', fakeAsync(() => {
        const spy = spyOn(todoListStub, 'loadAllTodos');
        tick();
        let toDoDisplayElement: DebugElement = fixture.debugElement.query(By.css('.view > label'));
        expect(toDoDisplayElement.nativeElement.textContent).toContain('testTodo1');
    }));

    it('should add todo', fakeAsync(() => {
        // tried to simulate user adding todo in input field but didn't work. Changed it manually.
        // let todoInputElement: DebugElement = fixture.debugElement.query(By.css('.new-todo'));
        // todoInputElement.nativeElement.value = "inputTodo";

        comp.newTodoItem.title = "inputTodo";

        fixture.detectChanges();
        expect(comp.newTodoItem.title).toBe("inputTodo");
        comp.addTodo();
        tick();
        expect(comp.todos[2].title).toBe("inputTodo");


    }));

    it('should delete todo', fakeAsync(() => {
        // tried to simulate user adding todo in input field but didn't work. Changed it manually.
        // let todoInputElement: DebugElement = fixture.debugElement.query(By.css('.new-todo'));
        // todoInputElement.nativeElement.value = "inputTodo";

        spyOn(todoListStub, 'loadAllTodos');
        tick();
        fixture.detectChanges();
        comp.removeTodo(12);
        expect(comp.todos[0].title).not.toBe("testTodo1");


    }));

})
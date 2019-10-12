import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportControlComponent } from './import-control.component';

describe('ImportControlComponent', () => {
  let component: ImportControlComponent;
  let fixture: ComponentFixture<ImportControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

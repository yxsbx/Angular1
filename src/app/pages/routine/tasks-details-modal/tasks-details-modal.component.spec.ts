import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDetailsModalComponent } from './tasks-details-modal.component';

describe('TasksDetailsModalComponent', () => {
  let component: TasksDetailsModalComponent;
  let fixture: ComponentFixture<TasksDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksDetailsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

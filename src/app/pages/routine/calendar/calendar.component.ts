import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DaysComponent } from './days/days.component';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task-TEMP'; //TEMPORARY, JUST TO ORGANIZE

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DaysComponent, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @Input() currentMonth: number = new Date().getMonth();
  @Input() currentYear: number = new Date().getFullYear();
  @Input() scrolled: boolean = false;
  @Input() isModalOpen: boolean = false;

  @Output() tasksSelected = new EventEmitter<Task[]>();
  handleTasksFromDays(tasks: Task[]) {
    this.tasksSelected.emit(tasks);
  }

  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}

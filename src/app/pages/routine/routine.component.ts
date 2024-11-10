import { Component } from '@angular/core';
import { RoutineHeaderComponent } from './routine-header/routine-header.component';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [RoutineHeaderComponent, CalendarComponent],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.scss',
})
export class RoutineComponent {
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();

  updateDate(date: Date): void {
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
  }
}

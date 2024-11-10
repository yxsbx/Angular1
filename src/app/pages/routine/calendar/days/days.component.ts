import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { ShowTasksComponent } from './show-tasks/show-tasks.component';

@Component({
  selector: 'app-days',
  standalone: true,
  imports: [CommonModule, MatGridListModule, ShowTasksComponent],
  templateUrl: './days.component.html',
  styleUrl: './days.component.scss',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('300ms ease-in')]),
      transition(':leave', [animate('300ms ease-in')]),
    ]),
    trigger('moveDown', [
      state('active', style({ padding: '75px 0 0 25px' })),
      state('inactive', style({ padding: '40px 0 0 25px' })),
      transition('inactive => active', [animate('300ms ease-in')]),
      transition('active => inactive', [animate('300ms ease-out')]),
    ]),
  ],
})
export class DaysComponent implements OnChanges {
  @Input() month: number = 0;
  @Input() year: number = 0;
  @Input() scrolled: boolean = false;

  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthDays: { day: number | null; weekday: string | null }[] = [];

  tasksByDay: { [key: string]: string[] } = {
    '2024-11-01': ['Task 1', 'Task 2'],
    '2024-11-03': ['Task 1', 'Task 2'],
    '2024-11-15': ['Task 1'],
    '2024-11-22': ['Task 1', 'Task 2', 'Task 3'],
    '2024-10-22': ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
    '2024-11-10': ['Task 1', 'Task 2', 'Task 3', 'teste1', 'teste2'],
  };

  isToday(day: number | null): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.month === today.getMonth() &&
      this.year === today.getFullYear()
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['month'] || changes['year']) {
      this.fillCalendar();
    }
  }

  fillCalendar() {
    this.monthDays = new Array(28).fill({ day: null, weekday: null });
    const firstDayOfMonth = new Date(this.year, this.month, 1);
    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    for (let i = 0; i < daysInMonth; i++) {
      const currentDay = new Date(this.year, this.month, i + 1);
      this.monthDays[startDay + i] = {
        day: i + 1,
        weekday: this.weekdays[currentDay.getDay()],
      };
    }
  }

  alertDateAndTasks(day: number | null, weekday: string | null) {
    if (day) {
      const formattedDay = day.toString().padStart(2, '0');
      const formattedMonth = (this.month + 1).toString().padStart(2, '0');

      const key = `${this.year}-${formattedMonth}-${formattedDay}`;
      const tasks = this.tasksByDay[key] || 'No tasks this day';

      alert(
        `YEAR: ${this.year}, MONTH: ${
          this.month + 1
        }, DAY: ${day}, WEEKDAY: ${weekday}\n\nTASKS:\n${tasks}`
      );
    }
  }

  generateDateKey(day: number | null): string {
    if (!day) return '';
    const year = this.year;
    const month = this.month + 1;
    const dayOfMonth = day;
    return `${year}-${month < 10 ? '0' + month : month}-${
      dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth
    }`;
  }
}

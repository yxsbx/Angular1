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

interface Task {
  title: string;
  startDate: string;
  endDate: string;
}

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

  tasksByDay: {
    [key: string]: { title: string; startDate: string; endDate: string }[];
  } = {
    '2024-10-30': [
      { title: 'Task Test', startDate: '2024-10-30', endDate: '2024-11-02' },
    ],
    '2024-11-01': [
      { title: 'Task A', startDate: '2024-11-01', endDate: '2024-11-02' },
      { title: 'Task B', startDate: '2024-11-01', endDate: '2024-11-03' },
    ],
    '2024-11-03': [
      { title: 'Task C', startDate: '2024-11-05', endDate: '2024-11-06' },
    ],
    '2024-11-10': [
      { title: 'Task D', startDate: '2024-11-10', endDate: '2024-11-12' },
    ],
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
    if (changes['month'] || changes['year'] || changes['tasksByDay']) {
      this.fillCalendar();
      this.generateTasksForCalendar();
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

  receivedData: {} = {};
  handleDataFromChild(tasks: Task[]) {
    this.receivedData = tasks;
    if (tasks.length > 0)
      alert(
        tasks
          .map(
            (task) =>
              `${task.title} - START: ${task.startDate} - END: ${task.endDate}\n`
          )
          .join('')
      );
  }

  generateDateKey(day: number): string {
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = (this.month + 1).toString().padStart(2, '0');
    return `${this.year}-${formattedMonth}-${formattedDay}`;
  }

  expandedTasksByDay: {
    [key: string]: { title: string; startDate: string; endDate: string }[];
  } = {};
  generateTasksForCalendar(): void {
    const allTasks: {
      [key: string]: { title: string; startDate: string; endDate: string }[];
    } = {};

    Object.keys(this.tasksByDay).forEach((key) => {
      this.tasksByDay[key].forEach((task) => {
        const start = new Date(task.startDate);
        const end = new Date(task.endDate);

        for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
          const formattedDate = date.toISOString().split('T')[0];
          if (!allTasks[formattedDate]) {
            allTasks[formattedDate] = [];
          }
          allTasks[formattedDate].push(task);
        }
      });
    });

    this.expandedTasksByDay = allTasks;
  }
}

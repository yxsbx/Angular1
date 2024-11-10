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

@Component({
  selector: 'app-days',
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: './days.component.html',
  styleUrl: './days.component.scss',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('300ms ease-in')]),
      transition(':leave', [animate('300ms ease-in')]),
    ]),
    trigger('modeDown', [
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

  alertDate(day: number | null, weekday: string | null) {
    if (day)
      alert(
        `YEAR: ${this.year}, MONTH: ${
          this.month + 1
        }, DAY: ${day}, WEEKDAY: ${weekday}`
      );
  }
}

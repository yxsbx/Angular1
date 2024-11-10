import { Component, Input } from '@angular/core';
import { DaysComponent } from './days/days.component';
import { CommonModule } from '@angular/common';

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

  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}

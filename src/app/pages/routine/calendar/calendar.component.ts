import { Component, Input } from '@angular/core';
import { DaysComponent } from './days/days.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DaysComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @Input() currentMonth: number = 0;
  @Input() currentYear: number = 0;
}

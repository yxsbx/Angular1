import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-days',
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: './days.component.html',
  styleUrl: './days.component.scss',
})
export class DaysComponent implements OnChanges {
  @Input() month: number = 0; // Recebe o mês
  @Input() year: number = 0; // Recebe o ano

  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthDays: (number | null)[] = []; // Dias do mês na grid

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['month'] || changes['year']) {
      this.fillCalendar();
    }
  }

  fillCalendar() {
    this.monthDays = new Array(0).fill(null);
    const firstDayOfMonth = new Date(this.year, this.month, 1);
    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    for (let i = 0; i < daysInMonth; i++) {
      this.monthDays[startDay + i] = days[i];
    }
  }
}

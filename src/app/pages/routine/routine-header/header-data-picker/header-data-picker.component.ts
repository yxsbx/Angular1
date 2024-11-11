import {
  ChangeDetectionStrategy,
  Component,
  model,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-header-data-picker',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header-data-picker.component.html',
  styleUrls: ['./header-data-picker.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('100ms ease-in')]),
    ]),
  ],
})
export class HeaderDataPickerComponent {
  selected = model<Date | null>(null);

  @Output() dateSelected = new EventEmitter<Date>();

  constructor() {
    this.selected.subscribe((newDate) => {
      if (newDate) {
        this.dateSelected.emit(newDate);
      }
    });
  }

  selectedMonth(): number {
    let selectedMonth = new Date().getMonth() + 1;
    if (this.selected()) {
      selectedMonth = Number(this.selected()?.getMonth()) + 1;
    }
    return selectedMonth;
  }

  selectedYear(): number {
    let selectedYear = new Date().getFullYear();
    if (this.selected()) {
      selectedYear = Number(this.selected()?.getFullYear());
    }
    return selectedYear;
  }
}

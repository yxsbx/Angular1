import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderDataPickerComponent } from './header-data-picker/header-data-picker.component';

@Component({
  selector: 'app-routine-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    HeaderDataPickerComponent,
  ],
  templateUrl: './routine-header.component.html',
  styleUrl: './routine-header.component.scss',
})
export class RoutineHeaderComponent {
  public currentDate = new Date();
  public currentMonthIndex: number = this.currentDate.getMonth();
  public currentDay = this.currentDate.getDate();
  public monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  @Output() dateSelected = new EventEmitter<Date>();

  selectedDate: Date | null = null;
  onDatePickerSelect(date: Date): void {
    this.dateSelected.emit(date);
    this.selectedDate = date;
  }

  isRotated = false;
  toggleRotation(): void {
    this.isRotated = !this.isRotated;
  }

  selectCurrentDay() {
    this.selectedDate = this.currentDate;
    this.dateSelected.emit(this.currentDate);
  }

  public currentMonthName(): any {
    if (this.selectedDate) {
      return this.monthNames[this.selectedDate.getMonth()];
    } else {
      return this.monthNames[this.currentMonthIndex];
    }
  }
}

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineHeaderComponent } from './routine-header/routine-header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TasksDetailsModalComponent } from './tasks-details-modal/tasks-details-modal.component';
import { Task } from '../../models/task-TEMP'; //TEMPORARY, JUST TO ORGANIZE

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [
    RoutineHeaderComponent,
    CalendarComponent,
    TasksDetailsModalComponent,
    CommonModule,
  ],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.scss',
})
export class RoutineComponent {
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  selectedTasks: Task[] = [];

  updateDate(date: Date): void {
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
  }

  scrolled: boolean = false;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const triggerPoint = 200;
    this.scrolled = scrollPosition >= triggerPoint;
  }

  isModalOpen: boolean = false;
  openModal(tasks: Task[]) {
    this.selectedTasks = tasks;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-tasks.component.html',
  styleUrl: './show-tasks.component.scss',
})
export class ShowTasksComponent {
  @Input() tasks: string[] = [];
  @Input() scrolled: boolean = false;

  maxVisibleTasks = 3;

  get visibleTasks() {
    return this.tasks.slice(0, this.maxVisibleTasks);
  }

  get remainingTasks() {
    return this.tasks.length - this.maxVisibleTasks;
  }

  get showRemainingTasks() {
    return this.remainingTasks > 0;
  }
}

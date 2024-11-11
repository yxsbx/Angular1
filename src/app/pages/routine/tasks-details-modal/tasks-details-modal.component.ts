import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task-TEMP'; //TEMPORARY, JUST TO ORGANIZE

@Component({
  selector: 'app-tasks-details-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatGridListModule],
  templateUrl: './tasks-details-modal.component.html',
  styleUrl: './tasks-details-modal.component.scss',
})
export class TasksDetailsModalComponent {
  @Input() tasks: Task[] = [];
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
  alertTeste() {
    this.tasks.forEach((task) => {
      alert(task.title);
    });
  }
}

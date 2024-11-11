import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RoutineFormComponent } from '../routine-form/routine-form.component';

@Component({
  selector: 'app-routine-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './routine-modal.component.html',
})
export class RoutineModalComponent {
  @Input() editRoutine: number | null = null;
  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(RoutineFormComponent, {
      width: '400px',
      data: {
        editRoutine: this.editRoutine,
      }
    });
  }
}
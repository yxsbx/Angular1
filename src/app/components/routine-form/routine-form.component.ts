import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RoutineDto } from '@src/app/dtos';
import { ApiLocalService } from '@src/app/services/api-local/api-local.service';

export interface DialogData {
  editRoutine: number | null;
}

@Component({
  selector: 'app-routine-form',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatLabel
  ],
  templateUrl: './routine-form.component.html',
})
export class RoutineFormComponent {
  dialog = inject(MatDialogRef<RoutineFormComponent>)
  data: DialogData = inject(MAT_DIALOG_DATA);
  routineForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiLocalService: ApiLocalService,
  ) {
    this.routineForm = this.fb.group({
      goals: ['', [Validators.required, Validators.minLength(3)]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
    });

    const routineId = this.data.editRoutine;

    if (routineId) {
      this.apiLocalService.getRoutineById(routineId).subscribe(
        (result) => {
          if (result) {
            this.routineForm.setValue({
              goals: result.goals,
              startTime: result.startDateTime,
              endTime: result.endDateTime,
            });
          } else {
            console.log('Rotina não encontrada');
          }
        },
        (error) => {
          console.error('Erro ao buscar a rotina:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.routineForm.valid) {
      const { goals, startTime, endTime } = this.routineForm.value;

      if (this.data.editRoutine) {
        const routineId = this.data.editRoutine;
        
        const updatedRoutine: RoutineDto = {
          id: routineId,
          goals: goals,
          startDateTime: startTime,
          endDateTime: endTime,
          completed: false,
          sendToCalendar: false,
          userId: 2,
        };

        this.apiLocalService.updateRoutine(routineId, updatedRoutine).subscribe(
          (result) => {
            console.log('Rotina atualizada com sucesso:', result);
          },
          (error) => {
            console.error('Erro ao atualizar a rotina:', error);
          }
        );
      } else {
        const newRoutine: RoutineDto = {
          goals: goals,
          startDateTime: startTime,
          endDateTime: endTime,
          completed: false,
          sendToCalendar: false,
          id: 999,
          userId: 2,
        }
  
        this.apiLocalService.createRoutine(newRoutine).subscribe(
          (result) => {
              console.log('Rotina criada com sucesso:', result);
          },
          (error) => {
            console.error(error.message || 'Algo deu errado');
          }
        );
      }

      this.dialog.close()
    } else {
      console.log('Formulário invalido')
    }
  }
}

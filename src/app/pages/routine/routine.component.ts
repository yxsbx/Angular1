import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutineDto } from '@src/app/dtos';
import { RoutineService } from '@src/app/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule, MatCalendar } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDividerModule,
  ],
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss'],
})
export class RoutineComponent implements OnInit {
  routines: RoutineDto[] = [];
  routineForm: FormGroup;
  isModalOpen = false;

  constructor(
    private fb: FormBuilder,
    private routineService: RoutineService,
    private snackBar: MatSnackBar
  ) {
    this.routineForm = this.fb.group({
      goals: ['', Validators.required],
      startDate: [null, Validators.required],
      startTime: ['', Validators.required],
      endDate: [null, Validators.required],
      endTime: ['', Validators.required],
      sendToCalendar: [false],
      completed: [false],
    });
  }

  ngOnInit(): void {
    this.loadRoutines();
  }

  openRoutineModal(): void {
    this.isModalOpen = true;
    this.routineForm.reset();
  }

  closeRoutineModal(): void {
    this.isModalOpen = false;
  }

  toggleCompletion(routine: RoutineDto): void {
    routine.completed = !routine.completed;
    this.routineService.updateRoutine(routine.id, routine).subscribe({
      next: () => {
        this.snackBar.open('Rotina atualizada com sucesso!', 'Fechar', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackBar.open('Erro ao atualizar a rotina', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  createRoutine(): void {
    if (this.routineForm.valid) {
      const formValues = this.routineForm.value;
      const routineData: RoutineDto = {
        id: 0,
        userId: 1,
        goals: formValues.goals,
        startDate: formValues.startDate
          ? formValues.startDate.toISOString().split('T')[0]
          : '',
        startTime: formValues.startTime,
        endDate: formValues.endDate
          ? formValues.endDate.toISOString().split('T')[0]
          : '',
        endTime: formValues.endTime,
        sendToCalendar: formValues.sendToCalendar,
        completed: formValues.completed,
      };

      this.routineService.createRoutine(routineData).subscribe({
        next: (newRoutine) => {
          this.routines.push(newRoutine);
          this.snackBar.open('Rotina criada com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.closeRoutineModal();
        },
        error: () => {
          this.snackBar.open('Erro ao criar a rotina', 'Fechar', {
            duration: 3000,
          });
        },
      });
    } else {
      this.displayControlErrors();
    }
  }

  deleteRoutine(id: number): void {
    if (confirm('Tem certeza de que deseja excluir esta rotina?')) {
      this.routineService.deleteRoutine(id).subscribe({
        next: () => {
          this.routines = this.routines.filter((routine) => routine.id !== id);
          this.snackBar.open('Rotina deletada com sucesso!', 'Fechar', {
            duration: 3000,
          });
        },
        error: () => {
          this.snackBar.open('Erro ao deletar a rotina', 'Fechar', {
            duration: 3000,
          });
        },
      });
    }
  }

  loadRoutines(): void {
    this.routineService.getAllRoutines().subscribe({
      next: (data) => {
        this.routines = data;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar rotinas', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  displayControlErrors(): void {
    Object.keys(this.routineForm.controls).forEach((key) => {
      const control = this.routineForm.get(key);
      console.log(`Campo ${key} - válido:`, control?.valid);
      console.log(`Erros de ${key}:`, control?.errors);
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import dayjs from 'dayjs';
import { RoutineService } from '@src/app/services/routine/routine.service';
import { RoutineDto } from '@src/app/dtos';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

interface Event {
  id: number;
  day: string;
  label: string;
  title: string;
  description: string;
}

interface Label {
  label: string;
  checked: boolean;
}

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatError,
    MatFormField,
    MatLabel,
  ],
})
export class CalendarPageComponent implements OnInit {
  monthIndex = dayjs().month();
  currentMonth: dayjs.Dayjs[][] = [];
  selectedDay: dayjs.Dayjs | null = null;
  showEventModal: boolean = false;
  selectedEvent: Event | null = null;
  labels: Label[] = [
    { label: 'Work', checked: true },
    { label: 'Personal', checked: false },
  ];
  shortDayNames: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];
  title: string = '';
  description: string = '';
  selectedLabel: string = this.labelsClasses[0];
  events: Event[] = [];
  dayEvents: { [key: string]: Event[] } = {};
  routineForm!: FormGroup;

  constructor(
    private routineService: RoutineService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateMonthData(this.monthIndex);
    this.loadEvents();
    this.initializeForm();
  }

  get formattedMonthYear(): string {
    return dayjs().month(this.monthIndex).format('MMMM YYYY');
  }

  initializeForm(): void {
    this.routineForm = this.fb.group({
      goals: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  updateMonthData(monthIndex: number): void {
    const startDay = dayjs().month(monthIndex).startOf('month');
    const endDay = dayjs().month(monthIndex).endOf('month');
    this.currentMonth = [];
    let currentDay = startDay;

    while (currentDay.isBefore(endDay) || currentDay.isSame(endDay, 'day')) {
      const week: dayjs.Dayjs[] = [];
      for (let j = 0; j < 7; j++) {
        week.push(currentDay);
        currentDay = currentDay.add(1, 'day');
      }
      this.currentMonth.push(week);
    }
  }

  handlePrevMonth(): void {
    this.monthIndex--;
    this.updateMonthData(this.monthIndex);
  }

  triggerEventModal() {
    this.selectedEvent = null;
    this.selectedDay = null;
    this.routineForm.reset();
    this.showEventModal = true;
  }

  handleNextMonth(): void {
    this.monthIndex++;
    this.updateMonthData(this.monthIndex);
  }

  handleReset(): void {
    this.monthIndex = dayjs().month();
    this.updateMonthData(this.monthIndex);
  }

  getCurrentDayClass(day: dayjs.Dayjs): string {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  }

  loadEvents(): void {
    this.routineService.getAllRoutines().subscribe(
      (routines) => {
        this.events = routines.map((routine) => ({
          id: routine.id,
          day: routine.startDate,
          label: 'blue',
          title: routine.goals,
          description: routine.completed ? 'Concluído' : 'Não Concluído',
        }));
        this.updateDayEvents();
      },
      (error) => {
        console.error('Erro ao carregar eventos:', error);
      }
    );
  }

  updateDayEvents(): void {
    this.dayEvents = this.events.reduce((acc, evt) => {
      const dayKey = dayjs(evt.day).format('DD-MM-YY');
      if (!acc[dayKey]) acc[dayKey] = [];
      acc[dayKey].push(evt);
      return acc;
    }, {} as { [key: string]: Event[] });
  }

  getEventsForDay(day: dayjs.Dayjs): Event[] {
    const dayKey = day.format('DD-MM-YY');
    return this.dayEvents[dayKey] || [];
  }

  setSelectedEvent(event: Event): void {
    this.routineService.getRoutineById(event.id).subscribe((routine) => {
      this.selectedEvent = {
        id: routine.id,
        day: routine.startDate,
        label: this.selectedLabel,
        title: routine.goals,
        description: `${routine.startTime} - ${routine.endTime}`,
      };

      this.routineForm.patchValue({
        goals: routine.goals,
        startDate: dayjs(routine.startDate).toDate(),
        startTime: routine.startTime,
        endDate: dayjs(routine.endDate).toDate(),
        endTime: routine.endTime,
      });
      this.selectedLabel = this.selectedEvent.label;

      this.showEventModal = true;
    });
  }

  handleSubmit(): void {
    const title = this.routineForm.get('goals')?.value;
    const startDate = dayjs(this.routineForm.get('startDate')?.value).format(
      'YYYY-MM-DD'
    );
    const endDate = dayjs(this.routineForm.get('endDate')?.value).format(
      'YYYY-MM-DD'
    );
    const startTime = this.routineForm.get('startTime')?.value;
    const endTime = this.routineForm.get('endTime')?.value;
    const description = `${startTime} - ${endTime}`;

    if (this.selectedEvent) {
      const routineUpdate: RoutineDto = {
        id: this.selectedEvent.id,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        goals: title,
        completed: this.selectedEvent.description.includes('Concluído'),
        userId: 1,
        sendToCalendar: false,
      };

      this.routineService
        .updateRoutine(routineUpdate.id, routineUpdate)
        .subscribe(() => {
          this.loadEvents();
          this.closeModal();
        });
    } else {
      const newRoutine: RoutineDto = {
        id: Date.now(),
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        goals: title,
        completed: false,
        userId: 1,
        sendToCalendar: false,
      };

      this.routineService.createRoutine(newRoutine).subscribe(() => {
        this.loadEvents();
        this.closeModal();
      });
    }
  }

  closeModal(): void {
    this.showEventModal = false;
    this.selectedEvent = null;
    this.title = '';
    this.description = '';
    this.selectedLabel = this.labelsClasses[0];
    this.routineForm.reset();
  }

  handleDelete(): void {
    if (this.selectedEvent) {
      this.routineService.deleteRoutine(this.selectedEvent.id).subscribe(() => {
        this.loadEvents();
        this.closeModal();
      });
    }
  }

  onDayClick(day: dayjs.Dayjs): void {
    this.selectedDay = day;
    this.showEventModal = true;
    this.selectedEvent = null;
    this.routineForm.reset();
  }

  selectDay(day: dayjs.Dayjs): void {
    this.selectedDay = day;
    this.showEventModal = true;
  }

  toggleLabel(label: Label): void {
    label.checked = !label.checked;
  }
}

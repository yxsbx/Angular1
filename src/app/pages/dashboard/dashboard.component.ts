import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { RoutineService } from '@src/app/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalRoutines = 0;
  completedRoutines = 0;
  weeklyGoal = 5;
  message = '';
  suggestion = '';

  constructor(private routineService: RoutineService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadRoutineData();
  }

  loadRoutineData(): void {
    this.routineService.getAllRoutines().subscribe((routines) => {
      this.totalRoutines = routines.length;
      this.completedRoutines = routines.filter(
        (routine) => routine.completed
      ).length;
      this.updateMessages();
      this.createCharts();
    });
  }

  updateMessages(): void {
    if (this.completedRoutines >= this.weeklyGoal) {
      this.message = 'Parabéns! Você está no caminho certo!';
      this.suggestion = 'Continue assim e mantenha seu ritmo de conclusão.';
    } else if (this.completedRoutines === 0) {
      this.message = 'Vamos começar!';
      this.suggestion =
        'Experimente criar e concluir uma rotina ainda hoje para ganhar impulso.';
    } else {
      this.message = 'Boa! Mas você pode fazer mais!';
      this.suggestion = 'Tente aumentar seu ritmo e atingir a meta semanal.';
    }
  }

  createCharts(): void {
    this.createCompletionChart();
    this.createWeeklyGoalChart();
    this.createProgressChart();
    this.createAverageChart();
  }

  createCompletionChart(): void {
    const data = {
      labels: ['Concluídas', 'Não Concluídas'],
      datasets: [
        {
          data: [
            this.completedRoutines,
            this.totalRoutines - this.completedRoutines,
          ],
          backgroundColor: ['#4CAF50', '#FF5252'],
        },
      ],
    };

    new Chart('completionChart', {
      type: 'doughnut',
      data: data,
      options: { responsive: true },
    });
  }

  createWeeklyGoalChart(): void {
    const data = {
      labels: ['Meta Semanal', 'Concluídas'],
      datasets: [
        {
          data: [
            this.weeklyGoal - this.completedRoutines,
            this.completedRoutines,
          ],
          backgroundColor: ['#FF9800', '#4CAF50'],
        },
      ],
    };

    new Chart('weeklyGoalChart', {
      type: 'doughnut',
      data: data,
      options: { responsive: true },
    });
  }

  createProgressChart(): void {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const completions = [1, 2, 1, 3, 1, 0, 0]; // exemplo de dados de rotinas concluídas por dia da semana

    const data = {
      labels: days,
      datasets: [
        {
          label: 'Conclusão Diária',
          data: completions,
          backgroundColor: '#42A5F5',
        },
      ],
    };

    new Chart('progressChart', {
      type: 'bar',
      data: data,
      options: { responsive: true },
    });
  }

  createAverageChart(): void {
    const data = {
      labels: ['Criadas', 'Concluídas'],
      datasets: [
        {
          data: [this.totalRoutines, this.completedRoutines],
          backgroundColor: ['#FFC107', '#4CAF50'],
        },
      ],
    };

    new Chart('averageChart', {
      type: 'pie',
      data: data,
      options: { responsive: true },
    });
  }
}

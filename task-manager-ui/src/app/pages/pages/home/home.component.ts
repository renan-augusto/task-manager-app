import { Component, OnDestroy, OnInit } from '@angular/core';
import { PoChartModule, PoChartSerie, PoNotificationService, PoToasterOrientation } from '@po-ui/ng-components';
import { TaskService } from '../../../core/task.service';
import { Subscription } from 'rxjs';
import { ITaskChart } from '../../../models/task.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PoChartModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  taskChartSubscription!: Subscription;

  taskChart: ITaskChart[] = [];
  chartSeries: PoChartSerie[] = []

  constructor(
    private _taskService: TaskService,
    public notification: PoNotificationService,
  ) {}
  
  ngOnInit(): void {
    this.getCharts();
  }
  
  getCharts() {
    let userId = window.localStorage.getItem('userId');
    
    if(userId) {
      this._taskService.getTaskChart(userId).subscribe({
        next: (res: ITaskChart[]) => {
          this.taskChart = res;
          this.chartSeries = this.taskChart.map( (x) => ({
            label: x.label,
            data: x.data
          }));
        },
        error: (err: any) => {
          console.error('Error retrieving tasks chart', err);
          this.notification.warning({message: 'Não foi possível recuperar o gráfico no momento. Por favor,tente novamente mais tarde', orientation: PoToasterOrientation.Top, duration: 3000})
          
        }
      });
    }
    
  }

  ngOnDestroy(): void {
    if(this.taskChartSubscription) {
      this.taskChartSubscription.unsubscribe();
    };
  }
  
}

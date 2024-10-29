import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProcessMyProcessesComponent } from './process-my-processes.component';
import { ProcessMystartedComponent } from './process-my-started.component';
import { ProcessMystartComponent } from './process-my-start.component';
import { ProcessMyTasksComponent } from './process-my-tasks.component';
import { ProcessTaskComponent } from './process-my-task-complete.component';
import { WaicatoProcessMyProcessesModule } from 'waicato-processes';
import { WaicatoProcessMyStartModule } from 'waicato-processes';
import { WaicatoProcessMystartedModule } from 'waicato-processes';
import { WaicatoProcessMyTaskCompleteModule } from 'waicato-processes';
import { WaicatoProcessMyTasksModule } from 'waicato-processes';


const ProcessMyRoutes: Routes = [
    {
        path: '',
        component: ProcessMyTasksComponent
    },
    {
        path: 'processes',
        component: ProcessMyProcessesComponent
    },
    {
        path: 'processes/started',
        component: ProcessMystartedComponent
    },
    {
        path: 'processes/start',
        component: ProcessMystartComponent
    },
    {
        path: 'tasks',
        component: ProcessMyTasksComponent
    },
    {
        path: 'tasks/complete',
        component: ProcessTaskComponent
    }
];


@NgModule({
  imports: [
    CommonModule,
    WaicatoProcessMyProcessesModule,
    WaicatoProcessMyStartModule,
    WaicatoProcessMystartedModule,
    WaicatoProcessMyTaskCompleteModule,
    WaicatoProcessMyTasksModule,
    RouterModule.forChild(ProcessMyRoutes)
  ],
  declarations: [ProcessMyProcessesComponent, ProcessMyProcessesComponent, ProcessMystartedComponent, ProcessMystartComponent, ProcessMyTasksComponent, ProcessTaskComponent]
})
export class ProcessMyModule {}

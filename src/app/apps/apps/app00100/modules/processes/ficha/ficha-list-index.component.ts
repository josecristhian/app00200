import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaicatoTopBarService, WaicatoSessionService } from 'waicato-core';
import { AppService } from '../../../services'

@Component({
  selector: 'app-process-list-index',
  template: `<waicato-process-list [BackendConfig]="sessionService.getBackendConfig()" [iWaicatoTopBarService]="topBarService" (oOnCancel)="onCancel()" (oOnCreateProcess)="onCreate()" (oOnSelectProcess)="onSelectProcess($event)"></waicato-process-list>`
})
export class ProcessFichaListIndexComponent {

    constructor(private router: Router, public sessionService: WaicatoSessionService, public route: ActivatedRoute, private ngZone: NgZone, public topBarService: WaicatoTopBarService, public appService: AppService) { }

    ngOnInit(): void {
     }

    onCancel() {
        this.router.navigate(['/' + this.appService.getAppCode() + '/']);
    }

    onCreate() {
        this.router.navigate(['/' + this.appService.getAppCode() + '/workflows/new']);
    }

    onSelectProcess(id){
        this.router.navigate( ['/' + this.appService.getAppCode() + '/workflows/', id]);
    }

    redirect(url) {
        this.ngZone.run(() => { this.router.navigate([url], { relativeTo: this.route }); });
    }

}

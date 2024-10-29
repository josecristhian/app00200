import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaicatoSessionService } from 'waicato-core';
import { AppService } from '../../../services'

@Component({
  selector: 'app-process-abm',
  template: `<waicato-process-ficha-crud [BackendConfig]="sessionService.getBackendConfig()" [iSubmissionId]="this.submissionId" [iType]="this.type" (oOnSubmitted)="onSubmitted($event)" (oOnDeleted)="onDeleted($event)" (oOnCancel)="onCancel()"></waicato-process-ficha-crud>`
})
export class ProcessFichaCRUDComponent {

    type = 'none';
    submissionId;

    constructor(private router: Router, public sessionService: WaicatoSessionService, public route: ActivatedRoute, private ngZone: NgZone, public appService: AppService) { }

    ngOnInit(): void {
        const url = this.router.url;
        const paths = url.indexOf('?') > 0 ? url.substring(0, url.indexOf('?')).split('/') : url.split('/'); // Ex: ["","empresa","5cb7d50ad87aa30019186e20","view"]
        this.type = paths[paths.length - 1];

        this.route.params.subscribe( async params => {
            this.submissionId = params['id'];
        });
    }

    onCancel() {
        this.redirect('../');
    }

    onSubmitted(submission: any) {
        this.redirect('../');
    }

    onDeleted(deleted: any) {
        this.redirect('/' + this.appService.getAppCode() + '/workflows');
    }

    redirect(url) {
        this.ngZone.run(() => { this.router.navigate([url], { relativeTo: this.route }); });
    }

}

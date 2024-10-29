import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaicatoImportDataModule } from 'waicato-data-mgtm';
import { WaicatoSessionService } from 'waicato-core';

@Component({
  selector: 'app-import-data',
  standalone: true,
  imports: [CommonModule, WaicatoImportDataModule],
  template: `<waicato-import-data [BackendConfig]="sessionService.getBackendConfig()"></waicato-import-data>`
})
export class ImportDataComponent {

  constructor(public sessionService: WaicatoSessionService) {
  }

}

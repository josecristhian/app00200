import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WaicatoBpmnDiffModule } from 'waicato-processes';

@Component({
  selector: 'app-bpmndiff',
  standalone: true,
  imports: [CommonModule, WaicatoBpmnDiffModule],
  template: `<waicato-bpmn-diff #processdiff *ngIf="this.showProcessDiff" [iXML1]="this.xml1" [iXML2]="this.xml2"></waicato-bpmn-diff>`
})
export class BpmndiffComponent implements OnInit {

  public showProcessDiff = false;
  xml1 = '';
  xml2 = '';

  constructor( private http: HttpClient ) {
    this.loadProcesses();
  }

  ngOnInit(): void {
  }

  async loadProcesses() {
    this.xml1 = await this.http.get('assets/waicato-processes/bpmn/empty2.xml', { responseType: 'text' }).toPromise();
    this.xml2 = await this.http.get('assets/waicato-processes/bpmn/empty3.xml', { responseType: 'text' }).toPromise();
    this.showProcessDiff = true;
  }

}

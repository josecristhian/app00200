import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WaicatoSessionService, WaicatoTopBarService } from 'waicato-core';
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slideConfig  = {'slidesToShow': 1, 'slidesToScroll': 1, 'arrows': false, 'dots': true, 'autoplay': true, 'autoplaySpeed': 3500};
  slides = [
              {
                  'img' : '../../../assets/img/slide9.png',
                  'content' : 'Una plataforma. Todos los procesos.',
                  'name' : '- EMPODERANDO A LAS PERSONAS PARA IMPULSAR LA TRASNFORMACION DIGITAL'
                },
                {
                  'img' : '../../../assets/img/slide5.png',
                  'content' : 'Automatización de flujos de trabajo para equipos de alto desempeño. BPM en la nube para poner tareas recurrentes en piloto automático sin necesidad de programar.',
                  'name' : '- TOMA EL CONTROL DE TUS PROCESOS DE NEGOCIO'
                },
                {
                  'img' : '../../../assets/img/slide6.png',
                  'content' : 'Utilizando BPMN (el estándar internacional de modelado) y un sencillo modelador visual puedes definir el flujo de trabajo del proceso de acuerdo con la realidad de tu organización. Combina tareas, gestión del tiempo, reglas de negocio y notificaciones sin necesidad de escribir una sola línea de código.',
                  'name' : '- MODELAR TU FLUJO DE TRABAJO'
                },
                {
                  'img' : '../../../assets/img/slide7.png',
                  'content' : 'Define los campos que deben ser completados en cada paso del proceso con un asombroso Form Builder. Se puede elegir entre múltiples tipos de campos y opciones de visibilidad para satisfacer todas las necesidades posibles. Valores por defecto, opciones cargadas automáticamente, funciones y scripts permiten ahorrar valioso tiempo y evitar errores. Diseña la disposición de los campos mediante una estructura de grilla y secciones de fácil reordenación para que el formulario sea lo más intuitivo posible.',
                  'name' : '- DISEÑA TUS FORMULARIOS'
                },
                {
                  'img' : '../../../assets/img/slide4.jpeg',
                  'content' : 'Las personas recibirán sus tareas pendientes en su Bandeja de Entrada. A medida que la instancia de proceso se mueve a lo largo del flujo de trabajo, cada tarea se asignará a un usuario automáticamente de acuerdo a la configuración. Las tareas incluyen campos, adjuntos y comentarios. Mediante filtros y búsquedas puedes encontrar rápidamente lo que necesita e identificar qué tareas son más urgentes. Además puedes reasignar tareas cuando sea necesario y verificar la traza de auditoría.',
                  'name' : '- EJECUTA EL PROCESO'
                }
            ];

  constructor( private topBarService: WaicatoTopBarService, public router: Router, public sessionService: WaicatoSessionService ) {
  }

  ngOnInit(): void {
    this.topBarService.setTitle('<i class="fa fa-home"></i>&nbsp;happyflow');
  }

  onShowFormInfo() {
    $('#formInfo').modal('show');
  }

}

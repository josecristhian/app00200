import { Component, OnInit } from '@angular/core';
import { WaicatoTopBarService } from 'waicato-core';
import { AppServicePrivate } from '../../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
  `,
  styles : `.pb-4, .py-4 { padding-bottom: 0.1rem !important; padding-top: 0.3rem !important; }`
})
export class AboutPublicComponent implements OnInit {

  constructor( private topBarService: WaicatoTopBarService, private localServices: AppServicePrivate ) {
  }

  ngOnInit(): void {
    this.topBarService.setTitle('<i class="fa-regular fa-circle-question"></i>&nbsp;Acerca de nosotros');
  }


}

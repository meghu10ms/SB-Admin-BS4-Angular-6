import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
  animations: [routerTransition()]
})
export class AreaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

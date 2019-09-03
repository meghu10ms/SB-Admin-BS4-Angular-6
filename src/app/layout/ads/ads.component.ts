import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
  animations: [routerTransition()]
})
export class AdsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

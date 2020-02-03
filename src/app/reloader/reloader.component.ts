import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reloader',
  templateUrl: './reloader.component.html',
  styleUrls: ['./reloader.component.css']
})
export class ReloaderComponent implements OnInit {

  router: Router;
  activatedRoute: ActivatedRoute;

  constructor(router: Router, activatedRoute: ActivatedRoute) {
    this.router = router;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      this.router.navigate([res.sitetocall]);
    });
  }

}

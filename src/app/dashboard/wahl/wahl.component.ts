import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {HttpService} from 'src/app/_services/http.service';

@Component({
  selector: 'app-wahl',
  templateUrl: './wahl.component.html',
  styleUrls: ['./wahl.component.css']
})
export class WahlComponent implements OnInit {
  constructor(private httpService: HttpService) { }

  date: Date;

  ngOnInit() {
  }

  newElection() {

    const obj = {
      date: this.date,
      electionType: 'WAHL'
    };

    const json = JSON.stringify(obj);

    console.log(json);

    // this.httpService.newElection(json);
  }

  runOff() {

    const obj = {
      date: this.date,
      electionType: 'STICHWAHL'
    };

    const json = JSON.stringify(obj);


    // this.httpService.newElection(json);
  }
}

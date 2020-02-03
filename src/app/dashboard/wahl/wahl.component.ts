import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {HttpService} from 'src/app/_services/http.service';
import {DateElectionType, Election} from '../../_entities/entities';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material';
import {DataService} from '../../_services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChooseClassComponent} from '../../election/choose-class/choose-class.component';
import {StartElectionComponent} from './start-election/start-election.component';

@Component({
  selector: 'app-wahl',
  templateUrl: './wahl.component.html',
  styleUrls: ['./wahl.component.css']
})
export class WahlComponent implements OnInit {

  dialog: MatDialog;
  httpService: HttpService;
  datepipe: DatePipe;
  router: Router;
  dataService: DataService;

  constructor(httpService: HttpService, datePipe: DatePipe, dialog: MatDialog, router: Router, dataService: DataService) {
    this.httpService = httpService;
    this.datepipe = datePipe;
    this.dialog = dialog;
    this.router = router;
    this.dataService = dataService;
  }

  date: Date = null;
  dateString: string = '';
  fixeddate: boolean = false;
  fixdate = '';

  eletiontypes = ['SCHULSPRECHER', 'ABTEILUNGSLEITERE', 'ABTEILUNGSLEITERI'];
  eletiontype: string = '';
  elections: Election[] = [];

  dateElectionType: DateElectionType = new DateElectionType();

  ngOnInit() {
    this.dateElectionType.electionType
    this.httpService.getElections().subscribe(res => {
      this.elections = res;
      if(this.elections.length !== 0){
        this.elections.forEach(value => {
          console.log(value);
          if(value.electionState !== 'ENDED') {
            var index = this.eletiontypes.indexOf(value.electionType);
            if (index !== -1) {
              this.eletiontypes.splice(index, 1);
            }
            this.date = new Date(Date.parse(value.currentDate));
            this.fixdate = value.currentDate;
            this.fixeddate = true;
          }
        });
        console.log(this.eletiontypes);
      }
    });
  }

  newElection() {

    this.dateString = this.datepipe.transform(this.date, 'MM/dd/yyyy');
    if(this.eletiontype !== '' && this.dateString !== null){

      this.dateElectionType.electionType = this.eletiontype;
      this.dateElectionType.date = this.datepipe.transform(this.date, 'MM/dd/yyyy');
      this.httpService.newElection(this.dateElectionType).subscribe(res => {
        console.log(res);
        this.dataService.date = this.dateElectionType.date;
        this.router.navigate(['reloader'], { queryParams: { sitetocall: 'dashboard/wahl' } });
      });
    } else {
      alert('Please choose a date and the type of election')
    }
  }

  selectedElection(finalElection: Election){
    const dialogRef = this.dialog.open(StartElectionComponent, {
      width: '250px',
      data: {name: finalElection}
    });
  }
}

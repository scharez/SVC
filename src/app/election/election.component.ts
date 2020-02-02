import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpService} from 'src/app/_services/http.service';
import {MatDialog} from '@angular/material';
import {ChooseClassComponent} from 'src/app/election/choose-class/choose-class.component';
import {FinishedComponent} from 'src/app/election/finished/finished.component';
import {DataService} from 'src/app/_services/data.service';
import {Candidate, Candidature, Punkte, SavePoints} from 'src/app/_entities/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {SchoolClassResultDTO} from 'src/app/_dtos/dtos';
import {Electiontype} from '../_enums/enums';


@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit, AfterViewInit {

  private router: Router;
  /* HttpService*/
  httpService: HttpService;

  /* Pop-Up Window*/
  dialog: MatDialog;
  myClass: string;

  /*Array der Kandidaten für den Schulsprecher*/
  candidatesS: Candidate[] = [];


  /*Array der Kandidaten für den Abteilungssprecher*/
  candidatesA: Candidate[] = [];

  /*Zum Vergleichen der Radio-Buttons*/
  seletedValueOfRow: number[] = new Array<number>(30);
  seletedValueOfRowAb: number[] = new Array<number>(30);

  /*Array für die Punkteanzahl vom Schulsprecher*/
  punkteS: Punkte[] = [];
  punkteA: Punkte[] = [];

  /*Json*/
  punkteString;
  punkteString2;

  /*Wie viele Kandidaten werden ausgelesen und wie ist das aufgebaut*/
  res: string;
  countS: number = 0;
  countA: number = 0;

  schoolClassResultDTOsA: SchoolClassResultDTO[] = [];
  schoolClassResultDTOsS: SchoolClassResultDTO[] = [];

  maxpunkteS = 6;
  maxpunkteA = 2;

  /*Kartenhöhe*/
  laenge: number;
  height: string;

  isClass;
  getClass: string;

  savePointsS: SavePoints[] = [];
  savePointsA: SavePoints[] = [];


  constructor(httpService: HttpService, dialog: MatDialog, private dataService: DataService, router: Router, private route: ActivatedRoute) {
    this.router = router;
    this.httpService = httpService;
    this.dialog = dialog;
    //
  }


  ngOnInit() {
    this.isClass = this.route.queryParams.subscribe(params => {
      if (params.klasse) {
        this.getClass = params.klasse;


        console.log(this.getClass);
      }

    });

  }


  private pseudoInit() {

    for (let i = 0; i < this.candidatesS.length; i++) {

      alert(this.candidatesS[i].username);
      console.log(this.candidatesS[i].username)
      this.punkteS.push(new Punkte(this.candidatesS[i].username, 0, 0));
    }
    for (let a = 0; a < this.candidatesA.length; a++) {
      this.punkteA.push(new Punkte(this.candidatesA[a].username, 0, 0));
      console.log(this.punkteA[a]);
    }
  }


  putCandidature(res: Array<Candidature>) {
    console.log("leeeeeeeeeeeeck mich");
    res.forEach(item => {
      console.log(item.election.electionType);
      console.log(item.candidate.username);
      switch(item.election.electionType){
        case (Electiontype.SCHULSPRECHER):
          this.candidatesS[this.countS] = {'id': this.countS,'firstname': item.candidate.firstname, 'lastname': item.candidate.lastname, 'username': item.candidate.username};
          this.countS++;
          this.schoolClassResultDTOsS.push(new SchoolClassResultDTO(item.candidate.username, this.myClass, '20/01/2020', 0, 0));
        case(Electiontype.ABTEILUNGSSPRECHER):
          this.candidatesA[this.countA] = {'id': this.countA,'firstname': item.candidate.firstname, 'lastname': item.candidate.lastname, 'username': item.candidate.username};
          this.countA++;
          this.schoolClassResultDTOsA.push(new SchoolClassResultDTO(item.candidate.username, this.myClass, '20/01/2020', 0, 0));
        default:
          this.candidatesS[this.countS] = {'id': this.countS,'firstname': item.candidate.firstname, 'lastname': item.candidate.lastname, 'username': item.candidate.username};
          this.countS++;
          this.schoolClassResultDTOsS.push(new SchoolClassResultDTO(item.candidate.username, this.myClass, '20/01/2020', 0, 0));
      }
    });

    this.pseudoInit();

    /*Kartenhöhe*/
    this.laenge = this.candidatesS.length + this.candidatesA.length;
    this.height = this.laenge * 10.5 + 'em';
  }


  // Pop-Up fenster zur Klassen auswahl
  onChooseClass () {
    // if (localStorage.getItem('showDialog') === 'true') {
    const dialogRef = this.dialog.open(ChooseClassComponent, {
      width: '250px',
      data: {name: this.myClass}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.myClass = dialogRef.componentInstance.sClass;
      if(this.myClass !== ''){
        alert(this.myClass);
        this.httpService.getCandidatures().subscribe((res) => this.putCandidature(res));
      } else {
        this.onChooseClass();
      }

    });

  }


  /*Schulsprecher nur 1 Radio-Button auswählen*/
  getValue(getI: number, val: number) {
    for (let i = 0; i < this.seletedValueOfRow.length; i++) {
      if (this.seletedValueOfRow[i] === val) {
        this.seletedValueOfRow[i] = 0;
      }
    }
    this.seletedValueOfRow[getI] = val;


    /*Matrikelnummer und Punkte für den Server ohne doppelte Matrikelnummer holen für den Schulsprecher*/
    for (let i = 0; i < this.punkteS.length; i++) {
      if (this.punkteS[i].username === this.punkteS[getI].username) {
        for (let j = 0; j < this.punkteS.length; j++) {
          if (this.punkteS[j].score === val) {
            this.punkteS[j].score = 0;
          }
        }
        this.punkteS[i].score = val;
      }
    }
    console.log(this.punkteS);
  }

  /*Abteilungssprecher nur 1 Radio-Button auswählen*/
  getValueAb(getA: number, val: number) {
    for (let a = 0; a < this.seletedValueOfRowAb.length; a++) {
      if (this.seletedValueOfRowAb[a] === val) {
        this.seletedValueOfRowAb[a] = 0;
      }
    }
    this.seletedValueOfRowAb[getA] = val;


    /*Matrikelnummer und Punkte für den Server ohne doppelte Matrikelnummer holen für den Abteilungssprecher*/
    for (let a = 0; a < this.punkteA.length; a++) {
      if (this.punkteA[a].username === this.punkteA[getA].username) {
        for (let k = 0; k < this.punkteA.length; k++) {
          if (this.punkteA[k].score === val) {
            this.punkteA[k].score = 0;
          }
        }
        this.punkteA[a].score = val;
      }
    }


    console.log(this.punkteA);

  }


  /* ID für Kandidaten für den Schulsprecher*/
  getKa(i: number) {
    return this.seletedValueOfRow[i];
  }

  /* ID für Kandidaten für den Abteilungssprecher*/
  getAb(a: number) {
    return this.seletedValueOfRowAb[a];
  }


  voteAgain() {
    console.log(this.punkteS);

    this.punkteS.forEach((value, index) => {
      console.log(index);
      console.log(this.punkteS[index].username);
      this.schoolClassResultDTOsS[index].username = this.punkteS[index].username;
      this.schoolClassResultDTOsS[index].score += this.punkteS[index].score;
      if(this.punkteS[index].score === this.maxpunkteS){
        this.schoolClassResultDTOsS[index].first += 1;
      }
    })

    this.punkteA.forEach((value, index) => {
      this.schoolClassResultDTOsA[index].username = this.punkteA[index].username;
      this.schoolClassResultDTOsA[index].score += this.punkteA[index].score;
      if(this.punkteA[index].score === this.maxpunkteA){
        this.schoolClassResultDTOsA[index].first += 1;
      }
    })

    this.resetData();

  }


  voteFinished() {

    this.voteAgain();

    const dialogRef = this.dialog.open(FinishedComponent, {
      width: '250px'
    });

    console.log(this.schoolClassResultDTOsS);
    this.schoolClassResultDTOsS.forEach((value, index) => {
      this.httpService.createSchoolClassResult(value).subscribe( (res) => {
        console.log(res);
      });
    });

    /*this.schoolClassResultDTOsA.forEach((value, index) => {
      this.httpService.createSchoolClassResult(value);
    });*/

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // reseting the Radio Button Data
  resetData() {
    for (let i = 0; i < this.punkteS.length; i++) {
      this.punkteS[i].score = 0;
      this.seletedValueOfRow[i] = 0;
    }

    for (let a = 0; a < this.punkteA.length; a++) {
      this.punkteA[a].score = 0;
      this.seletedValueOfRow[a] = 0;
    }

  }

  printme() {
    this.router.navigate(['finalScore']);
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write('<html><head><title>Print tab</title></head><body onload="window.print();window.close()"> {{ printContents }} ></body></html>');
    popupWin.document.close();
  }

  ngAfterViewInit(): void {
    if (this.getClass == null) {
      setTimeout(() => this.onChooseClass());
    } else {
      //this.httpService.instanceCVs(this.getClass).subscribe();
    }
  }
}


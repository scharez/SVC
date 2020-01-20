import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../_services/http.service';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../_services/data.service';
import {log} from 'util';
import {Candidature} from '../../_entities/entities';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  studentIdent: string;


  /*Für Klassenauswahl nach Abteilungen*/
  classes: string[] = new Array<string>(50);
  medientechnikClass: string[] = ['1AHITM', '1BHITM', '2AHITM', '2BHITM', '3AHITM', '3BHITM', '4AHTIM', '4BHITM', '5AHITM', '5BHITM'];
  informatikClass: string[] = ['1AHIF', '1BHIF', '1CHIF', '2AHIF', '2BHIF', '2CHIF', '3AHIF', '3BHIF', '3CHIF', '4AHIF', '4BHIF'];
  elektronikClass: string[] = ['1AHEL', '2AHEL', '3AHEL', '4AHEL', '5AHEL'];
  medizintechnikClass: string[] = ['1AHBG', '2AHBG', '3AHBG', '4AHBG', '5AHBG'];

  httpService: HttpService;

  /*Formular Daten*/


  positions: string[] = ['Schulsprecher', 'AbteilungssprecherE', 'AbteilungssprecherI'];
  departments: string[] = ['Elektronik', 'Informatik', 'Medientechnik', 'Medizintechnik'];

  firstName = '';
  lastName = '';
  sDepartment = '';
  sClass = '';
  sMatrikelNr = '';
  sWahlversprechen = '';
  sImage = '';
  cPosition = '';

  updateCandidate: Candidature;
  studentNew: Candidature;

  textTest: string;
  ret: string

  date: string;

  dataString: string = '';



  constructor(private http: HttpClient, httpService: HttpService, private dataservice: DataService) {
    this.httpService = httpService;
  }

  ngOnInit() {
    // this.dataservice.candidateEmitter.subscribe(candidate => this.putCandidates(candidate));
    this.dowloadStudents();
  }

  putCandidates(candidate) {
    console.log(candidate.candidateClass)
    this.updateCandidate.candidate.firstname = candidate.firstname;
    this.updateCandidate.candidate.lastname = candidate.lastname;
    this.updateCandidate.schoolclass.department = candidate.department;
    this.updateCandidate.schoolclass.name = candidate.candidateClass;
    this.updateCandidate.candidate.username = candidate.username;
    this.updateCandidate.electionpromise = candidate.electionPromise;
    this.updateCandidate.election.electiontype = candidate.position;
    console.log(this.updateCandidate);
    this.getDepartment();

  }

  /*Herunterladen von schon eingetragenen Schülern*/
  dowloadStudents() {
   // this.httpService.getCandidates().subscribe(existingcandidates => function (existingcandidates) {
      alert("hey");
    // });
  }

  /*Abteilungen abspeichern*/
  getDepartment() {
    if (this.sDepartment === 'Medientechnik') {
      this.classes = this.medientechnikClass;
    } else if (this.sDepartment === 'Informatik') {
      this.classes = this.informatikClass;
    } else if (this.sDepartment === 'Medizintechnik') {
      this.classes = this.medizintechnikClass;
    } else if (this.sDepartment === 'Elektronik') {
      this.classes = this.elektronikClass;
    }

    console.log("Hier" + this.classes);
  }

  updateCandidates() {
    if (this.firstName === '') {
      alert('Nicht alle Felder ausgefüllt!');
    } else if (this.lastName === '') {
      alert('Nicht alle Felder ausgefüllt!');
    } else if (this.sDepartment === '') {
      alert('Nicht alle Felder ausgefüllt!');
    } else if (this.sClass === '') {
      alert('Nicht alle Felder ausgefüllt!');
    } else if (this.sMatrikelNr === '') {
      alert('Nicht alle Felder ausgefüllt!');
    } else if (this.sWahlversprechen === '') {
      alert('Nicht alle Felder ausgefüllt!');
    } else if (this.cPosition === '') {
      alert('Nicht alle Felder ausgefüllt!');
    } else {

      this.updateCandidate.candidate.firstname = this.firstName;
      this.updateCandidate.candidate.lastname = this.lastName;
     // this.updateCandidate.election.electiontype = this.cPosition;
      this.updateCandidate.schoolclass.name = this.sClass;
     // this.updateCandidate.schoolclass.department = this.sDepartment;
      this.updateCandidate.electionpromise = this.sWahlversprechen;
      this.updateCandidate.candidate.username = this.sMatrikelNr;

      console.log(this.updateCandidate);

      // this.httpService.updateCandidate(this.updateCandidate);
    }
  }

  deleteCandidates() {
    if (this.sMatrikelNr !== '' && this.sMatrikelNr !== undefined && this.sMatrikelNr !== null){
    //  this.httpService.deleteCandidate(this.sMatrikelNr).subscribe(res => console.log(res));
    }
  }

  neuErstellen() {
    this.firstName = '';
    this.lastName = '';
    this.sDepartment = '';
    this.sClass = '';
    this.sMatrikelNr = '';
    this.sWahlversprechen = '';
    this.sImage = '';
    this.cPosition = '';
  }

}

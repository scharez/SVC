import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../_services/http.service';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../_services/data.service';
import {log} from 'util';
import {Candidate, Candidature, Election, Schoolclass, Schoolclassresult} from '../../_entities/entities';
import {Department, Electiontype} from '../../_enums/enums';

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


  positions: string[] = ['SCHULSPRECHER', 'ABTEILUNGSLEITERE', 'ABTEILUNGSLEITERI'];
  departments: string[] = ['ELEKTRONIK', 'INFORMATIK', 'MEDIENTECHNIK', 'MEDIZINTECHNIK'];

  id = 0;
  firstName = '';
  lastName = '';
  sDepartment = '';
  sClass = '';
  sMatrikelNr = '';
  sWahlversprechen = '';
  sImage = '';
  cPosition = '';

  updateCandidate: Candidature = new Candidature();
  studentNew: Candidature;

  textTest: string;
  ret: string;

  date: string;

  dataString = '';


  constructor(private http: HttpClient, httpService: HttpService, private dataservice: DataService) {
    this.httpService = httpService;
    this.updateCandidate.candidate = new Candidate();
    this.updateCandidate.schoolclass = new Schoolclass();
    this.updateCandidate.election = new Election();

  }

  ngOnInit() {
    this.dataservice.candidateEmitter.subscribe(lol => this.putCandidates(lol));

  }


  putCandidates(lol: Candidature) {

    console.log(lol);
    this.id = lol.id;
    this.firstName = lol.candidate.firstname;
    this.lastName = lol.candidate.lastname;
    this.sDepartment = lol.schoolclass.department;
    this.sClass = lol.schoolclass.name;
    this.sMatrikelNr = lol.candidate.username;
    this.sWahlversprechen = lol.electionpromise;
    this.cPosition = lol.election.electiontype;
    console.log(this.updateCandidate);
    this.getDepartment();

  }


  /*Abteilungen abspeichern*/
  getDepartment() {
    if (this.sDepartment === 'MEDIENTECHNIK') {
      this.classes = this.medientechnikClass;
    } else if (this.sDepartment === 'INFORMATIK') {
      this.classes = this.informatikClass;
    } else if (this.sDepartment === 'MEDIZINTECHNIK') {
      this.classes = this.medizintechnikClass;
    } else if (this.sDepartment === 'ELEKTRONIK') {
      this.classes = this.elektronikClass;
    }

    console.log('Hier' + this.classes);
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

      console.log("Firstname here:     "+ this.firstName);
      console.log("Firstname here:     "+ this.updateCandidate.candidate.firstname);

      this.updateCandidate.id = this.id;
      this.updateCandidate.candidate.firstname = this.firstName;
      this.updateCandidate.candidate.lastname = this.lastName;
      this.updateCandidate.election.electiontype = Electiontype[this.cPosition];
      this.updateCandidate.schoolclass.name = this.sClass;
      this.updateCandidate.schoolclass.department = Department[this.sDepartment];
      this.updateCandidate.electionpromise = this.sWahlversprechen;
      this.updateCandidate.candidate.username = this.sMatrikelNr;

      console.log(this.updateCandidate);

      if (this.updateCandidate.id === 0) {
        this.newCandidature(this.updateCandidate);
      } else {
        this.httpService.updateCandidature(this.updateCandidate);
      }

    }
  }

  newCandidature(updateCandidate: Candidature) {
    this.httpService.newCandidature(this.updateCandidate);
  }

  deleteCandidates() {
    if (this.sMatrikelNr !== '' && this.sMatrikelNr !== undefined && this.sMatrikelNr !== null) {
       this.httpService.deleteCandidature(this.id).subscribe(res => console.log(res));
    }
  }

  neuErstellen() {
    this.id = 0;
    this.firstName = '';
    this.lastName = '';
    this.sDepartment = Department.EMPTY;
    this.sClass = '';
    this.sMatrikelNr = '';
    this.sWahlversprechen = '';
    this.sImage = '';
    this.cPosition = '';
  }
}

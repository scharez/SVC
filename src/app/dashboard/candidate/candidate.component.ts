import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../_services/http.service';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../_services/data.service';
import {log} from 'util';
import {Candidate, Candidature, Election, SchoolClass, Schoolclassresult} from '../../_entities/entities';
import {CandidatureDTO} from '../../_dtos/dtos';
import {browser} from 'protractor';
import {Router} from '@angular/router';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  studentIdent: string;


  /*Für Klassenauswahl nach Abteilungen*/
  allclasses: string[] = [];
  classes: string[] = new Array<string>(50);
  medientechnikClass: string[] = ['1AHITM', '1BHITM', '2AHITM', '2BHITM', '3AHITM', '3BHITM', '4AHTIM', '4BHITM', '5AHITM', '5BHITM'];
  informatikClass: string[] = ['1AHIF', '1BHIF', '1CHIF', '2AHIF', '2BHIF', '2CHIF', '3AHIF', '3BHIF', '3CHIF', '4AHIF', '4BHIF'];
  elektronikClass: string[] = ['1AHEL', '2AHEL', '3AHEL', '4AHEL', '5AHEL'];
  medizintechnikClass: string[] = ['1AHBG', '2AHBG', '3AHBG', '4AHBG', '5AHBG'];

  httpService: HttpService;
  dataService: DataService;
  router: Router;

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
  candidatureDTO: CandidatureDTO = new CandidatureDTO();
  candidate1: Candidate = new Candidate();

  textTest: string;
  ret: string;

  date: string;

  dataString = '';


  constructor(private http: HttpClient, httpService: HttpService, private dataservice: DataService, router: Router) {
    this.httpService = httpService;
    this.dataService = dataservice;
    this.router = router;
    this.updateCandidate.candidate = new Candidate();
    this.updateCandidate.schoolClass = new SchoolClass();
    this.updateCandidate.election = new Election();
  }

  ngOnInit() {
    this.classes = [];
    this.allclasses = [];
    this.httpService.getElections().subscribe(res => {
      res.forEach(value => {
        this.date = value.currentDate;
      });
      this.dataService.date = this.date;
    });
    this.httpService.getSchoolClasses().subscribe(res => {
      console.log(res);
      res.forEach((value, index) => {
        this.allclasses.push(value);
      });
      this.dataservice.candidateEmitter.subscribe(lol => this.putCandidates(lol));
    });
  }


  putCandidates(lol: Candidature) {
      console.log(lol);
      this.id = lol.id;
      this.firstName = lol.candidate.firstname;
      this.lastName = lol.candidate.lastname;
      this.sDepartment = lol.schoolClass.department;
      this.sClass = lol.schoolClass.name;
      this.sMatrikelNr = lol.candidate.username;
      this.sWahlversprechen = lol.electionpromise;
      this.cPosition = lol.election.electionType;
      console.log(this.updateCandidate);
      this.getDepartment(true);
  }


  /*Abteilungen abspeichern*/
  getDepartment(neW) {
    this.classes = [];
    if (neW) {
      if (this.sClass.endsWith('M')) {
        this.sDepartment = 'MEDIENTECHNIK';
        this.getWishedClasses('M');
      } else if (this.sClass.endsWith('F')) {
        this.sDepartment = 'INFORMATIK';
        this.getWishedClasses('F');
      } else if (this.sClass.endsWith('L')) {
        this.sDepartment = 'ELEKTRONIK';
        this.getWishedClasses('L');
      } else if (this.sClass.endsWith('G')) {
        this.sDepartment = 'MEDIZINTECHNIK';
        this.getWishedClasses('G');
      } else {
        alert('Error');
      }
    } else {
      if (this.sDepartment === 'MEDIENTECHNIK') {
        this.getWishedClasses('M');
      } else if (this.sDepartment === 'INFORMATIK') {
        this.getWishedClasses('F');
      } else if (this.sDepartment === 'ELEKTRONIK') {
        this.getWishedClasses('L');
      } else if (this.sDepartment === 'MEDIZINTECHNIK') {
        this.getWishedClasses('G');
      } else {
        alert('Error');
      }
    }

    console.log('Hier' + this.classes);
  }

  private getWishedClasses(ending: string) {
    this.allclasses.forEach((value, index) => {
      if (value.endsWith(ending)) {
        this.classes.push(value);
      }
    });
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

      console.log('Firstname here:     ' + this.firstName);
      console.log('Firstname here:     ' + this.updateCandidate.candidate.firstname);

      this.updateCandidate.candidate.firstname = this.firstName;
      this.updateCandidate.candidate.lastname = this.lastName;
      this.updateCandidate.election.electionType = this.cPosition;
      this.updateCandidate.schoolClass.name = this.sClass;
      this.updateCandidate.schoolClass.department = this.sDepartment;
      this.updateCandidate.electionpromise = this.sWahlversprechen;
      this.updateCandidate.candidate.username = this.sMatrikelNr;
      this.updateCandidate.election.currentDate = this.date;

      console.log(this.updateCandidate);

      if (this.id === 0) {
        this.newCandidature(this.updateCandidate);
      } else {
        this.candidatureToCandidatureDTO();
        this.httpService.updateCandidature(this.candidatureDTO).subscribe(res => console.log(res));
      }

    }
  }

  newCandidature(updateCandidate: Candidature) {
    this.candidatureToCandidatureDTO();
    this.httpService.newCandidate(this.candidatureDTO).subscribe(res => {
      console.log(res.status);
      if (res.status !== 'Candidate already exists!') {
        this.httpService.newCandidature(this.candidatureDTO).subscribe(res2 => {
          console.log(res2.status);
          if (res2.status === 'Failed to create Candidature.') {
            alert('There is no Election, for this position, started yet.');
          } else {
            this.router.navigate(['reloader'], { queryParams: { sitetocall: 'dashboard/candidates' } });
          }
        });
      } else {
        alert(res.status);
      }
    });

  }

  deleteCandidates() {
    if (this.sMatrikelNr !== '' && this.sMatrikelNr !== undefined && this.sMatrikelNr !== null) {
      this.candidate1.username = this.sMatrikelNr;
      this.httpService.deleteCandidature(this.candidate1).subscribe(res => console.log(res));
    }
  }

  neuErstellen() {
    this.id = 0;
    this.firstName = '';
    this.lastName = '';
    this.sDepartment = '';
    this.sClass = '';
    this.classes = [];
    this.sMatrikelNr = '';
    this.sWahlversprechen = '';
    this.sImage = '';
    this.cPosition = '';
  }

  private candidatureToCandidatureDTO() {
    this.candidatureDTO.username = this.updateCandidate.candidate.username;
    this.candidatureDTO.firstname = this.updateCandidate.candidate.firstname;
    this.candidatureDTO.lastname = this.updateCandidate.candidate.lastname;
    this.candidatureDTO.date = this.updateCandidate.election.currentDate;
    this.candidatureDTO.electionType = this.updateCandidate.election.electionType;
    this.candidatureDTO.schoolClassName = this.updateCandidate.schoolClass.name;
    this.candidatureDTO.electionPromise = this.updateCandidate.electionpromise;
  }


}

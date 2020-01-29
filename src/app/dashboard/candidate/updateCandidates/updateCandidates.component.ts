import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpService} from '../../../_services/http.service';
import {DataService} from '../../../_services/data.service';
import {Candidate, Election, Candidature} from '../../../_entities/entities';
import {Electiontype, Electionstate, Department} from '../../../_enums/enums';

@Component({
  selector: 'updateCandidates',
  templateUrl: './updateCandidates.component.html',
  styleUrls: ['./updateCandidates.component.css']
})


export class UpdateCandidatesComponent implements OnInit {
  checkCount = 0;

  lol: Candidate = new Candidate(0, 'if160189', 'Lisa', 'Berger');


  candidates: Candidature[] = [{
    'id': 1,
    'candidate': {'id': 1, 'username': 'if160189', 'firstname': 'Lisa', 'lastname': 'Berger'},
    // @ts-ignore
    'election': {'id': 1, 'currentdate': '2019/20', 'electiontype': 'SCHULSPRECHER', 'electionstate': 'RUNNING'},
    // @ts-ignore
    'schoolclass': {'id': 1, 'name': '4AHEL', 'currentdate': '2019/20', 'department': 'ELEKTRONIK'},
    'electionpromise': 'ICh bin gut!'
  }];
  // candidates: Canidature[] = [];
  count = 0;


  httpService: HttpService;


  constructor(httpService: HttpService, private dataservice: DataService) {
    this.httpService = httpService;
    this.httpService.getCandidatures().subscribe((res) => this.setCandidatures(res));
  }

  ngOnInit() {


  }

  setCandidatures(res) {
    res.forEach(item => {
      console.log('looooooooool');
      console.log(item);
      this.candidates.push(item);
    });
    console.log(this.candidates);
  }

  getCandidate(candidate: Candidature) {
    console.log(candidate);
    this.dataservice.candidateEmitter.emit(candidate);
    this.dataservice.candidature = candidate;
  }
}

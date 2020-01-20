import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpService} from '../../../_services/http.service';
import {DataService} from '../../../_services/data.service';
import {Candidate, Election, Candidature} from '../../../_entities/entities';


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
    'election': {'id': 1, 'currentdate': '2019/20', 'electiontype': Electiontype.SCHULSPRECHER, 'electionstate': Electionstate.RUNNING},
    'schoolclass': {'id': 1, 'name': '4BHIF', 'currentdate': '2019/20', 'department': Department.ELEKTRONIK},
    'electionpromise': 'ICh bin gut!'
  }];
  //candidates: Canidature[] = [];
  count = 0;


  httpService: HttpService;


  constructor(httpService: HttpService, private dataservice: DataService) {
    this.httpService = httpService;
   // this.httpService.getCandidates().subscribe((res) => this.setCandidates(res));
  }

  ngOnInit() {


  }

  setCandidates(res) {
    res.forEach(item => {
      console.log(item);
     this.candidates.push(item);
    });

    console.log(this.candidates);
  }

  getCandidate(candidate: Candidature) {
    console.log(candidate);
    this.dataservice.candidateEmitter.emit(candidate);
  }
}
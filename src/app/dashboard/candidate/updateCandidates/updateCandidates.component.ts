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


  candidates: Candidature[] = [];
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
      console.log(item);
      console.log(this.dataservice.date + ' hey there');
      console.log(item.election.currentDate);
      if (this.dataservice.date === item.election.currentDate) {
        console.log('looooooooool');
        console.log(item);
        this.candidates.push(item);
      }
    });
    console.log(this.candidates);
  }

  getCandidate(candidate: Candidature) {
    console.log(candidate);
    this.dataservice.candidateEmitter.emit(candidate);
    this.dataservice.candidature = candidate;
  }
}

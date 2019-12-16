import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../_services/http.service';

@Component({
  selector: 'app-voting-results',
  templateUrl: './voting-results.component.html',
  styleUrls: ['./voting-results.component.css']
})
export class VotingResultsComponent implements OnInit {

  pieChart = 'PieChart';

  classChartData = '[{"klasse": "nicht gewählt", "score": 36}, {"klasse": "gewählt", "score": 20}]';
  classChartCol = ['Abteilungssprecher Informatik', 'Punkte'];
  classChartTitle = 'Hoid de Goschn';

  constructor(private http: HttpService) {

  }

  ngOnInit() {
  }



}

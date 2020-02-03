import {Component, Inject, OnInit} from '@angular/core';
import {HttpService} from '../../../_services/http.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DateElectionType, Election} from '../../../_entities/entities';

@Component({
  selector: 'app-start-election',
  templateUrl: './start-election.component.html',
  styleUrls: ['./start-election.component.css']
})
export class StartElectionComponent implements OnInit {

  election: Election;
  finalElection = '';
  dateElectionType: DateElectionType = new DateElectionType();

  constructor(
    private httpService: HttpService,
    private router: Router,
    public dialogRef: MatDialogRef<StartElectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('data', this.data);
  }

  ngOnInit() {
    this.election = this.data.name;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onClick(startstop: string) {
    this.dateElectionType.electionType = this.election.electionType;
    this.dateElectionType.date = this.election.currentDate;
    if (startstop === 'start') {
      this.httpService.beginElection(this.dateElectionType).subscribe(res => {
        if (res.status !== 'Failed to start election.') {
          this.router.navigate(['reloader'], { queryParams: { sitetocall: 'dashboard/wahl' } });
          this.dialogRef.close();
        }
      });
    } else {
      this.httpService.endElection(this.dateElectionType).subscribe(res => {
        if (res.status !== 'Election finished') {
          this.router.navigate(['reloader'], { queryParams: { sitetocall: 'dashboard/wahl' } });
          this.dialogRef.close();
        }
      });
    }
  }

}

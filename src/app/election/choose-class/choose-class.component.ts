import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../_services/http.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {Candidature} from '../../_entities/entities';

@Component({
  selector: 'app-choose-class',
  templateUrl: './choose-class.component.html',
  styleUrls: ['./choose-class.component.css']
})
export class ChooseClassComponent implements OnInit {

  countV = 0;

  constructor(
    private httpService: HttpService,
    private router: Router,
    public dialogRef: MatDialogRef<ChooseClassComponent>,) {
  }

  sClass = '';
  classes: String[] = ['5AHITM', '3AHIF']

  ngOnInit(): void {
    this.httpService.getCandidatures().subscribe(result => {
      console.log(result);
      //this.loadClass(result);
    });
  }

  onNoClick() {
    this.dialogRef.close();
    this.router.navigate(['login']);
  }

  onClick() {
    if (this.sClass === '') {
      location.reload();
      // localStorage.setItem('showDialog', 'true');
    } else {
      this.dialogRef.close();
      // localStorage.setItem('showDialog', 'false');
    }
  }

  loadClass(resClasses: Array<Candidature>) {
    console.log(resClasses);
    resClasses.forEach(item => {
      console.log(item.schoolclass.name);

      this.classes[this.countV] = item.schoolclass.name;
      this.countV++;
    });
  }

}

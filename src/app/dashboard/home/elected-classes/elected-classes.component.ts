import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {HttpService} from '../../../_services/http.service';

@Component({
  selector: 'app-elected-classes',
  templateUrl: './elected-classes.component.html',
  styleUrls: ['./elected-classes.component.css']
})
export class ElectedClassesComponent implements OnInit {

  classes = [];    // new Array<String>();

  /* Pop-Up Window*/
  dialog: MatDialog;
  myClass: string;

  constructor(dialog: MatDialog, private httpService: HttpService, private snackBar: MatSnackBar) {
    this.dialog = dialog;
  }

  ngOnInit() {
    this.httpService.getFinishedClasses().subscribe((classesjson) => this.further(classesjson));
  }

  further(classesjson) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < classesjson.length; i++) {
      this.classes.push(classesjson[i].name);
    }

  }

  editClasses(getClass: string) {
    this.choosenClass(getClass);
  }

  choosenClass(getClass: string) {

    this.httpService.deleteClass(getClass).subscribe((resClass) => {
      this.openSnackBar("This Class was deleted", "ok");
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

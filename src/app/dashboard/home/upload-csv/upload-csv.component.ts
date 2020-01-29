import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../_services/http.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.css']
})
export class UploadCsvComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private httpService: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.httpService.postFile(this.fileToUpload).subscribe(data => {
      console.log(data);
      this.openSnackBar('File uploaded', 'cancel');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

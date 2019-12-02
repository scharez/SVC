import { Component, OnInit } from '@angular/core';
import {HttpService} from '../_services/http.service';
import {Router} from '@angular/router';
import {DataService} from '../_services/data.service';
import {LoginDTO} from '../_models/loginDTO';
import {User} from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDTO: LoginDTO = new LoginDTO();
  user: User = new User();
  response: any = {};

  constructor(private httpService: HttpService, private router: Router, private dataService: DataService) {}

  ngOnInit() {}

  login() {

    this.httpService.login(this.loginDTO).subscribe(res => this.parseLogin(res));
  }

  parseLogin(res) {
    Object.assign(this.response, res);

    if (this.response.statusCode === 401) {
      console.log(this.response.message);
    } else if(this.response.statusCode === 503) {
      console.log(this.response.message);
    } else {
        this.user.username = this.response.username;
        this.user.role = this.response.role;
        this.user.token = this.response.token;

        localStorage.setItem("user", JSON.stringify(this.user));

      switch (this.user.role) {

        case 'Students':
          //this.router.navigate(['info']);
          alert("Student")
          break;

        case 'Teacher':
          this.router.navigate(['election']);
          break;

        case 'Candidates':
          //this.router.navigate(['info']);
          alert("Candidate")
          break;

        case 'ADMIN':
          this.router.navigate(['dashboard']);
          break;
      }
    }

  }

}

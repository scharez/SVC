import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginDTO} from '../_models/loginDTO';
import {Candidature, DateElectionType, Punkte, Schoolclass,} from '../_entities/entities';
import {SchoolClassResultDTO} from '../_dtos/dtos';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    getSchoolClass(dateElectionType: DateElectionType) {
      return this.http.post<Schoolclass[]>('http://localhost:8080/rest/sv/getVotingClasses', dateElectionType);
    }
    getCandidates(): any {
      return this.http.get('http://localhost:8080/rest/sv/getCandidates');
    }
    createSchoolClassResult(schoolClassResultDTOs: SchoolClassResultDTO[]): any {
      return this.http.post('http://localhost:8080/rest/sv/createSchoolClassResult', schoolClassResultDTOs);
    }
    createCandidature(): any {
      throw new Error('Method not implemented.');
    }
    endElection(): any {
        throw new Error('Method not implemented.');
    }
    instanceCVs(myClass: string): any {
        throw new Error('Method not implemented.');
    }
    sendPoints(punkteS: Punkte[]): any {
        throw new Error('Method not implemented.');
    }
    getCandidatures() {
      return this.http.get<Candidature[]>('http://localhost:8080/rest/sv/getCandidatures');
    }
    getSchoolClassResults(object: { id: string; score: number; date: string; electionType: string; }): any {
        throw new Error('Method not implemented.');
    }

  constructor(private http: HttpClient) { }

  login(user: LoginDTO) {
    return this.http.post('http://localhost:8080/rest/sv/login', user);
  }

  /*

  sendPoints(punkteString: Punkte[]) {
    return this.http.post('http://localhost:8080/rest/sv/parseJson', punkteString);
  }

  getCandidates() {
    return this.http.get('http://localhost:8080/rest/sv/getCandidates');
  }

  instanceCVs(itsaclass: string) {
    return this.http.post('http://localhost:8080/rest/sv/instanceCVs', itsaclass);
  }

  persistCVs() {
    return this.http.post('http://localhost:8080/rest/sv/persistCVs');
  }

  endElection() {
    this.http.post('http://localhost:8080/rest/sv/endElection');
  }

  getSchoolClassResults(myRequest: VotingResultPunkte) {
    return this.http.get('http://localhost:8080/rest/sv/getSchoolClassResults');
  }

  beginElection() {
    this.http.post('http://localhost:8080/rest/sv/startElection');
  }

  endElectionTeacher() {
    this.http.post('http://localhost:8080/rest/sv/endElectionTeacher');
  }

  postFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post('http://localhost:8080/rest/sv/uploadCSV', formData);
  }

  deleteClass(className: string) {
    return this.http.post('http://localhost:8080/rest/sv/deleteClass');
  }
*/
  newElection(json: string) {
    this.http.post('http://localhost:8080/rest/sv/createElection', json);
  }
/*
  getFinishedClasses() {
    return this.http.get('http://localhost:8080/rest/sv/getFinishedClasses');
  }
*/
  getVotingClasses() {
    return this.http.get('http://localhost:8080/rest/sv/getVotingClasses');
  }
/*
  createCandidate(candidate: User2) {
    return this.http.post('http://localhost:8080/rest/sv/createCandidate', candidate);
  }

  getCurrentVoteDate() {
    return this.http.get('http://localhost:8080/rest/sv/getCurrentVoteDate');
  }

  createCandidature(candidateplus: User3) {
    return this.http.post('http://localhost:8080/rest/sv/createCandidature', candidateplus);
  }
   */
}

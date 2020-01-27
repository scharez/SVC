import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginDTO} from '../_models/loginDTO';
import {Candidature} from '../_entities/entities';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

    getSchoolClassResults(object: { id: string; score: number; date: string; electionType: string; }): any {
        throw new Error('Method not implemented.');
    }

  constructor(private http: HttpClient) { }

  login(user: LoginDTO) {
    return this.http.post('http://localhost:8080/rest/sv/login', user);
  }

  updateCandidature(candidature: Candidature) {
    return this.http.post('http://localhost:8080/rest/sv/updateCandidature', candidature);
  }

  newCandidature(candidature: Candidature) {
    return this.http.post('http://localhost:8080/rest/sv/createCandidate', candidature);
  }

  getCandidatures( ) {
    return this.http.get('http://localhost:8080/rest/sv/getCandidatures');
  }

  deleteCandidature(id: number) {
    return this.http.delete(`http://localhost:8080/mps-rest/webapi/mps/deleteAnmeldung/${id}`);
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

  */

  endElection() {
    this.http.post('http://localhost:8080/rest/sv/endElection', null);
  }

  /*

  getSchoolClassResults(myRequest: VotingResultPunkte) {
    return this.http.get('http://localhost:8080/rest/sv/getSchoolClassResults');
  }

   */

  beginElection() {
    this.http.post('http://localhost:8080/rest/sv/startElection', null);
  }

  endElectionTeacher() {
    this.http.post('http://localhost:8080/rest/sv/endElectionTeacher', null);
  }


  postFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post('http://localhost:8080/rest/sv/uploadCSV', formData);
  }


  deleteClass(className: string) {
    return this.http.post('http://localhost:8080/rest/sv/deleteClass', className);
  }
  newElection(json: string) {
    this.http.post('http://localhost:8080/rest/sv/createElection', json);
  }

  getFinishedClasses() {
    return this.http.get('http://localhost:8080/rest/sv/getFinishedClasses');
  }

  /*

  getVotingClasses() {
    return this.http.get('http://localhost:8080/rest/sv/getVotingClasses');
  }

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

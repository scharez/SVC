import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginDTO} from '../_models/loginDTO';
import {
  Candidate,
  Candidature,
  DateElectionType,
  DateElectionTypeSchoolClass,
  Election,
  Punkte,
  SchoolClass,
  Status,
} from '../_entities/entities';
import {CandidatureDTO, SchoolClassResultDTO} from '../_dtos/dtos';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    getElections() {
        return this.http.get<Election[]>('http://localhost:8080/rest/sv/getElections');
    }
    getSchoolClass(dateElectionType: DateElectionType) {
      return this.http.post<SchoolClass[]>('http://localhost:8080/rest/sv/getVotingClasses', dateElectionType);
    }
    getCandidates(): any {
      return this.http.get('http://localhost:8080/rest/sv/getCandidates');
    }
    createSchoolClassResult(schoolClassResultDTO: SchoolClassResultDTO) {
      console.log(schoolClassResultDTO);
      return this.http.post<string>('http://localhost:8080/rest/sv/createSchoolClassResult', schoolClassResultDTO);
    }
    createCandidature(): any {
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

  updateCandidature(candidatureDTO: CandidatureDTO) {
    return this.http.post<Status>('http://localhost:8080/rest/sv/updateCandidature', candidatureDTO);
  }

  newCandidate(candidatureDTO: CandidatureDTO) {
    return this.http.post<Status>('http://localhost:8080/rest/sv/createCandidate', candidatureDTO);
  }

  newCandidature(candidatureDTO: CandidatureDTO) {
    return this.http.post<Status>('http://localhost:8080/rest/sv/createCandidature', candidatureDTO);
  }

  deleteCandidature(candidate: Candidate) {
    return this.http.post('http://localhost:8080/rest/sv/deleteCandidature', candidate);
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



  /*

  getSchoolClassResults(myRequest: VotingResultPunkte) {
    return this.http.get('http://localhost:8080/rest/sv/getSchoolClassResults');
  }

   */

  beginElection(dateElectionType: DateElectionType) {
    return this.http.post<Status>('http://localhost:8080/rest/sv/startElection', dateElectionType);
  }

  endElectionTeacher() {
    this.http.post('http://localhost:8080/rest/sv/endElectionTeacher', null);
  }


  postFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<string>('http://localhost:8080/rest/sv/uploadCSV', formData);
  }

  deleteSchoolClassResult(dateElectionTypeSchoolClass: DateElectionTypeSchoolClass) {
    return this.http.post('http://localhost:8080/rest/sv/deleteSchoolClassResult', dateElectionTypeSchoolClass);
  }

  newElection(dateElectionType: DateElectionType) {
    return this.http.post<Status>('http://localhost:8080/rest/sv/createElection', dateElectionType);
  }

  getFinishedClasses(dateElectionType: DateElectionType) {
    return this.http.post<SchoolClass[]>('http://localhost:8080/rest/sv/getFinishedClasses', dateElectionType);
  }

  /*
  getVotingClasses() {
    return this.http.get('http://localhost:8080/rest/sv/getVotingClasses');
  }
  createCandidate(candidate: User2) {
    return this.http.post('http://localhost:8080/rest/sv/createCandidate', candidate);
  }
*/
/*
  createCandidature(candidateplus: User3) {
    return this.http.post('http://localhost:8080/rest/sv/createCandidature', candidateplus);
  }
   */
  endElection(dateElectionType: DateElectionType) {
    return this.http.post<Status>('http://localhost:8080/rest/sv/endElection', dateElectionType);
  }

  getSchoolClasses() {
    return this.http.get<Array<string>>('http://localhost:8080/rest/sv/getSchoolClasses');
  }
}

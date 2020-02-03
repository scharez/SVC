import {EventEmitter, Injectable} from '@angular/core';
import {Candidature} from '../_entities/entities';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public candidateEmitter: EventEmitter<Candidature> = new EventEmitter();
  public candidature: Candidature;
  public date: string;

}

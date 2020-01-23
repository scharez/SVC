import {Electiontype, Electionstate, Department} from '../_enums/enums';


/* Entities */

export class Candidate {
  constructor(
    public id?: number,
    public username: string = '',
    public firstname: string = '',
    public lastname: string = '',
  ) {
  }
}


export class Election {
  constructor(
    public id: number = 0,
    public currentdate: string = '',
    public electiontype?: Electiontype,
    public electionstate?: Electionstate,
  ) {
  }
}

class Schoolclass {
  constructor(
    public id: number = 0,
    public name: string = '',
    public currentdate: string = '',
    public department: Department
  ) {
  }
}

class Schoolclassresult {
  constructor(
    public id: number = 0,
    public schoolclass: Schoolclass,
    public score: number = 0,
    public first: number = 0
  ) {
  }
}

export class Candidature {
  constructor(
    public id?: number,
    public candidate?: Candidate,
    public election?: Election,
    public schoolclass?: Schoolclass,
    public picture?: File,
    public electionpromise?: string,
    public schoolclassresult?: Schoolclassresult[]
  ) {
    schoolclassresult = schoolclassresult ? schoolclassresult : [];
  }
}

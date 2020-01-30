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
    public id?: number,
    public currentdate?: string ,
    public electiontype?: Electiontype,
    public electionstate?: Electionstate,
  ) {
  }
}

export class Schoolclass {
  constructor(
    public id?: number,
    public name?: string,
    public currentdate?: string,
    public department?: Department
  ) {
  }
}

export class Schoolclassresult {
  constructor(
    public id?: number,
    public schoolclass?: Schoolclass,
    public score?: number,
    public first?: number
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

export class Punkte {
  constructor(
    public username: string = '',
    public score = 0,
    public first = 0
  ) {
  }

}
export class SavePoints {
  constructor(
    public username: string = '',
    public score = 0,
    public  first = 0
  ) {
  }
}
export class DateElectionType {
  constructor(
    public date: string = '',
    public electionType: string = ''
  ) {
  }
}

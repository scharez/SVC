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
    public currentDate?: string ,
    public electionType: string = '',
    public electionState: string = '',
  ) {
  }
}

export class SchoolClass {
  constructor(
    public id?: number,
    public name?: string,
    public currentdate?: string,
    public department: string = ''
  ) {
  }
}

export class Schoolclassresult {
  constructor(
    public id?: number,
    public schoolClass?: SchoolClass,
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
    public schoolClass?: SchoolClass,
    // public picture?: File,
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

export class DateElectionTypeSchoolClass {
  constructor(
    public date: string = '',
    public electionType: string = '',
    public schoolClassName: string = ''
  ) {
  }
}

export class SchoolClassDate {
  constructor(
    public schoolClassName: string = '',
    public date: string = ''
  ) {
  }
}

export class Status {
  constructor(
    public status: string = '',
  ) {
  }
}

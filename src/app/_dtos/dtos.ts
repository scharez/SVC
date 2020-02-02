
/* Dots */
export class SchoolClassResultDTO {

  constructor(
    public username: string = '',
    public schoolClassName: string = '',
    public date: string = '',
    public score: number = 0,
    public first: number = 0
  ) {
  }

}

export class CandidatureDTO {

  constructor(
    public username: string = '',
    public firstname: string = '',
    public lastname: string = '',
    public date: string = '',
    public electionType: string = '',
    public schoolClassName: string = '',
    public electionPromise: string = '',
  ) {
  }
}

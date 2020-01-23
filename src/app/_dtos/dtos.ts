
/* Dots */
export class SchoolClassResultDTO {

  constructor(
    public username: string,
    public schoolclassname: string,
    public date: string,
    public score: number = 0,
    public first: number = 0
  ) {
  }

}

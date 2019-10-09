import { Institution } from './institution.model';

export class DocumentBP {

    year: number;
    month: number;
    day: number;
    institution: Institution;


    constructor(year: number, month: number, day: number, institutionName: string){
        this.year = year;
        this.month = month;
        this.day = day;
        this.institution = new Institution(institutionName);

    }
}
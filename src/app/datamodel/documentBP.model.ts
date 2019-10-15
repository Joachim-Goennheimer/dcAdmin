import { Institution } from './institution.model';

export class DocumentBP {

    id: number;
    year: number;
    month: number;
    institution: string;
    importance: number;
    description: string;


    constructor(id: number,year: number, month: number, institutionName: string, importance: number, description: string){
        this.id = id;
        this.year = year;
        this.month = month;
        this.institution = institutionName;
        this.importance = importance;
        this.description = description;

    }
}
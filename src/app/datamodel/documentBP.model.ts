import { Institution } from './institution.model';

/**
 * Describes how a Document object. BP stands for BluePrint.
 */
export class DocumentBP {

    id: number;
    year: number;
    month: number;
    institution: string;
    title: string;
    importance: number;
    description: string;


    constructor(id: number, year: number, month: number, institutionName: string, title: string, importance: number, description: string) {
        this.id = id;
        this.year = year;
        this.month = month;
        this.title = title;
        this.institution = institutionName;
        this.importance = importance;
        this.description = description;

    }
}

import { DataSummaryModel } from "./data-summary.model"

export class DataSummaryService {

    dataSummary: DataSummaryModel;
    constructor(){
        this.dataSummary = new DataSummaryModel();

    }

    getDataSummary(){
        return Object.assign({}, this.dataSummary);
    }


}
import { Component, OnInit } from '@angular/core';
import { DataSummaryService } from './data-summary.service';
import { DataSummaryModel } from './data-summary.model';

@Component({
  selector: 'app-data-summary',
  templateUrl: './data-summary.component.html',
  styleUrls: ['./data-summary.component.sass'],
  providers: [DataSummaryService]
})
export class DataSummaryComponent implements OnInit {

  dataSummary: DataSummaryModel;

  constructor(private dataSummaryService: DataSummaryService) { }

  ngOnInit() {
    this.dataSummary = this.dataSummaryService.getDataSummary();

  }

}

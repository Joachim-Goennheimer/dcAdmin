import { Component, OnInit } from '@angular/core';
import { DataSummaryService } from './data-summary.service';
import { DataSummaryModel } from './data-summary.model';

/**
 * Component that retrieves some summary data from the server using the DataSummaryService
 * and then displays it to the user.
 */
@Component({
  selector: 'app-data-summary',
  templateUrl: './data-summary.component.html',
  styleUrls: ['./data-summary.component.sass'],
  providers: [DataSummaryService]
})
export class DataSummaryComponent implements OnInit {

  dataSummary: DataSummaryModel = new DataSummaryModel();

  constructor(private dataSummaryService: DataSummaryService) { }

  ngOnInit() {
    this.dataSummaryService.getDataSummary()
      .subscribe(
        (response) => {
            this.dataSummary.username = response.username;
            this.dataSummary.firstName = response.firstName;
            this.dataSummary.lastName = response.lastName;
            this.dataSummary.lastLoggedIn = response.lastLoggedIn;
            this.dataSummary.email = response.email;
            this.dataSummary.totalDocumentCount = response.documentCount;
            this.dataSummary.totalToDosCount = response.todoCount;
        },
        (error) => console.log(error)
        );
  }
}

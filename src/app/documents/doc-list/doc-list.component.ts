import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { DocumentsService } from '../../documents.service';
import { DocumentBP } from '../../datamodel/documentBP.model';
import { saveAs } from 'file-saver';

const initialSelection = [];
const allowMultiSelect = false;

/**
 * Component that handles the information about the documents on the server.
 * Impements functionalities like filtering and search.
 * When the user selects a document in the table it will request the corresponding pdf
 * from the server using the DocumentsService.
 */
@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.sass']
})
export class DocListComponent implements OnInit {

  displayedColumns: string[] = ['year', 'month', 'institution', 'title', 'importance'];

  dataSource = new MatTableDataSource<DocumentBP>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dcService: DocumentsService) {
  }

  selection = new SelectionModel<DocumentBP>(allowMultiSelect, initialSelection);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dcService.getDocumentsInformation();
    // waiting for data from server.
    this.dcService.documentsInformationSubject
    .subscribe(
      (response: DocumentBP[]) => {
        this.dataSource = new MatTableDataSource<DocumentBP>(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => console.log(error)
    );
  }

  toggleAndLoad(row) {
    this.selection.toggle(row);
    console.log(row);
    // requests documentPDF by handing the databaseID of the document
    this.dcService.getDocumentPDFByID(row.id);
  }


  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DocumentBP): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.year + 1}`;
  }
}

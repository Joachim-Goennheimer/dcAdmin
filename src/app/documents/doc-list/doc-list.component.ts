import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { DocumentsService } from '../../documents.service';
import { saveAs } from 'file-saver';



export interface DocumentBP {
  year: number;
  month: number;
  institution: string;
  importance: number;

}

const initialSelection = [];
const allowMultiSelect = false;

const ELEMENT_DATA: DocumentBP[] = [
  {year: 2019, month: 10, institution: "IRS", importance: 2},
  {year: 2018, month: 11, institution: "School", importance: 3},
  {year: 2017, month: 5, institution: "Insurance", importance: 2},
  {year: 2018, month: 2, institution: "Doctor", importance: 2},
  {year: 2019, month: 1, institution: "University", importance: 5},
  {year: 2017, month: 5, institution: "Insurance", importance: 2},
  {year: 2018, month: 2, institution: "Doctor", importance: 2},
  {year: 2019, month: 10, institution: "IRS", importance: 2},
  {year: 2018, month: 11, institution: "School", importance: 3},
  {year: 2019, month: 1, institution: "University", importance: 5},

]

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.sass']
})
export class DocListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'year', 'month', 'institution', 'importance'];

  dataSource = new MatTableDataSource<DocumentBP>(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dcService: DocumentsService){

  }
  
  selection = new SelectionModel<DocumentBP>(allowMultiSelect, initialSelection);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dcService.getDocumentsInformation();
  }

  toggleAndLoad(row){
    this.selection.toggle(row);
    
    this.dcService.getDocumentPDF(5)
      // .subscribe(
      //   (response) => {
      //     var blob = new Blob([response], { type: 'application/pdf' });
      //   },
      //   (error) => console.log(error)
      // );
  }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DocumentBP): string {
    if (!row) {
      // return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.year + 1}`;
  }
}

// import {Component, OnInit, ViewChild} from '@angular/core';
// import {MatPaginator} from '@angular/material/paginator';
// import {MatTableDataSource} from '@angular/material/table';

// /**
//  * @title Table with pagination
//  */
// @Component({
//   selector: 'app-doc-list',
//   templateUrl: './doc-list.component.html',
//   styleUrls: ['./doc-list.component.sass']
// })
// export class DocListComponent implements OnInit {
//   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

//   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

//   ngOnInit() {
//     this.dataSource.paginator = this.paginator;
//   }
// }

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];

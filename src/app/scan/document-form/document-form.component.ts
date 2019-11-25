import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';
import { DocumentsService } from 'src/app/documents.service';
import { InstitutionsResponse } from 'src/app/datamodel/InstitutionsResponse';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

/**
 * Manages the form used for input of scanned document data.
 */
@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.sass'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DocumentFormComponent implements OnInit {

  closeResult: string;
  newInstitution: string;
  /**
   * holds institutions that are currently in the database.
   */
  availableInstitutions = ["Institution1", "Institution2", "Institution3", "Institution4", "Institution5"];

  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  constructor(private dcService: DocumentsService, private modalService: NgbModal) {}

  ngOnInit() {

    this.dcService.getAvailableInstitutions()
    .subscribe(
      (response: InstitutionsResponse) => {
        this.availableInstitutions = response.institutions;
        console.log('Retrieving institutions');
        console.log(response.institutions);
      }
    );

  }

  onAddNewInstitution(institution: string) {
    console.log("Adding institution: " + institution);
    // this.dcService.createNewInstitution(form.createdInstitution);
  }

  /**
   * Adds a new institution to the database. Validates that the institution is not yet in the database.
   * @param institution instituion the user wants to add to the databse
   */
  addNewInstitution(institution: string) {
    console.log(institution);
    if(this.availableInstitutions.includes(institution)){
      console.log("Already in list");
    }
    else {
      this.availableInstitutions.push(institution);
      this.dcService.createNewInstitution(institution);
    }

  }

  onSubmit(form: NgForm) {
    // const documentInformation = {
    //   year: this.date.value.year(),
    //   month: this.date.value.month(),
    //   institution: form.form.value.institution,
    //   importance: form.form.value.importance,
    //   description: form.form.value.description
    // }
    const documentInformation = {
      'year': '2019',
      'month': '05',
      'institution': 'TestInstitution',
      'importance': '2',
      'description': 'example15'
    };

    this.dcService.saveDocument(documentInformation);
    console.log(form);
    // console.log(this.date.value.year())
    // console.log(this.date.value.month())
    console.log(documentInformation);
  }

  open(newInstitution: string) {
    this.modalService.open(newInstitution, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // $('#myModal').on('shown.bs.modal', function () {
  //   $('#myInput').trigger('focus')
  // })

}

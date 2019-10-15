import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';
import { DocumentsService } from 'src/app/documents.service';

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

  // @ViewChild('yearInput', {static: false}) yearInput: ElementRef;

  constructor(private dcService: DocumentsService) { }

  ngOnInit() {
    
  }

  onSubmit(form: NgForm){
    // const documentInformation = {
    //   year: this.date.value.year(),
    //   month: this.date.value.month(),
    //   institution: form.form.value.institution,
    //   importance: form.form.value.importance,
    //   description: form.form.value.description
    // }
    const documentInformation = {
      "year": "2019",
      "month": "05",
      "institution": "TestInstitution",
      "importance": "2",
      "description": "example15"
    }
    this.dcService.saveDocument(documentInformation);
    console.log(form);
    // console.log(this.date.value.year())
    // console.log(this.date.value.month())
    console.log(documentInformation);

  }

}

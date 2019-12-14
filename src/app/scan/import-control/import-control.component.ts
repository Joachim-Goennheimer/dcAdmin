import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DocumentsService } from 'src/app/documents.service';

@Component({
  selector: 'app-import-control',
  templateUrl: './import-control.component.html',
  styleUrls: ['./import-control.component.sass']
})
export class ImportControlComponent implements OnInit {
  @ViewChild('importProgressBar', {static: false}) importProgressbar: ElementRef;
  // @ViewChild("currentlyImportingDocumentNumber", {static: false}) currentlyImportingDN: ElementRef;
  // @ViewChild("totallyImportingDocumentsNumber", {static: false}) totallyImportingDN: ElementRef;

  isImporting = false;
  totalDocumentsCurrentlyImporting = 0;
  documentNumberCurrentlyImporting = 0;
  progressWidth = 0;

  numberImportPdfs: number;

  constructor(
    private dcService: DocumentsService,
    private renderer: Renderer2) {
  }

  ngOnInit() {

    // Listening and updating the number of documents that will be imported
    this.dcService.scannTotalCountSubject.subscribe(
      (response: number) => this.totalDocumentsCurrentlyImporting = response,
      (error) => console.log(error)
    );
    // Listening and updating to the number of the document that is currently imported
    this.dcService.scannCurrentCountSubject.subscribe(
      (response: number) => {
        this.documentNumberCurrentlyImporting = response;
        // checks if import is finished
        if (this.documentNumberCurrentlyImporting > this.totalDocumentsCurrentlyImporting) {
          this.isImporting = false;
          this.totalDocumentsCurrentlyImporting = 0;
          this.documentNumberCurrentlyImporting = 0;
          // this.resetProgressBar();
          this.isImporting = false;
        }
          this.setProgressBar();
      },
      (error) => console.log(error)
    );
  }

  onImportDocumentsClick() {
    this.isImporting = true;

    this.dcService.importDocuments();
  }

  // onProgressClick() {

  //   let progressWidthString = '0%';
  //   this.documentNumberCurrentlyImporting++;
  //   this.progressWidth = this.calculateCurrentProgressWidth();
  //   console.log(this.progressWidth);

  //   progressWidthString = this.progressWidth * 100 + '%';
  //   console.log(progressWidthString);

  //   this.renderer.setStyle(this.importProgressbar.nativeElement, 'width', progressWidthString);

  // }

  setProgressBar() {
    let progressWidthString = '0%';
    if (this.documentNumberCurrentlyImporting != 0) {
        this.progressWidth = this.calculateCurrentProgressWidth();
        progressWidthString = this.progressWidth * 100 + '%';
    }
    this.renderer.setStyle(this.importProgressbar.nativeElement, 'width', progressWidthString);
  }

  resetProgressBar() {
    let progressWidthString = '0%';
    this.renderer.setStyle(this.importProgressbar.nativeElement, 'width', progressWidthString);
}

  calculateCurrentProgressWidth() {

    return this.documentNumberCurrentlyImporting / this.totalDocumentsCurrentlyImporting;
  }

}

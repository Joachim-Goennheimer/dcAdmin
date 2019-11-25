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

  importingDocuments = true;
  totalDocumentsCurrentlyImporting = 15;
  documentNumberCurrentlyImporting = 2;
  progressWidth = 0;

  numberImportPdfs: number;

  constructor(
    private dcService: DocumentsService,
    private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  onImportDocuments() {


    // return this.dcService.importDocuments();
  }

  onProgressClick() {

    let progressWidthString = '0%';
    this.documentNumberCurrentlyImporting++;
    this.progressWidth = this.calculateCurrentProgressWidth();
    console.log(this.progressWidth);

    progressWidthString = this.progressWidth * 100 + '%';
    console.log(progressWidthString);

    this.renderer.setStyle(this.importProgressbar.nativeElement, 'width', progressWidthString);

  }

  calculateCurrentProgressWidth() {

    return this.documentNumberCurrentlyImporting / this.totalDocumentsCurrentlyImporting;
  }

}

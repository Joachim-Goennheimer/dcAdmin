import { Component, OnInit, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-frame',
  templateUrl: './pdf-frame.component.html',
  styleUrls: ['./pdf-frame.component.sass']
})
export class PdfFrameComponent implements OnInit {

  pdfSrc: string = './assets/ProblemSheet03(1).pdf';
  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;

  constructor() { }

  ngOnInit() {
  }


  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

 

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { DocumentsService } from '../../documents.service';

@Component({
  selector: 'app-pdf-frame',
  templateUrl: './pdf-frame.component.html',
  styleUrls: ['./pdf-frame.component.sass']
})
export class PdfFrameComponent implements OnInit {

  // pdfSrc: string = './assets/ProblemSheet03(1).pdf';
  pdfSrc: object;
  page = 1;
  totalPages: number;
  isLoaded = false;

  constructor(private dcService: DocumentsService) { }

  ngOnInit() {
    this.dcService.pdfSubject.subscribe(
      (pdfData: Blob) => {
        this.pdfSrc = pdfData;
      }
    );
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

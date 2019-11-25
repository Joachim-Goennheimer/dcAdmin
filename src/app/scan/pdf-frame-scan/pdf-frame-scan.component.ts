import { Component, OnInit, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { DocumentsService } from '../../documents.service';

/**
 * Component responsible for displaying a pdf that has been scanned recently. Similar to component displaying pdfs in document view.
 */
@Component({
  selector: 'app-pdf-frame-scan',
  templateUrl: './pdf-frame-scan.component.html',
  styleUrls: ['./pdf-frame-scan.component.sass']
})
export class PdfFrameScanComponent implements OnInit {

  // pdfSrc: string = './assets/ProblemSheet03(1).pdf';
  pdfSrc: object;
  page = 1;
  totalPages: number;
  isLoaded = false;

  constructor(private dcService: DocumentsService) { }

  ngOnInit() {
    this.dcService.scannedPdfSubject.subscribe(
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DocumentBP } from './datamodel/documentBP.model';
import { AuthService } from './auth/auth.service';

// let pdfBlob: Blob;

/**
 * Service that manages the document data as well as all the requests for retrieving and saving documents.
 */
@Injectable()
export class DocumentsService {


    returnHeaders = {};
    // stores information about all the documents sent by server
    documentsInformationSubject = new Subject();
    // holds information about all documents
    documentsInformation: DocumentBP[] = [];

    pdfSubject = new Subject();

    numberImportPdfs: number;
    scannedPdfSubject = new Subject();
    scannTotalCountSubject = new Subject();
    scannCurrentCount = 0;
    scannCurrentCountSubject = new Subject();


    constructor(private http: HttpClient, private authService: AuthService) {

    }


    // starts the import of new documents.
    importDocuments() {
      const accessToken = this.authService.getToken();
      const headers = new HttpHeaders({
              'x-access-token': accessToken,
      });
      console.log("Import started");
      this.http.get('https://webfileviewerproject.herokuapp.com/importDocuments',
                    {headers, responseType: 'arraybuffer' as 'json', observe: 'response' })
      .subscribe(
          (response) => {
              console.log(response);
              console.log(response.headers.get('filecount'));
              const keys = response.headers.keys();
              this.returnHeaders = keys.map(key =>
              `${key}: ${response.headers.get(key)}`);

              this.scannedPdfSubject.next(response.body);
              this.scannTotalCountSubject.next(response.headers.get('filecount'));
              this.scannCurrentCount = 1;
              this.scannCurrentCountSubject.next(this.scannCurrentCount);
            },
            (error) => console.log(error)
      );
    }

    /**
     * sends the data that should be saved for the current document to the server
     * In current implementation it will not detect if new documents are scanned when die import
     * process has already started. If the import started with 8 documents it will stop afterwards.
     * In order to scan newly scanned documents the import process has to be started again.
     * This design decision can be modified later.
     */
    saveDocument(document: object) {
        const accessToken = this.authService.getToken();
        const headers = new HttpHeaders({
          //     'host': "webfileviewerproject.herokuapp.com",
            'Access-Control-Allow-Origin': '*',
          //   'Accept': '*/*',
            'content-type': 'application/json',
            'x-access-token': accessToken
          });

        this.http.post('https://webfileviewerproject.herokuapp.com/currentDocumentData', document,
                      {headers, responseType: 'arraybuffer' as 'json', observe: 'response'})
        .subscribe(
            (response) => {
              this.scannedPdfSubject.next(response.body);
              this.scannTotalCountSubject.next(response.headers.get('filecount'));
              this.scannCurrentCount++;
              this.scannCurrentCountSubject.next(this.scannCurrentCount);
            },
            (error) => console.log(error)
        );

    }

    getAvailableInstitutions() {
        const accessToken = this.authService.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
              responseType:  'application/json',
            //   'Authorization': 'my-auth-token',
              'x-access-token': accessToken
            })
        };
        return this.http.get('https://webfileviewerproject.herokuapp.com/institutions', httpOptions);
    }

    createNewInstitution(institutionName: string) {

        const accessToken = this.authService.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
              responseType:  'application/json',
            //   'Authorization': 'my-auth-token',
              'x-access-token': accessToken
            })
        };
        this.http.post('https://webfileviewerproject.herokuapp.com/createInstitution', {institution: institutionName}, httpOptions)
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }

    // function that
    getDocumentsInformation() {
        class ReturnObjectFormat {
            documentInfo: DocumentBP[];
        }

        // getting auth information required for the request
        const accessToken = this.authService.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
              responseType:  'application/json',
            //   'Authorization': 'my-auth-token',
              'x-access-token': accessToken
            })
        };
        // remove all elements of array before loading documentInfo. Otherwise would be duplicated.
        this.documentsInformation = [];

        this.http.get<ReturnObjectFormat>('https://webfileviewerproject.herokuapp.com/documents', httpOptions)
        .subscribe(
            (response) => {
                response.documentInfo.forEach((document: DocumentBP) => {
                    this.addToDocumentInformationArray(document);
                });
                this.documentsInformationSubject.next(this.documentsInformation);
            },
            (error) => console.log(error)
        );

    }

    // not used anymore. Was used before ID functionality was implemented in backend.
    getDocumentPDF(documentID: number) {

        const accessToken = this.authService.getToken();
        const headers = new HttpHeaders({
              'x-access-token': accessToken,
        });

        this.http.get('https://webfileviewerproject.herokuapp.com/document', {headers, responseType: 'arraybuffer' as 'json'})
        .subscribe(
            (response) => {
                this.pdfSubject.next(response);
                console.log(response);
              },
              (error) => console.log(error)
            );
    }

    // requesting a document as pdf given its documentID
    getDocumentPDFByID(documentID: number) {

        const accessToken = this.authService.getToken();
        const headers = new HttpHeaders({
              'x-access-token': accessToken,
        });

        const requestString = 'https://webfileviewerproject.herokuapp.com/documentPDF/' + documentID;

        this.http.get(requestString, {headers, responseType: 'arraybuffer' as 'json'})
        .subscribe(
            (response) => {
                this.pdfSubject.next(response);
                console.log(response);
              },
              (error) => console.log(error)
            );
    }

    addToDocumentInformationArray(document: DocumentBP) {
      const addingDocument = new DocumentBP(
        document.id,
        document.year,
        document.month,
        document.institution,
        document.title,
        document.importance,
        document.description);
      this.documentsInformation.push(addingDocument);
    }
}

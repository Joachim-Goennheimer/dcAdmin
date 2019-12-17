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

    serverUrl = 'http://localhost:3000';

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

    /**
     *  starts the import of new documents and sets current file count.
     */
    importDocuments() {
      const accessToken = this.authService.getToken();
      const headers = new HttpHeaders({
              'x-access-token': accessToken,
      });
      this.http.get(this.serverUrl + '/importDocuments',
                    {headers, responseType: 'arraybuffer' as 'json', observe: 'response' })
      .subscribe(
          (response) => {
              // console.log(response);
              console.log('File Count: ' + response.headers.get('filecount'));
              // const keys = response.headers.keys();
              // this.returnHeaders = keys.map(key =>
              // `${key}: ${response.headers.get(key)}`);

              this.scannedPdfSubject.next(response.body);
              this.scannTotalCountSubject.next(response.headers.get('filecount'));
              this.scannCurrentCount = 0;
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
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
            'x-access-token': accessToken
          });

        this.http.post(this.serverUrl + '/currentDocumentData', document,
                      {headers, responseType: 'arraybuffer' as 'json', observe: 'response'})
        .subscribe(
            (response) => {
              this.scannedPdfSubject.next(response.body);
              console.log(response.headers.get('filecount'));
              // this.scannTotalCountSubject.next(response.headers.get('filecount'));
              this.scannCurrentCount++;
              this.scannCurrentCountSubject.next(this.scannCurrentCount);
            },
            (error) => console.log(error)
        );

    }

    /**
     * retrieves the institutions that the user has already entered. These institutions can then be assigned when entering
     * the information for new documents that have been scanned.
     */
    getAvailableInstitutions() {
        const accessToken = this.authService.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
              responseType:  'application/json',
            //   'Authorization': 'my-auth-token',
              'x-access-token': accessToken
            })
        };
        return this.http.get(this.serverUrl + '/institutions', httpOptions);
    }

    /**
     * adds a new institution to the database. So far no delete functionality implemented.
     * @param institutionName name of the institution that the user wants to add to the database
     */
    createNewInstitution(institutionName: string) {

        const accessToken = this.authService.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
              responseType:  'application/json',
            //   'Authorization': 'my-auth-token',
              'x-access-token': accessToken
            })
        };
        this.http.post(this.serverUrl + '/createInstitution', {institution: institutionName}, httpOptions)
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }

    /**
     * retrieves the information of all documents in the database and adds it to an array.
     * This array is the used in the Doc-list component to display the documents data in a table.
     */
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

        this.http.get<ReturnObjectFormat>(this.serverUrl + '/documents', httpOptions)
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

        this.http.get(this.serverUrl + '/document', {headers, responseType: 'arraybuffer' as 'json'})
        .subscribe(
            (response) => {
                this.pdfSubject.next(response);
                console.log(response);
              },
              (error) => console.log(error)
            );
    }

    /**
     * requesting a document as pdf given its documentID
     * @param documentID the id of the document the user clicked on in the docuents table
     */
    getDocumentPDFByID(documentID: number) {

        const accessToken = this.authService.getToken();
        const headers = new HttpHeaders({
              'x-access-token': accessToken,
        });

        const requestString = this.serverUrl + '/documentPDF/' + documentID;

        this.http.get(requestString, {headers, responseType: 'arraybuffer' as 'json'})
        .subscribe(
            (response) => {
                this.pdfSubject.next(response);
                console.log(response);
              },
              (error) => console.log(error)
            );
    }

    /**
     * helper function that adds a document to the documents array.
     * @param document the document that should be added to the array
     */
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

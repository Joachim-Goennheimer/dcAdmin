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


    // stores information about all the documents sent by server
    documentsInformationSubject = new Subject();
    // holds information about all documents
    documentsInformation: DocumentBP[] = [];

    pdfSubject = new Subject();

    numberImportPdfs: number;
    scannedPdfSubject = new Subject();


    constructor(private http: HttpClient, private authService: AuthService) {

    }


    // starts the import of new documents.
    importDocuments() {
        this.http.get('https://webfileviewerproject.herokuapp.com/importDocuments', {responseType: 'arraybuffer' as 'json'} )
        .subscribe(
            (response) => {
                this.scannedPdfSubject.next(response);
              },
              (error) => console.log(error)
            );
    }

    // sends the data that should be saved for the current document to the server
    saveDocument(document: Object) {
        const httpOptions = {
            headers: new HttpHeaders({
            //     'host': "webfileviewerproject.herokuapp.com",
              'Access-Control-Allow-Origin': '*',
            //   'Accept': '*/*',
              'content-type': "application/json"
            })
        }
        this.http.post('https://webfileviewerproject.herokuapp.com/currentDocumentData', document, httpOptions)
        .subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        )

    }

    getAvailableInstitutions() {
        const accessToken = this.authService.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
              'responseType':  'application/json',
            //   'Authorization': 'my-auth-token',
              'x-access-token': accessToken
            })
        }
        return this.http.get('https://webfileviewerproject.herokuapp.com/institutions', httpOptions);
    }

    createNewInstitution(institutionName: string) {
        const accessToken = this.authService.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
              'responseType':  'application/json',
            //   'Authorization': 'my-auth-token',
              'x-access-token': accessToken
            })
        }
        this.http.post('https://webfileviewerproject.herokuapp.com/createInstitution', httpOptions)
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
              'responseType':  'application/json',
            //   'Authorization': 'my-auth-token',
              'x-access-token': accessToken
            })
        }
        // remove all elements of array before loading documentInfo. Otherwise would be duplicated.
        this.documentsInformation = [];

        console.log("in getDocumentsInformation function");
        // this.http.get<ReturnObjectFormat>("https://webfileviewerproject.herokuapp.com/documents", {responseType: 'json'})
        this.http.get<ReturnObjectFormat>('https://webfileviewerproject.herokuapp.com/documents', httpOptions)
        .subscribe(
            (response) => {
                console.log(response);
                console.log(typeof(response));
                // documentsInformationObject = JSON.parse(response);
                console.log(response.documentInfo);
                response.documentInfo.forEach((document: DocumentBP) => {
                    this.addToDocumentInformationArray(document);
                })
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
        })
           
        this.http.get('https://webfileviewerproject.herokuapp.com/document', {headers: headers, responseType: 'arraybuffer' as 'json'})
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
        })

        const requestString = 'https://webfileviewerproject.herokuapp.com/documentPDF/' + documentID;

        this.http.get(requestString, {headers: headers, responseType: 'arraybuffer' as 'json'})
        .subscribe(
            (response) => {
                this.pdfSubject.next(response);
                console.log(response);
              },
              (error) => console.log(error)
            );
    }

    // getPdfBlob(){
    //     return pdfBlob;
    // }

    addToDocumentInformationArray(document: DocumentBP) {
        let addingDocument = new DocumentBP(
            document.id, 
            document.year, 
            document.month, 
            document.institution,
            document.importance,
            document.description);
        this.documentsInformation.push(addingDocument);
    }




}
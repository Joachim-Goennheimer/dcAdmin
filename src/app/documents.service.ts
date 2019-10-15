import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DocumentBP } from './datamodel/documentBP.model';
import { AuthService } from './auth/auth.service';

let pdfBlob: Blob;


@Injectable()
export class DocumentsService {


    documentsInformationSubject = new Subject();
    documentsInformation: DocumentBP[] = [];

    pdfSubject = new Subject();

    numberImportPdfs: number;
    scannedPdfSubject = new Subject();


    constructor(private http: HttpClient,
        private authService: AuthService){

    }


    importDocuments(){
        this.http.get("https://webfileviewerproject.herokuapp.com/importDocuments", {responseType: 'arraybuffer' as 'json'})
        .subscribe(
            (response) => {
                this.scannedPdfSubject.next(response);
              },
              (error) => console.log(error)
            );
    }

    saveDocument(document: Object){
        const httpOptions = {
            headers: new HttpHeaders({
            //     'host': "webfileviewerproject.herokuapp.com",
              'Access-Control-Allow-Origin': '*',
            //   'Accept': '*/*',
              'content-type': "application/json"
            })
        }
        this.http.post("https://webfileviewerproject.herokuapp.com/currentDocumentData", document, httpOptions)
        .subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        )

    }

    getDocumentsInformation(){
        class ReturnObjectFormat {
            documentInfo: DocumentBP[];
        }

        const accessToken = this.authService.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
              'responseType':  'application/json',
            //   'Authorization': 'my-auth-token',
              'x-access-token': accessToken
            })
        }

        console.log("in getDocumentsInformation function");
        // this.http.get<ReturnObjectFormat>("https://webfileviewerproject.herokuapp.com/documents", {responseType: 'json'})
        this.http.get<ReturnObjectFormat>("https://webfileviewerproject.herokuapp.com/documents", httpOptions)
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

    getDocumentPDF(documentID: number){

        this.http.get("https://webfileviewerproject.herokuapp.com/document", {responseType: 'arraybuffer' as 'json'})
        .subscribe(
            (response) => {
                this.pdfSubject.next(response);
              },
              (error) => console.log(error)
            );
    }

    getPdfBlob(){
        return pdfBlob;
    }

    addToDocumentInformationArray(document: DocumentBP){
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
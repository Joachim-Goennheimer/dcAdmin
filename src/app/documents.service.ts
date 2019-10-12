import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

let pdfBlob: Blob;

@Injectable()
export class DocumentsService {


    documentsInformation: Object[];

    pdfSubject = new Subject();

    constructor(private http: HttpClient){

    }


    importDocuments(){
        this.http.get("https://webfileviewerproject.herokuapp.com/importDocuments");
    }

    saveDocument(document: Object){
        this.http.post("https://webfileviewerproject.herokuapp.com/currentDocumentData", document);
    }

    getDocumentsInformation(){

        this.http.get("https://webfileviewerproject.herokuapp.com/documents", {responseType: 'json'})
        .subscribe(
            (response) => {
                console.log(response);
            },
            (error) => console.log(error)
        );

    }

    getDocumentPDF(documentID: number){
        const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});

        // this.http.get("https://webfileviewerproject.herokuapp.com/document", {responseType: 'blob'})
        // .subscribe(
        //     (response) => {
        //         pdfBlob = new Blob([response], { type: 'application/pdf' });
        //         this.pdfSubject.next(pdfBlob);
        //       },
        //       (error) => console.log(error)
        //     );
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




}
export class Institution {
    
    name: string;
    address: string;
    contactMail: string;
    telephoneNumber: number;

    constructor(name: string){
        this.name = name;
    }

    setAddress(address: string){
        this.address = address;
    }

    setContactMail(contactMail: string){
        this.contactMail = this.contactMail;
    }

    settelephoneNumber(telephoneNumber: number){
        this.telephoneNumber = telephoneNumber;
    }

}
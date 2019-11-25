/**
 * Currently not in use. Institution is just a string but could be replaced later by an Institution object.
 * This might enable the user to directly call an institution or send an email.
 */
export class Institution {
    name: string;
    address: string;
    contactMail: string;
    telephoneNumber: number;

    constructor(name: string) {
        this.name = name;
    }

    setAddress(address: string) {
        this.address = address;
    }

    setContactMail(contactMail: string) {
        this.contactMail = this.contactMail;
    }

    settelephoneNumber(telephoneNumber: number) {
        this.telephoneNumber = telephoneNumber;
    }

}

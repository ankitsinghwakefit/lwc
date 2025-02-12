import { LightningElement } from 'lwc';
import CONTACT_TYPE from '@salesforce/schema/Contact';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';
import DESCRIPTION from '@salesforce/schema/Contact.Description';

export default class RecordEdit extends LightningElement {
    objectApiName = CONTACT_TYPE;
    fields = {
        fName:FIRST_NAME,
        lName:LAST_NAME,
        email:EMAIL,
        desc:DESCRIPTION
    }
    handleReset(){
        console.log("resetting fields");
        let fields = this.template.querySelectorAll('lightning-input-field')
        if(fields.length){
            fields.forEach(field => {
                field.reset();
            })
        }
    }
}
import { LightningElement, api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import AnnualRevenue from '@salesforce/schema/Account.AnnualRevenue';
import FIELD_TYPE from '@salesforce/schema/Account.Type';
import FIELD_INDUSTRY from '@salesforce/schema/Account.Industry';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class RecordForm extends NavigationMixin(LightningElement) {
    @api recordId
    @api objectApiName
    objectApi = ACCOUNT_OBJECT;
    fields = [NAME_FIELD, AnnualRevenue, FIELD_TYPE, FIELD_INDUSTRY];
    handleFor(event){
        // Navigate to the Account home page
    //     this[NavigationMixin.Navigate]({
    //        type: 'standard__namedPage',
    //        attributes: {
    //            pageName: 'home',
    //        },
    //    });
        const evt = new ShowToastEvent({
            title: 'Account created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
}
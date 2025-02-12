import { LightningElement, wire } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import Id from '@salesforce/user/Id';
import OBJECT_NAME from '@salesforce/schema/Account.Industry';
import OBJECT from '@salesforce/schema/Account';
import USER_EMAIL from '@salesforce/schema/User.Email';

export default class WireFunctions extends LightningElement {
    userId = Id;
    getDefaultRecordTypeId;
    statusOptions;
    value;
    @wire(getObjectInfo, {objectApiName:OBJECT})
    objectInfo({data, error}){
        if(data){
            this.getDefaultRecordTypeId = data.defaultRecordTypeId;
            console.log('Object Info: ', data);
        } else {
            console.log('Error: ', error);
        }
    }

    @wire(getPicklistValues, {recordTypeId: '$getDefaultRecordTypeId', fieldApiName: OBJECT_NAME})
    annualRevenueValues(response){
        this.statusOptions = response?.data?.values;
        console.log('Annual Revenue: ',response);
    }

    handleChange(event) {
        // Get the string of the "value" attribute on the selected option
        this.value = event.detail.value;
        console.log(event.detail.value);
    }
    
    // @wire(getObjectInfo, {objectApiName: OBJECT_NAME})
    // objectInfo;
    // getObjectInfo({data, error}){
    //     if(data){
    //         this.objectInfo = data;
    //         console.log('Object Info: ', this.objectInfo);
    //     } else {
    //         console.log('Error: ', error);
    //     }
    // }
    //005dL00000ABdbTQAT
    // userName;
    // userEmail;
    // userDetails;
    // @wire(getRecord, {recordId:'$userId', fields:[USER_NAME, USER_EMAIL]})
    // userDetailHandler({data, error}){
    //     console.log('Data: ', data);
    //     if(data){
    //         this.userDetails = data?.fields;
    //         this.userName = data.fields.Name.value;
    //         this.userEmail = data.fields.Email.value;
    //         console.log('userDeatails: ', this.userDetails, this.userEmail);
    //     } else {
    //         console.log('Error: ', error);
    //     }
    // }
}
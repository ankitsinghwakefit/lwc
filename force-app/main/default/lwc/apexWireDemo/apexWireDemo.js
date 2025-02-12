import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList'
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
export default class ApexWireDemo extends LightningElement {
    userAccounts;
    statusOptions;
    recordId;
    selectedActType;
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo({ data, error }) {
        if (data) {
            this.recordId = data?.defaultRecordTypeId;
            console.log(data);
        } else {
            console.log(error);
        }
    }
    @wire(getPicklistValues, { fieldApiName: TYPE_FIELD, recordTypeId: '$recordId' })
    getAccountTypes({ data, error }) {
        if (data) {
            this.statusOptions = data?.values;
            console.log(data);
        } else {
            console.log(error);
        }
    }
    handleChange(event) {
        this.selectedActType = event.detail.value;
        console.log(this.selectedActType);
    }
    handleClick(event) {
        console.log(event.target);
    }
    @wire(getAccountList, { account: ACCOUNT_OBJECT, acctType: '$selectedActType', limits: 10 })
    ab({ data, error }) {
        if (data) {
            this.userAccounts = this.getRefactoredData(data);
            console.log(data);
        } else {
            console.log(error)
        }
    }
    getRefactoredData(data) {
        return data.map(acct => {
            if (acct.Type === 'Customer - Direct') {
                return { ...acct, Type: 'Direct' }
            } else if (acct.Type === 'Customer - Channel') {
                return { ...acct, Type: 'Channel' }
            } else {
                return { ...acct, Type: '---' }
            }
        })
    }
    handleImperativeClick() {
        fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => { response.json() }).then(res => { console.log('res',res) }).catch(err => { console.log(err) });
        console.log('handleImperativeClick');
    }
}
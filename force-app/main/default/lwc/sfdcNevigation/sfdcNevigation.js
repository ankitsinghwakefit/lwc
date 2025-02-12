import { LightningElement, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference  } from 'lightning/navigation';

export default class SfdcNevigation extends NavigationMixin(LightningElement) {
    @wire(CurrentPageReference)
    pageRef;
    handleNevigation(){
        console.log('nevigation...', this.pageRef)
          // Navigate to the new record page
        // this[NavigationMixin.Navigate]({
        //     type: 'standard__objectPage',
        //     attributes: {
        //         objectApiName: 'Contact',
        //         actionName: 'new',
        //     },
        // });

        // Navigate to the chatter page
    //         this[NavigationMixin.Navigate]({
    //        type: 'standard__namedPage',
    //        attributes: {
    //            pageName: 'chatter',
    //        },
    //    });


        // Navigate to the Account home page
    //     this[NavigationMixin.Navigate]({
    //        type: 'standard__namedPage',
    //        attributes: {
    //            pageName: 'home',
    //        },
    //    });


         // Navigate to the Account home page
        //  this[NavigationMixin.Navigate]({
        //     type: 'standard__objectPage',
        //     attributes: {
        //         objectApiName: 'Account',
        //         actionName: 'home',
        //     },
        // });
    }
}
import { LightningElement } from 'lwc';

export default class MyFirstComponent extends LightningElement {
    name = "My First Component";
    handleChange(event){
        this.name = event.target.value;
    }
}
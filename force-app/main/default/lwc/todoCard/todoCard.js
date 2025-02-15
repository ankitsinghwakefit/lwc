import { LightningElement, api } from 'lwc';

export default class TodoCard extends LightningElement {
    @api todoData;
    connectedCallback(){
        console.log('Contact: ', this.todoData);
    }
    editTodo(){
        console.log('editTodo in card', this.todoData);
        this.dispatchEvent(new CustomEvent('edittodo', {detail: this.todoData}));
    }
}
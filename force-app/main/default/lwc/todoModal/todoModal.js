import { LightningElement, api } from 'lwc';

export default class TodoModal extends LightningElement {
    @api editTodoData;
    todoTitle;
    todoDescription;
    todoState;
    options = [
        {value: 'new', label: 'New'},
        {value: 'inProgress', label: 'In Progress'},
        {value: 'completed', label: 'Completed'}
    ]
    handleProgress(event){
        console.log('event.target.value', event.target.value);
        this.todoState = event.target.value;
    }
    handleTodoTitle(event){
        this.todoTitle = event.target.value || '';
    }
    handleTodoDescription(event){
        this.todoDescription = event.target.value || '';
    }
    get isEdit(){
        return this.editTodoData?.title;
    }
    get buttonLabel(){
        return this.isEdit ? 'Delete' : 'Cancel'
    }
    connectedCallback(){
        console.log('editTodoData', this.editTodoData.title);
        if(this.editTodoData.title){
            this.todoTitle = this.editTodoData.title;
            this.todoDescription = this.editTodoData.description;
        } else {
            this.todoTitle = '';
            this.todoDescription = '';
        }
    }
    saveTodo(){
        if(!this.todoTitle || !this.todoDescription){
            return;
        }
        const todoData = {title: this.todoTitle, description: this.todoDescription, createdOn: new Date(), status: this.todoState || 'new'};
        if(this.isEdit){
            todoData.id = this.editTodoData.id;
        }
        this.dispatchEvent(new CustomEvent('newdata', {detail: todoData}));
    }
    handleDelete(){
        this.dispatchEvent(new CustomEvent('deletedata', {detail: this.editTodoData}));
    }
    handleCancel(){
        this.dispatchEvent(new CustomEvent('handleclosemodal'));
    }
}
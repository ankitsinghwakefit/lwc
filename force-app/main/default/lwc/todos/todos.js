import { LightningElement, track } from 'lwc';

export default class Todos extends LightningElement {
   isModalOpen = false;
   @track editData;
   @track todoItem = [
      {
   id: 1,
    title : 'new Todo',
    description : 'This is a test todo',
    createdOn: new Date(),
    status: 'new'
   },
   {
      id: 2,
      title : 'inProgress Todo',
      description : 'This is a test todo',
      createdOn: new Date(),
      status: 'inProgress'
     },
     {
      id: 3,
      title : 'completed Todo',
      description : 'This is a test todo',
      createdOn: new Date(),
      status: 'completed'
     }
];
handleNewTodo(){
   this.editData = {};
   this.isModalOpen = true;
}
handleEditTodo(event){
   this.editData = event.detail;
   this.isModalOpen = true;
   var taskId = event.detail.id;
   console.log('handleEditTodo in todos',taskId, this.editData.id);
}
deleteTodo(event){
   this.todoItem = this.todoItem.filter(todo => todo.id !== event.detail.id);
   this.isModalOpen = false;
}
saveNewTask(event){
   if(event.detail.id){
      const index = this.todoItem.findIndex(todo => todo.id === event.detail.id);
      this.todoItem[index] = {...event.detail};
   } else {
      this.todoItem.push({...event.detail, id: this.todoItem.length + 1});
   }
   this.handleCloseModal();
}
handleCloseModal(){
   console.log('handleCloseModal in todos');
   this.isModalOpen = false;
}
connectedCallback(){
   console.log('handleNewTodo', this.todoItem);
}
get newTodos(){
   return this.todoItem.filter(todo => todo.status === 'new');
}
get inProgressTodos(){
   return this.todoItem.filter(todo => todo.status === 'inProgress');
}
get completedTodos(){
   return this.todoItem.filter(todo => todo.status === 'completed');
}
}
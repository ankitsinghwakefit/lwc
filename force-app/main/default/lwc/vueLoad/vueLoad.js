import { LightningElement } from 'lwc';
// import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
// import VueAppResource from '@salesforce/resourceUrl/VueApp'; // Reference the Static Resource

export default class VueLoad extends LightningElement {
    // connectedCallback() {
    //     console.log('Vue.js app loading...');
    //     // Load Vue.js and your app files from the Static Resource
    //     Promise.all([
    //         loadScript(this, VueAppResource + '/js/chunk-vendors.16e1635e.js'),
    //         loadScript(this, VueAppResource + '/js/app.23b5c81c.js'),
    //         loadStyle(this, VueAppResource + '/css/app.46c485c8.css')
    //     ])
    //     .then(() => {
    //         console.log('Vue.js app loaded successfully');
    //         // Initialize your Vue.js app here
    //         // new window.Vue({
    //         //     el: '#vue-app', // Mount Vue.js app to the container
    //         //     template: '<div>Hello from Vue.js!</div>'
    //         // });
    //     })
    //     .catch(error => {
    //         console.error('Error loading Vue.js app:', error);
    //     });
    // }
}

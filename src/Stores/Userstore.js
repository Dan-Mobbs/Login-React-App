import { extendObservable } from 'mobx';

class Userstore {
    constructor() {
        
        extendObservable(this, {
            loading: true,
            isLoggedin: false,
            username: ''
        
        })
    }
}

export default Userstore;
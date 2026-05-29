export default class Services {
    
    
    constructor() {
    }
    getAdat(vegpont, callback) {
        fetch(vegpont)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                callback(json);
            })
            .catch(error => console.log(error));
    }
}
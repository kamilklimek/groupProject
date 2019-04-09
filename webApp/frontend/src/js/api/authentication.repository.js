export default class AuthenticationRepository {
    constructor(store) {
        this.store = store;
    }

    getHeaders = () => {
        return {
            'Content-Type': 'application/json'
        };
    }

    handleError = response => {
        if (!response)
            throw Error(response.message);
            
        if (response.status >= 300) {
            throw Error(response.message)
        }    
        return response;
    }
    
    loginUser = (email, password) => {
        return fetch('http://localhost:8090/auth/login', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({
                email, password,
            })
        })
        .then(response => this.handleError(response))
        .then(response => response.json())
        .catch(err => console.warn("Caught error while trying to login user. ", err));
    }    

    registerUser = user => {
        return fetch('http://localhost:8090/auth/register/user', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(user),
        })
        .then(response => this.handleError(response))
        .then(response => response.json())
        .catch(err => console.warn("Caught error while trying to register user", err));
    }

    registerCompany = company => {
        return fetch('http://localhost:8090/auth/register/company', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(company),
        })
        .then(response => this.handleError(response))
        .then(response => response.json())
        .catch(err => console.warn("Caught error while trying to register company", err));
    }
}
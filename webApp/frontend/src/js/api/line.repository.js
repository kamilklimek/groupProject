import { handleError } from './handleErrors.service';

export default class LineRepository {
    constructor(store) {
        this.store = store;
    }


    getHeaders = () => {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.store.getState().JWT}`,
        };
    }

    createLine = line => {
        return fetch(`http://localhost:8090/line`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(line),
        })
            .then(response => handleError(response))
            .catch(err => {
                console.warn("Caught error while trying to create line. ", err);
                return Promise.reject(err);
            });
    }

    editLine = line => {
        console.log(line);
        return fetch(`http://localhost:8090/line/${line.id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(line),
        })
            .then(response => handleError(response))
            .catch(err => {
                console.warn("Caught error while trying to edit line. ", err);
                return Promise.reject(err);
            });
    }

    getLineById = (id = '') => {
        return fetch(`http://localhost:8090/line/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        })
            .then(response => handleError(response))
            .then(response => response.json())
            .catch(err => console.warn("Caught error while trying to get line by search value. ", err));
    }

    getCompanyLines = () => {
        return fetch(`http://localhost:8090/line/company`, {
            method: 'GET',
            headers: this.getHeaders(),
        })
            .then(response => handleError(response))
            .then(response => response.json())
            .catch(err => console.warn("Caught error while trying to get company lines. ", err));
    }

    getLineStages = (id = '') => {
        return fetch(`http://localhost:8090/line/stages/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        })
            .then(response => handleError(response))
            .then(response => response.json())
            .catch(err => console.warn("Caught error while trying to get line stages. ", err));
    }

    getLineModules = (id = '') => {
        return fetch(`http://localhost:8090/line/modules/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        })
            .then(response => handleError(response))
            .then(response => response.json())
            .catch(err => console.warn("Caught error while trying to get line modules. ", err));
    }
}
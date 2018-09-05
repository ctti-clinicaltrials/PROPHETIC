import AuthStore from '../stores/AuthStore';

export function getFetchParams(method, apiToken, body, isFormData) {
    let obj = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': apiToken ? apiToken : ''
        }
    };
    if(body && isFormData) {
        obj.body = body;
        obj.headers = {'Authorization': apiToken ? apiToken : ''}
    }
    else if(body) obj.body = JSON.stringify(body);
    return obj;
}

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        if(response.status === 401) {
            AuthStore.logout(401);
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}
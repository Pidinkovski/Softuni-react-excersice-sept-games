export default async function requester(url, method = 'GET', data) {

    const options = {
        method,
        headers: {}
    };

    if (method !== 'GET' && data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
    }
    if (response.status === 204) {
        return null;
    }

    return response.json();
}
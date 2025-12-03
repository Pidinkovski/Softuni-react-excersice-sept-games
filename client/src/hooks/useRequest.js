

export default function useRequest() {


    async function request(url, method = 'GET', data , user) {

        const options = {
            method,
            headers: {}
        };

        if (method !== 'GET' && data !== undefined) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }
        if(user) {
            options.headers = {
                ...options.headers,
                ['X-Authorization'] : user.accessToken
            }
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
    return { request}
}
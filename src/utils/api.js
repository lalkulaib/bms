//const serverUrl = 'http://localhost:8080/';
const serverUrl = 'http://192.168.10.222:8082';
export default function api(url, method, body){
    var myRequest = new Request(serverUrl + url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    return fetch(myRequest)
        .then(response => response.json())
        .catch(err => err)

}

export function httpGet(url) {
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then((response) => response.json())
}

export function httpPost(url, data) {
    return fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }, 
        body: JSON.stringify(data)
    }).then((response) => response.json())
}
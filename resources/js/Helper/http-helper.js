import { usePage } from '@inertiajs/vue3';

export function httpGet(url) {
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then((response) => response.json())
}

export function httpPost(url, data) {
    const page = usePage()
    console.log(page.props.csrf_token)
    return new Promise((resolve, reject) => {
        return fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': page.props.csrf_token,
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                resolve(response.json())
            } else {
                response.json().then((data) => {
                    reject({ response, error: data})
                })
            }
        })
    })
}

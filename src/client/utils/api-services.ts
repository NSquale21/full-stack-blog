export let Token: string = localStorage.getItem('token') || null;

export const logout = () => {
    Token = null;
    localStorage.clear();
}

export const setLogin = (token: string) => {
    Token = token;
    localStorage.setItem('token', Token);
}

export const api = async <T = any> (uri: string, method: string = 'GET', body?: {}) => {
    const headers: Headers = {
        'Content-Type': 'application/json'
    }
    if (Token) {
        headers['Authorization'] = `Bearer ${Token}`;
    }
    try {
        const res = await fetch(uri, {
            method,
            headers,
            body: JSON.stringify(body)
        });
        if (res.ok) {
            return <T>await res.json();
        }
    } catch (error) {
        console.log(error);
    }
}

type Headers = {
    [key: string]: string
}

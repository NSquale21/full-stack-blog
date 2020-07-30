import { application } from "express"

export const api = async <T = any> (uri: string, method: string = 'GET', body?: {}) => {
    const headers: Headers = {
        'Content-Type': 'application/json'
    }
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
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

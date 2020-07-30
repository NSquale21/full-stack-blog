import { api } from './api-services';

const getAll = async () => {
    const blogs = await api('/api/blogs');
    return blogs;
}

export default { getAll };
import { Query } from '../index';
import { TComments, TAuthors } from '../models';

const forBlog = (id: number) => Query<(TComments | TAuthors)[]>('SELECT comments.*, authors.name FROM comments JOIN authors ON authors.id = authors_id WHERE blog_id = ? ORDER BY comments.created_at ASC;', [id]);

export default {
    forBlog
}
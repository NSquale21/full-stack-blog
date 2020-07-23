import { Query } from '../index';
import type { TAuthors, TBlogs, MySQLResponse } from '../models';

const all = () => Query<Array<TAuthors | TBlogs>>('SELECT blogs.*, authors.username AS name FROM blogs JOIN authors ON blogs.author_id = authors.id');

const one = (id: number) => Query<Array<TAuthors | TBlogs>>('SELECT blogs.*, authors.username AS name FROM blogs JOIN authors ON blogs.author_id = authors.id WHERE blogs.id = ?', [id]);

const insert = (title: string, content: string, image_url: string, author_id: number) => Query<MySQLResponse>('INSERT INTO blogs (title, content, image_url, author_id) VALUES (?)', [[title, content, image_url, author_id]]);

const destroy = (id: number, author_id: number) => Query<MySQLResponse>('DELETE FROM blogs WHERE id = ? AND author_id = ?', [id, author_id]);

const update = (title: string, content: string, image_url: string, id: number, author_id: number) => Query<MySQLResponse>('UPDATE blogs SET title = ?, content = ?, image_url = ? WHERE id = ? AND author_id = ?', [title, content, image_url, id, author_id]);

const writtenBy = (author_id: number) => Query<Array<TAuthors | TBlogs>>('SELECT blogs.*, authors.username AS name FROM blogs JOIN authors ON blogs.author_id = authors.id WHERE blogs.author_id = ?', [author_id]);

export default {
    all,
    one,
    insert,
    destroy,
    update,
    writtenBy
}
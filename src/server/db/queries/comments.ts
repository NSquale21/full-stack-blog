import { Query } from '../index';
import { TComments, TAuthors, MySQLResponse } from '../models';

const forBlog = (id: number) => Query<(TComments | TAuthors)[]>('SELECT comments.*, authors.username, authors.avatar FROM comments JOIN authors ON authors.id = authors_id WHERE blog_id = ? ORDER BY comments.created_at ASC;', [id]);

const insertComment = (content: string, blog_id: number, author_id: number) => Query<MySQLResponse>('INSERT INTO comments (content, blog_id, authors_id) VALUES (?)', [[content, blog_id, author_id]]);

const updateComment = (content: string, id: number, author_id: number) => Query<MySQLResponse>('UPDATE comments SET content = ? WHERE id = ? AND authors_id = ?', [content, id, author_id]);

const destroyComment = (id: number, author_id: number) => Query<MySQLResponse>('DELETE FROM comments WHERE id = ? AND authors_id = ?', [id, author_id]);

const commentCount = (id: number) => Query<{ comment_count: number }[]>('SELECT COUNT(*) as comment_count FROM comments WHERE blog_id = ?', [id]);

const commentAuthor = (authors_id: number) => Query('SELECT * FROM comments WHERE authors_id = ?', [authors_id]);

export default {
  forBlog,
  insertComment,
  updateComment,
  destroyComment,
  commentCount,
  commentAuthor
}
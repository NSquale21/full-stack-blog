import { Query } from '../index';
import { TBlogTags, MySQLResponse, TBlogs } from '../models';

const getTags = () => Query<Array<TBlogTags>>('SELECT * FROM tags');

const getOneBlogTag = (tag_id: number) => Query<Array<TBlogTags>>('SELECT tags.tag_name, tags.id FROM blog_tags JOIN tags ON blog_tags.tag_id = tags.id WHERE blog_tags.blog_id = ?', [tag_id]);

const insertBlogTags = (blog_id: number, tag_id: number) => Query<MySQLResponse>('INSERT INTO blog_tags (blog_id, tag_id ) VALUES (?)', [[blog_id, tag_id]]);

const updateBlogTags = (blog_id: number, tag_id: string) => Query<MySQLResponse>('UPDATE blog_tags SET tag_id = ? WHERE blog_id = ?', [tag_id, blog_id]);

const filterTags = (tag_name: string) => Query('CALL filterTags(?)', [tag_name]);

export default {
    getTags,
    getOneBlogTag,
    insertBlogTags,
    updateBlogTags,
    filterTags
}
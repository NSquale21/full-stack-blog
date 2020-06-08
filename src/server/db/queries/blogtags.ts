// execute the query from workbench
import { Query } from '../index';
import { TBlogTags, MySQLResponse, TBlogs } from '../models';

const getTags = () => Query<Array<TBlogTags>>('SELECT * FROM tags');

const getOneBlogTag = (tag_id: number) => Query<Array<TBlogTags>>('SELECT tags.tag_name, tags.id FROM blog_tags JOIN tags ON blog_tags.tag_id = tags.id WHERE blog_tags.blog_id = ?', [tag_id]);

const insertBlogTags = (blog_id: number, tag_id: number) => Query<MySQLResponse>('INSERT INTO blog_tags (blog_id, tag_id ) VALUES (?)', [[blog_id, tag_id]]);

const updateBlogTags = (blog_id: number, tag_id: string) => Query<MySQLResponse>('UPDATE blog_tags SET tag_id = ? WHERE blog_id = ?', [tag_id, blog_id]);

const filterTags = (tag_name: string) => Query<Array<TBlogTags | TBlogs>>('SELECT blog_tags.*, blogs.* FROM blog_tags JOIN blogs ON blog_tags.blog_id = blogs.id JOIN tags ON blog_tags.tag_id = tags.id WHERE tag_name = ?;', [tag_name]);

// const filterTags = (tag_name: string) => Query<Array<TBlogTags | TBlogs>>('SELECT * FROM blog_tags JOIN blogs ON blog_tags.blog_id = blogs.id JOIN tags ON blog_tags.tag_id = tags.id WHERE tag_name = ?;', [tag_name]);

// const filterTags = (tag_id: number) => Query<Array<TBlogTags | TBlogs>>('SELECT * FROM blog_tags JOIN blogs ON blog_tags.blog_id = blogs.id WHERE tag_id = ?;', [tag_id]);

export default {
    getTags,
    getOneBlogTag,
    insertBlogTags,
    updateBlogTags,
    filterTags
}

// SELECT * from blog_tags
// JOIN blogs ON blog_tags.blog_id = blogs.id
// JOIN tags ON blog_tags.tag_id = tags.id
// WHERE tag_name = 'music';
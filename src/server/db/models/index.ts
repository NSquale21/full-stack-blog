export interface TBlogs {
    id?: number;
    title?: string;
    image_url?: string;
    content?: string;
    author_id?: number;
    created_at?: Date;
}

export interface TAuthors {
    id?: number;
    username?: string;
    email?: string;
    avatar?: string;
    password?: string;
    banned?: number;
    created_at?: Date;
}

export interface TBlogTags {
    blog_id?: number;
    tag_id?: number;
    tag_name?: string;
}

export interface TComments {
	id?: number;
    content?: string;
	created_at?: Date;
	blog_id?: number;
	authors_id: number;
}

export interface MySQLResponse {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    serverStatus: number,
    warningCount: number,
    message: string,
    protocol41: boolean,
    changedRows: number
}

export interface TTokens {
    id?: number;
    author_id?: number;
    uniq?: string;
    val?: string;
    created_at?: Date
}
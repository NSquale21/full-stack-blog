export interface TBlogs {
    id?: number;
    title?: string;
    image_url?: string;
    content?: string;
    author_id?: number;
    created_at?: Date;
}

export interface TAuthors {
    username?: string;
    email?: string;
    password?: string;
    created_at?: Date;
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
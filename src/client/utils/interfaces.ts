export interface IBlog {
	id?: number;
	title?: string;
	image_url?: string;
	content?: string;
	author_id?: number;
	created_at?: Date;
	name?: string;
}

export interface ITag {
	tag_name?: string;
	id?: number;
}

export interface IComment {
	id?: number;
	content?: string;
	username?: string;
	avatar?: string;
	created_at?: Date;
	blog_id?: number;
	authors_id: number;
}
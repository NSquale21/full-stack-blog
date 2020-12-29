import { Query } from '../index';
import type { TTokens, MySQLResponse, TAuthors } from '../models';

const insert = (stuff: any) => Query<MySQLResponse>('INSERT INTO tokens SET ?', stuff);

const update = (token: string, id: number) => Query<MySQLResponse>('UPDATE tokens SET val = ? WHERE id = ?', [token, id]);

const destroy = (token: string, author_id: number) => Query<MySQLResponse>('DELETE FROM tokens WHERE val = ? AND author_id = ?', [token, author_id]);

const match = (token_id: number, author_id: number, uniq: string) => Query<TAuthors[]>('SELECT authors.* FROM tokens JOIN authors ON authors.id = tokens.author_id WHERE tokens.id = ? AND author_id = ? AND uniq = ?', [token_id, author_id, uniq]);

export default {
    insert,
    update,
    destroy,
    match
}
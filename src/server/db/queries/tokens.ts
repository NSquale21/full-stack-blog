import { Query } from '../index';
import type { TTokens, MySQLResponse } from '../models';

const insert = (stuff: any) => Query<MySQLResponse>('INSERT INTO tokens SET ?', stuff);

const update = (token: string, id: number) => Query<MySQLResponse>('UPDATE tokens SET val = ? WHERE id = ?', [token, id]);

const destroy = (token: string, author_id: number) => Query<MySQLResponse>('DELETE FROM tokens WHERE val = ? AND author_id = ?', [token, author_id]);

export default {
    insert,
    update,
    destroy
}
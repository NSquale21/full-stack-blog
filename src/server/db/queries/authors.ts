import { Query } from '../index';
import type { TAuthors, MySQLResponse } from '../models';

const find = (column: string, value: string | number) => Query<TAuthors[]>('SELECT * FROM authors WHERE ?? = ?', [column, value]);

const insert = (newUser: unknown) => Query<MySQLResponse>('INSERT INTO authors SET ?', newUser);

export default {
    find,
    insert
}
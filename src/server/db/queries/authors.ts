import { Query } from '../index';
import type { TAuthors, MySQLResponse } from '../models';

const find = (column: string, value: string | number) => Query<TAuthors[]>('SELECT * FROM authors WHERE ?? = ?', [column, value]);

export default {
    find
}
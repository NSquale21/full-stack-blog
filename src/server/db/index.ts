import * as mysql from 'mysql';
import config from '../config';

const pool = mysql.createPool(config.mysql);

export const Query = <T = any>(query: string, values?: Array<any> | { [key: string]: string | number }) => {
    return new Promise<T>((resolve, reject) => {
      pool.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  import blogs from './queries/blogs';
  import blogtags from './queries/blogtags';
  import comments from './queries/comments';
  import authors from './queries/authors';
  import tokens from './queries/tokens';
  export default {
    blogs,
    blogtags,
    comments,
    authors,
    tokens
  }
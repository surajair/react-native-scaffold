import {get, startsWith} from 'lodash';
import {DatabaseApi} from '../../types';
import {buildQuery} from '../DbHelper';

const BetterDatabase = require('better-sqlite3');
export const Db = new BetterDatabase(':memory:');

const initializeDatabase = (): DatabaseApi => {
  const Api: DatabaseApi = {
    migrate: async (migrations: Array<string>, endIndex: number = 0) => {
      const transactions: Array<Promise<boolean>> = [];
      for (let j = 0; j <= endIndex; j++) {
        let migrationSQLs = get(migrations, j, []);
        for (let i = 0; i < migrationSQLs.length; i++) {
          transactions.push(Api.run(migrationSQLs[i]));
        }
      }
      return Promise.all(transactions);
    },
    run: async (sqlQuery: string) => {
      return new Promise<any>((resolve) => {
        let data = Db.prepare(sqlQuery)[
          startsWith(sqlQuery, 'SELECT') ? 'all' : 'run'
        ]();
        resolve(data);
      });
    },
    getAll: async (sqlQuery: string): Promise<Array<any>> => {
      return Api.run(sqlQuery);
    },
    getFirst: async (sqlQuery: string): Promise<any | undefined> => {
      return Api.run(sqlQuery);
    },
    update: async () => {},
    insert: async (tableName: string, row: any) => {
      let sqlQuery: string = buildQuery(tableName, row);
      return Api.run(sqlQuery);
    },
    insertAll: async (tableName: string, rows: Array<any>) => {
      const transactions: Array<Promise<any>> = [];
      for (let i = 0; i < rows.length; i++) {
        transactions.push(Api.insert(tableName, rows[i]));
      }
      return Promise.all(transactions);
    },
    replace: async (_tableName: string, _row: any) => {},
    replaceAll: async () => {},
    truncate: async (tableNames: Array<string>) => {
      const transactions: Array<Promise<boolean>> = [];
      for (let i = 0; i < tableNames.length; i++) {
        transactions.push(Api.run('DELETE FROM ' + tableNames[i]));
      }
      return Promise.all(transactions);
    },
    dropTables: async (tableNames: Array<string>) => {
      const transactions: Array<Promise<boolean>> = [];
      for (let i = 0; i < tableNames.length; i++) {
        transactions.push(Api.run('DROP TABLE ' + tableNames[i]));
      }
      return Promise.all(transactions);
    },
  };
  return Api;
};

export const Database: DatabaseApi = initializeDatabase();

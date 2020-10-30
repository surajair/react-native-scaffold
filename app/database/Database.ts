import {
  openDatabase,
  ResultSet,
  SQLError,
  SQLiteDatabase,
  Transaction,
} from 'react-native-sqlite-storage';
import {get} from 'lodash';
import {DatabaseApi} from '../types';
import {buildQuery} from './DbHelper';

const Db: SQLiteDatabase = openDatabase(
  {name: 'truckx_dispatcher', location: 'default'},
  () => {},
  (_er: SQLError) => {},
);

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
      return new Promise<any>((resolve, reject) => {
        Db.transaction((tx: Transaction) => {
          tx.executeSql(
            sqlQuery,
            [],
            (_tx: Transaction, resultSet: ResultSet) => {
              resolve(resultSet);
            },
            reject,
          );
        });
      });
    },
    getAll: async (sqlQuery: string): Promise<Array<any>> => {
      return new Promise<Array<any>>((resolve, reject) => {
        Db.transaction((tx: Transaction) => {
          tx.executeSql(
            sqlQuery,
            [],
            (_tx: Transaction, resultSet: ResultSet) => {
              let rows: Array<any> = [];
              let len: number = resultSet.rows.length;
              for (let i = 0; i < len; i++) {
                rows.push(resultSet.rows.item(i));
              }
              resolve(rows);
            },
            reject,
          );
        });
      });
    },
    getFirst: async (sqlQuery: string): Promise<any | undefined> => {
      return new Promise<any | undefined>((resolve, reject) => {
        Db.transaction((tx: Transaction) => {
          tx.executeSql(
            sqlQuery,
            [],
            (_tx: Transaction, resultSet: ResultSet) => {
              resolve(resultSet.rows.item(0));
            },
            reject,
          );
        });
      });
    },
    update: async () => {},
    insert: async (tableName: string, row: any) => {
      let sqlQuery: string = buildQuery(tableName, row);
      return new Promise<{insertId: number}>((resolve, reject) => {
        Db.transaction((tx: Transaction) => {
          tx.executeSql(
            sqlQuery,
            [],
            (_tx: Transaction, resultSet: ResultSet) => {
              resolve(resultSet);
            },
            reject,
          );
        });
      });
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
        transactions.push(
          new Promise<boolean>((resolve, reject) => {
            Db.transaction((tx: Transaction) => {
              tx.executeSql(
                'DELETE FROM ' + tableNames[i],
                [],
                (_tx: Transaction, _resultSet: ResultSet) => {
                  resolve(true);
                },
                reject,
              );
            });
          }),
        );
      }
      return Promise.all(transactions);
    },
    dropTables: async (tableNames: Array<string>) => {
      const transactions: Array<Promise<boolean>> = [];
      for (let i = 0; i < tableNames.length; i++) {
        transactions.push(
          new Promise<boolean>((resolve, reject) => {
            Db.transaction((tx: Transaction) => {
              tx.executeSql(
                'DROP TABLE ' + tableNames[i],
                [],
                (_tx: Transaction, _resultSet: ResultSet) => {
                  resolve(true);
                },
                reject,
              );
            });
          }),
        );
      }
      return Promise.all(transactions);
    },
  };
  return Api;
};

export const Database = initializeDatabase();

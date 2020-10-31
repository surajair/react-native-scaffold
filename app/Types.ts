export type DatabaseApi = {
  migrate: Function;
  run: Function;
  getAll: Function;
  getFirst: Function;
  update: Function;
  insert: Function;
  insertAll: Function;
  replace: Function;
  replaceAll: Function;
  truncate: Function;
  dropTables: Function;
};

export type Migrations = {
  [index: number]: Array<string>;
};

export type RemoteApi = { get: any; post: any };

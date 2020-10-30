import {Database} from '../app/database/Database';

describe('Database', () => {
  test('run()', async () => {
    const result = await Database.run(
      'CREATE TABLE testTable1(uuid VARCHAR(20) PRIMARY KEY, name VARCHAR(30))',
    );
    expect(result).toEqual({changes: 0, lastInsertRowid: 0});
  });
});

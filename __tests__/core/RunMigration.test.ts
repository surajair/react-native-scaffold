import { expectSaga } from 'redux-saga-test-plan';
import { first, map } from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import { Migrations } from '../../app/Types';
import { Database } from '../../app/database/Database';
import { runMigration } from '../../app/core/RunMigration';
import { STORAGE_CURRENT_MIGRATION_VERSION } from '../../app/Constants';

describe('runMigration', () => {
  it('should throw if the migration index are not in order', async () => {
    const testMigrations: Migrations = {
      0: ['CREATE TABLE test1(uuid VARCHAR(10))'],
      1: ['CREATE TABLE test2(uuid VARCHAR(10))'],
      3: ['CREATE TABLE test3(uuid VARCHAR(10))'],
    };
    console.error = jest.fn();
    await expectSaga(runMigration, testMigrations)
      .call(
        console.error,
        new Error(
          'Incorrect migration index. Please check the migration order. 2 is missing.',
        ),
      )
      .silentRun();
  });

  describe('initial Run', () => {
    afterEach(async (done) => {
      await AsyncStorage.removeItem(STORAGE_CURRENT_MIGRATION_VERSION);
      await Database.dropTables(['test1', 'test2']);
      done();
    });

    it('should create test1 table', async () => {
      const testMigrations: Migrations = {
        0: ['CREATE TABLE test1(uuid VARCHAR(10))'],
      };
      await expectSaga(runMigration, testMigrations).run();
      let tables: Array<any> = await Database.run(
        "SELECT * FROM sqlite_master WHERE type='table'",
      );
      expect(first(tables).name).toBe('test1');
      expect(
        await AsyncStorage.getItem(STORAGE_CURRENT_MIGRATION_VERSION),
      ).toBe('0');
    });

    it('should create two tables', async () => {
      const testMigrations: Migrations = {
        0: [
          'CREATE TABLE test1(uuid VARCHAR(10))',
          'CREATE TABLE test2(uuid VARCHAR(10))',
        ],
      };
      await expectSaga(runMigration, testMigrations).run();
      let tables: Array<any> = await Database.run(
        "SELECT * FROM sqlite_master WHERE type='table'",
      );
      expect(map(tables, 'name')).toEqual(['test1', 'test2']);
    });
  });

  describe('runMigration when perv migration is present', () => {
    const testMigrations: Migrations = {
      0: ['CREATE TABLE test1(uuid VARCHAR(10))'],
      1: ['CREATE TABLE test2(uuid VARCHAR(10))'],
    };
    beforeEach(async (done) => {
      await Database.run(first(testMigrations[0]));
      await AsyncStorage.setItem(STORAGE_CURRENT_MIGRATION_VERSION, '0');
      done();
    });

    afterEach(async (done) => {
      await AsyncStorage.removeItem(STORAGE_CURRENT_MIGRATION_VERSION);
      await Database.dropTables(['test1', 'test2']);
      done();
    });

    it('should run migrations from 1 index', async () => {
      await expectSaga(runMigration, testMigrations).run();
      let tables: Array<any> = await Database.run(
        "SELECT * FROM sqlite_master WHERE type='table'",
      );
      expect(map(tables, 'name')).toEqual(['test1', 'test2']);
      expect(
        await AsyncStorage.getItem(STORAGE_CURRENT_MIGRATION_VERSION),
      ).toBe('1');
    });
  });

  describe('runMigration with multiple migrations', () => {
    // this will happen on fresh install with multiple migration
    const testMigrations: Migrations = {
      0: ['CREATE TABLE test1(uuid VARCHAR(10))'],
      1: ['CREATE TABLE test2(uuid VARCHAR(10))'],
      2: ['CREATE TABLE test3(uuid VARCHAR(10))'],
      3: ['CREATE TABLE test4(uuid VARCHAR(10))'],
    };

    it('should create 4 tables', async () => {
      await expectSaga(runMigration, testMigrations).run();
      let tables: Array<any> = await Database.run(
        "SELECT * FROM sqlite_master WHERE type='table'",
      );
      expect(map(tables, 'name')).toEqual(['test1', 'test2', 'test3', 'test4']);
      expect(
        await AsyncStorage.getItem(STORAGE_CURRENT_MIGRATION_VERSION),
      ).toBe('3');
    });
  });
});

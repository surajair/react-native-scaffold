import { Migrations } from '../Types';
import { isNull, keys, last, isUndefined, map, parseInt } from 'lodash';
import { call } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { Database } from '../database/Database';
import { STORAGE_CURRENT_MIGRATION_VERSION } from '../Constants';

export function* runMigration(migrations: Migrations) {
  const indexes: Array<number> = map(keys(migrations), parseInt);
  for (let i = 0; i < indexes.length; i++) {
    if (i !== indexes[i]) {
      yield call(
        console.error,
        new Error(
          `Incorrect migration index. Please check the migration order. ${i} is missing.`,
        ),
      );
      return false;
    }
  }
  let lastMigration: string | null = yield call(
    AsyncStorage.getItem,
    STORAGE_CURRENT_MIGRATION_VERSION,
  );
  const startMigration: number = isNull(lastMigration)
    ? 0
    : parseInt(lastMigration) + 1;
  for (let k = startMigration; k < indexes.length; k++) {
    for (let i = 0; i < migrations[k].length; i++) {
      // @ts-ignore
      yield call(Database.run, migrations[k][i]);
    }
  }
  let latestVersion = !isUndefined(last(indexes)) ? last(indexes) + '' : '';
  yield call(
    AsyncStorage.setItem,
    STORAGE_CURRENT_MIGRATION_VERSION,
    latestVersion,
  );
}

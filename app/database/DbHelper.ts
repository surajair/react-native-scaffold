import { map } from 'lodash';
import { format } from 'sqlstring';

export const buildQuery = (
  tableName: string,
  insertValues: any,
  type: string = 'INSERT',
) => {
  let keys: Array<string> = [];
  let values: Array<any> = [];
  for (let key in insertValues) {
    keys.push(key);
    values.push(insertValues[key]);
  }
  let fields = map(keys, () => '?').join(',');
  // @ts-ignore
  values = [].concat(keys).concat(values);
  return format(
    `${type} INTO ${tableName} (${fields}) VALUES (${fields})`,
    values,
  );
};

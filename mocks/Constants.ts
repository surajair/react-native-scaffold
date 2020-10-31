//random static values
import faker from 'faker';
import { map } from 'lodash';
import { CYCLE_TIMEZONES, CYCLE_TYPES } from '../app/Constants';

export const TEST_AUTH_TOKEN = faker.internet.mac();

export const TEST_ADMIN_EMAIL = faker.internet.email();
export const TEST_ADMIN_PASSWORD = faker.lorem.word();
export const TEST_ADMIN_FIRST_NAME = faker.name.firstName();
export const TEST_ADMIN_LAST_NAME = faker.name.lastName();
export const TEST_LOGGED_IN_USER_ID = faker.random.uuid();
export const TEST_CARRIER_NAME = faker.company.companyName();
export const TEST_CARRIER_CYCLE_TIMEZONE = faker.random.arrayElement(
  map(CYCLE_TIMEZONES, 'code'),
);
export const TEST_CYCLE_TYPE = faker.random.arrayElement(
  map(CYCLE_TYPES, 'code'),
);

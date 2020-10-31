import { rest } from 'msw';
import {
  TEST_CARRIER_NAME,
  TEST_CARRIER_CYCLE_TIMEZONE,
  TEST_ADMIN_FIRST_NAME,
  TEST_ADMIN_LAST_NAME,
  TEST_LOGGED_IN_USER_ID,
} from './Constants';

export const handlers = [
  rest.post(/\/login\/web\//, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        result: 'success',
        next_step: 'HOME',
        userId: TEST_LOGGED_IN_USER_ID,
        carrier: {
          name: TEST_CARRIER_NAME,
          aobrd_flag: 'false',
          cycle_timezone: TEST_CARRIER_CYCLE_TIMEZONE,
        },
        profile: {
          first_name: TEST_ADMIN_FIRST_NAME,
          last_name: TEST_ADMIN_LAST_NAME,
          user_type: 'ADMIN',
        },
        error: {},
      }),
    );
  }),
];

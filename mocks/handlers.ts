import {rest} from 'msw';
import * as faker from 'faker';

export const handlers = [
  rest.get('http://localhost/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({result: 'success', data: {id: faker.random.number()}}),
    );
  }),
];

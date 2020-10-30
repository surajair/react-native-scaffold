import {Api} from '../app/api/Api';

describe('Api', () => {
  it('should make a GET call', async () => {
    console.log(await Api.get('/login'));
  });
});

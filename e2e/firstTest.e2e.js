describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have Home screen', async () => {
    await expect(element(by.id('Home'))).toBeVisible();
  });
});

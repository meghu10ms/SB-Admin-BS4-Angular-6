import { AdsModule } from './ads.module';

describe('SupplierModule', () => {
  let adsModule: AdsModule;

  beforeEach(() => {
    adsModule = new AdsModule();
  });

  it('should create an instance', () => {
    expect(AdsModule).toBeTruthy();
  });
});

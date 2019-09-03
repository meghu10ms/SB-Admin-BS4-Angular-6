import { AreaModule } from './area.module';

describe('SupplierModule', () => {
  let areaModule: AreaModule;

  beforeEach(() => {
    areaModule = new AreaModule();
  });

  it('should create an instance', () => {
    expect(AreaModule).toBeTruthy();
  });
});

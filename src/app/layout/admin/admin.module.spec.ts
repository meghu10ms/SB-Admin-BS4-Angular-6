import { AdminModule } from './admin.module';

describe('SupplierModule', () => {
  let adminModule: AdminModule;

  beforeEach(() => {
    adminModule = new AdminModule();
  });

  it('should create an instance', () => {
    expect(AdminModule).toBeTruthy();
  });
});

import { DeliveryCommissionModule } from './delivery-commission.module';

describe('ChartsModule', () => {
    let chartsModule: DeliveryCommissionModule;

    beforeEach(() => {
        chartsModule = new DeliveryCommissionModule();
    });

    it('should create an instance', () => {
        expect(DeliveryCommissionModule).toBeTruthy();
    });
});

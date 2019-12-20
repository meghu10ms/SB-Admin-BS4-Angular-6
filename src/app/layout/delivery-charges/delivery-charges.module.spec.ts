import { DeliveryChargesModule } from './delivery-charges.module';

describe('ChartsModule', () => {
    let chartsModule: DeliveryChargesModule;

    beforeEach(() => {
        chartsModule = new DeliveryChargesModule();
    });

    it('should create an instance', () => {
        expect(DeliveryChargesModule).toBeTruthy();
    });
});

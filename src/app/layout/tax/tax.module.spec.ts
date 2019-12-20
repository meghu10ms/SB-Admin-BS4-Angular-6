import { TaxModule } from './tax.module';

describe('ChartsModule', () => {
    let chartsModule: TaxModule;

    beforeEach(() => {
        chartsModule = new TaxModule();
    });

    it('should create an instance', () => {
        expect(TaxModule).toBeTruthy();
    });
});

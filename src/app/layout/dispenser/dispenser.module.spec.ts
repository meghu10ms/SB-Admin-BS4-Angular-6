import { DispenserModule } from './dispenser.module';

describe('ChartsModule', () => {
    let chartsModule: DispenserModule;

    beforeEach(() => {
        chartsModule = new DispenserModule();
    });

    it('should create an instance', () => {
        expect(DispenserModule).toBeTruthy();
    });
});

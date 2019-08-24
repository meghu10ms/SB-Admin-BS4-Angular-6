import { CommentsModule } from './comments.module';

describe('FormModule', () => {
    let commentsModule: CommentsModule;

    beforeEach(() => {
        commentsModule = new CommentsModule();
    });

    it('should create an instance', () => {
        expect(commentsModule).toBeTruthy();
    });
});
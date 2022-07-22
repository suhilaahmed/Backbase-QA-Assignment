import { Selector,t } from "testcafe";
import CreateArticlePage from '../pages/CreateArticlePage';

class EditArticlePage {

    constructor() {
        this.editArticleButton = Selector('a').withText('Edit Article');
    }

    async clickOnEditArticleButton() {
        await t
            .click(this.editArticleButton());
    }

    async checkTheUrlIsChangingAfterEditingArticleTitle(oldSlug, newSlug) {
        await t
            .expect(oldSlug).notEql(newSlug);
    }
}



export default new EditArticlePage();
import { Selector,t } from "testcafe";
import CreateArticlePage from '../pages/CreateArticlePage';

class DeleteArticlePage {

    constructor() {
        this.deleteArticleButton = "button[class='btn btn-sm btn-outline-danger']";
        this.yourFeedButton = Selector('a').withText('Your Feed');
        this.globalFeedButton = Selector('a').withText('Global Feed');
    }

    async clickOnDeleteArticleButton() {
        await t
            .click(this.deleteArticleButton);
    }

    async articleIsDeletedSuccessfully() {
        await t
            .expect(this.yourFeedButton.exists).ok()
            .expect(this.globalFeedButton.exists).ok();
    }



}



export default new DeleteArticlePage();
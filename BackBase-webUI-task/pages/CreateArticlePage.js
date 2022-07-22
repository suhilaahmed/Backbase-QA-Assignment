import { Selector,t } from "testcafe";
import * as Constants from "../resources/Constants";
import {largeArticleTitle} from "../resources/Constants";
import { ClientFunction } from 'testcafe';


class CreateArticlePage {
    articleSlug;
    constructor() {
        this.articleTitle = "input[formcontrolname='title']";
        this.articleDescription = "input[formcontrolname='description']";
        this.articleBody = "textarea[formcontrolname='body']";
        this.articleTags = "input[placeholder='Enter tags']";
        this.publishArticleButton = "button[type='button']";
        this.addedArticleHeaderTitle = Selector('h1');
        this.addedArticleBody = Selector('p');
        this.errorMessage = Selector('ul').withText("message");
        this.articleTitleString = "title_" + Constants.randomArticleString;
        this.articleDescriptionString = "desc_" + Constants.randomArticleString;
        this.articleBodyString = "body_" + Constants.randomArticleString;
        this.articleTagsString = "tag_" + Constants.randomArticleString;
        this.largeTitle = Constants.largeArticleTitle;
    }

    async addArticleTitle(title) {
        await t
            .typeText((this.articleTitle), title, { replace: true });
    }

    async addArticleDescription(description) {
        await t
            .typeText((this.articleDescription), description, { replace: true });
    }

    async addArticleBody(body) {
        await t
            .typeText((this.articleBody), body, { replace: true });
    }

    async addArticleTags(tags) {
        await t
            .typeText((this.articleTags), tags, { replace: true });
    }

    async clickOnPublishArticleButton() {
        await t
            .click(this.publishArticleButton);
    }

    async articleShouldBeAddedSuccessfully(articleTitle, articleBody) {
        await t
            .expect(this.addedArticleHeaderTitle.innerText).contains(articleTitle)
            .expect(this.addedArticleBody.innerText).contains(articleBody);
    }

    async articleTitleShouldNotExist(articleTitle) {
        await t
            .expect(this.addedArticleHeaderTitle.innerText).notContains(articleTitle);
    }

    async articleBodyShouldNotExist() {
        await t
            .expect(this.addedArticleBody.exists).notOk();
    }

    async errorMessageIsDisplayed (errorMessage) {
        await t
            .expect(this.errorMessage.exists).ok()
            .expect(this.errorMessage.innerText).contains(errorMessage);
    }

    async createNewArticleWithRequiredFields() {
        await this.addArticleTitle(this.articleTitleString);
        await this.addArticleDescription(this.articleDescriptionString);
        await this.addArticleBody(this.articleBodyString);
        await this.addArticleTags(this.articleTagsString);
        await this.clickOnPublishArticleButton();
        await this.getArticleSlugFromURL();
    }

    async getArticleSlugFromURL() {
        const getURL = await ClientFunction(() => window.location.href)();
        this.articleSlug = getURL.substring(getURL.lastIndexOf('/') + 1);
        return this.articleSlug;
    }

}

export default new CreateArticlePage();
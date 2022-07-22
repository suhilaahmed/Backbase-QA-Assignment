import HomePage from '../pages/HomePage';
import * as Constants from "../resources/Constants";
import SignInPage from '../pages/SignInPage';
import CreateArticlePage from '../pages/CreateArticlePage';


fixture`Create Article Fixture`
    .page`${Constants.MAIN_URL}`
    .httpAuth({
        username: HomePage.BasicAuthUserName,
        password: HomePage.BasicAuthPassword,
    })
    .beforeEach(async t => {
        await t
            .maximizeWindow();
            await  HomePage.homePageOpenedSuccessfully();
            await HomePage.navigateToSignInPage();
            await SignInPage.signInWithValidCredentials();
            await SignInPage.navigateToAddArticlePage();
    });

//happy flow

test('Create new article with all required fields ', async t => {
    await CreateArticlePage.addArticleTitle(CreateArticlePage.articleTitleString);
    await CreateArticlePage.addArticleDescription(CreateArticlePage.articleDescriptionString);
    await CreateArticlePage.addArticleBody(CreateArticlePage.articleBodyString);
    await CreateArticlePage.addArticleTags(CreateArticlePage.articleTagsString);
    await CreateArticlePage.clickOnPublishArticleButton();
    await CreateArticlePage.articleShouldBeAddedSuccessfully(
        CreateArticlePage.articleTitleString, CreateArticlePage.articleBodyString);
});

// unhappy flows - required fields

test('Create new article with empty title field - should fail ', async t => {
    await CreateArticlePage.addArticleDescription(CreateArticlePage.articleDescriptionString);
    await CreateArticlePage.addArticleBody(CreateArticlePage.articleBodyString);
    await CreateArticlePage.addArticleTags(CreateArticlePage.articleTagsString);
    await CreateArticlePage.clickOnPublishArticleButton();
    await CreateArticlePage.articleTitleShouldNotExist(CreateArticlePage.articleTitleString);
});

test('Create new article with empty description field - should fail ', async t => {
    await CreateArticlePage.addArticleTitle(CreateArticlePage.articleTitleString);
    await CreateArticlePage.addArticleDescription(CreateArticlePage.articleDescriptionString);
    await CreateArticlePage.addArticleTags(CreateArticlePage.articleTagsString);
    await CreateArticlePage.clickOnPublishArticleButton();
    await CreateArticlePage.articleBodyShouldNotExist();
});

test('Create new article with empty fields - should fail ', async t => {
    await CreateArticlePage.clickOnPublishArticleButton();
    await CreateArticlePage.articleTitleShouldNotExist();
    await CreateArticlePage.articleBodyShouldNotExist(CreateArticlePage.articleTitleString);
});

// unhappy flows - incorrect formats

test('Create new article with large text in title field, characters more than 1020 character - should fail ', async t => {
    await CreateArticlePage.addArticleTitle(CreateArticlePage.largeTitle);
    await CreateArticlePage.addArticleDescription(CreateArticlePage.articleDescriptionString);
    await CreateArticlePage.addArticleBody(CreateArticlePage.articleBodyString);
    await CreateArticlePage.addArticleTags(CreateArticlePage.articleTagsString);
    await CreateArticlePage.clickOnPublishArticleButton();
    await CreateArticlePage.errorMessageIsDisplayed(Constants.keyTooLargeError);
});


// Xss injection flows

test('Create new article with a XSS scripts in the title field with no errors', async t => {
    await CreateArticlePage.addArticleTitle(Constants.xssScript);
    await CreateArticlePage.addArticleDescription(CreateArticlePage.articleDescriptionString);
    await CreateArticlePage.addArticleBody(CreateArticlePage.articleBodyString);
    await CreateArticlePage.addArticleTags(CreateArticlePage.articleTagsString);
    await CreateArticlePage.clickOnPublishArticleButton();
    await CreateArticlePage.articleShouldBeAddedSuccessfully(Constants.xssScript, CreateArticlePage.articleBodyString);
});

test('Create new article with a XSS scripts in the body field with no errors', async t => {
    await CreateArticlePage.addArticleTitle(CreateArticlePage.articleTitleString);
    await CreateArticlePage.addArticleDescription(CreateArticlePage.articleDescriptionString);
    await CreateArticlePage.addArticleBody(Constants.xssScript);
    await CreateArticlePage.addArticleTags(CreateArticlePage.articleTagsString);
    await CreateArticlePage.clickOnPublishArticleButton();
    await CreateArticlePage.articleShouldBeAddedSuccessfully(CreateArticlePage.articleTitleString, Constants.xssScript);
});

// sql injection flows

test('Create new article with a sql query in the title field with no errors', async t => {
    await CreateArticlePage.addArticleTitle(Constants.titleQuery);
    await CreateArticlePage.addArticleDescription(CreateArticlePage.articleDescriptionString);
    await CreateArticlePage.addArticleBody(CreateArticlePage.articleBodyString);
    await CreateArticlePage.addArticleTags(CreateArticlePage.articleTagsString);
    await CreateArticlePage.clickOnPublishArticleButton();
    await CreateArticlePage.articleShouldBeAddedSuccessfully(Constants.titleQuery, CreateArticlePage.articleBodyString);
});

test('Create new article with a sql query in the body field with no errors', async t => {
    await CreateArticlePage.addArticleTitle(CreateArticlePage.articleTitleString);
    await CreateArticlePage.addArticleDescription(CreateArticlePage.articleDescriptionString);
    await CreateArticlePage.addArticleBody(Constants.bodyQuery);
    await CreateArticlePage.addArticleTags(CreateArticlePage.articleTagsString);
    await CreateArticlePage.clickOnPublishArticleButton();
    await CreateArticlePage.articleShouldBeAddedSuccessfully(CreateArticlePage.articleTitleString, Constants.bodyQuery);
});

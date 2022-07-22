import HomePage from '../pages/HomePage';
import * as Constants from "../resources/Constants";
import SignInPage from '../pages/SignInPage'
import CreateArticlePage from '../pages/CreateArticlePage'
import DeleteArticlePage from "../pages/DeleteArticlePage";


fixture`Delete Article Fixture`
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
        await CreateArticlePage.createNewArticleWithRequiredFields();
    });

// The assertion for this test is to navigate to the deleted article using the slug and check if it will
// Give 404, but the error pages are not implemented in the UI

test('Delete article after creation successfully ', async t => {
    await DeleteArticlePage.clickOnDeleteArticleButton();
    await DeleteArticlePage.articleIsDeletedSuccessfully();
});
import { Selector,t } from "testcafe";
import * as dotenv from "dotenv";
dotenv.config({path: '.env'});

class SignInPage {
    constructor() {
        this.userEmail = process.env.USER_EMAIL;
        this.userPassword = process.env.USER_PASSWORD;
        this.signInPageBannerTitle = Selector('h1').withText('Sign in');
        this.email = "input[formcontrolname='email']";
        this.password = "input[formcontrolname='password']";
        this.signIpButton = "button[type='submit']";
        this.newArticleButton = Selector('a').withText('New Article');
    }

    async signInWithValidCredentials () {
        await t
            .expect(this.signInPageBannerTitle.exists).ok()
            .typeText((this.email), this.userEmail, { replace: true })
            .typeText((this.password), this.userPassword, { replace: true })
            .click(this.signIpButton)
            .expect(this.newArticleButton.exists).ok();
    }

    async navigateToAddArticlePage() {
        await t
            .click(this.newArticleButton());
    }
}

export default new SignInPage();
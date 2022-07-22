import { Selector,t} from 'testcafe';
import * as dotenv from "dotenv";
dotenv.config({path: '.env'});


class HomePage {
    constructor() {
        this.homePageBannerTitle = Selector('h1').withText('conduit');
        this.SignInButton = "a[routerlink='/login']";
        this.BasicAuthUserName = process.env.BASIC_AUTH_USERNAME;
        this.BasicAuthPassword = process.env.BASIC_AUTH_PASSWORD;
    }

    async homePageOpenedSuccessfully() {
        await t
            .expect(this.homePageBannerTitle.exists).ok();
    }

    async navigateToSignInPage() {
        await t
            .click(this.SignInButton);
    }

}

export default new HomePage();
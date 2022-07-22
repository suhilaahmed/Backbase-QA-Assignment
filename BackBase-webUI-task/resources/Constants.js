import randomstring from 'randomstring';


// Testing Env URL
export const MAIN_URL = 'https://qa-task.backbasecloud.com';

export const randomArticleString = '_automated_article_string'+Date.now();



// error messages
export const incorrectEmailFormat = 'The email you entered is incorrect.';
export const randomEmailFormat = 'This doesn’t look like an email address.';
export const nameIsRequired = 'Please enter your name.';
export const emailIsRequired = 'Please enter your email address.';
export const passwordIsRequired = 'Please enter your password.'
export const termsAreRequired = 'Please agree with the Terms to sign up.';
export const passwordIsShort = 'Please use 8+ characters for secure password';
export const passwordFormatError = 'Sorry, name and password cannot be the same.';
export const keyTooLargeError = 'key too large to index';

export const xssScript = "<body onload=alert(1)>";

export const titleQuery = "SELECT * FROM articles WHERE is id = 10";
export const bodyQuery = "SELECT * FROM articles WHERE body = '123'--'";

export const largeArticleTitle = randomstring.generate(1021);

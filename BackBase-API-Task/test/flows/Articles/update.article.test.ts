/*
 * Copyright (c) 2022 Suhila Ahmed - BackBase.
 *
 * Unauthorized copying of this file via any medium IS STRICTLY PROHIBITED.
 * Proprietary and confidential.
 *
 * The above copyright notice shall be included in all copies or
 * substantial portions of the Software.
 */

/*
 * Module dependencies
 */
import { Api } from "../../../resources/api";
import { articleCreationData, randomString } from "../../../utils/test-data";
import { ArticleReadData } from "../../../resources/api/schema";

/*
 * Module variables
 */

const api = new Api();
let articleSlug: string;
let createdArticle: ArticleReadData;
const updatedTitle = "_automated_fixed_title";

/*
 * Module
 */
// This suite is intended to update an article with the required paramters

describe("Update an existing article - Happy Flows", () => {
  beforeAll(async () => {
    createdArticle = await api.article.createNewArticle(articleCreationData);
    articleSlug = createdArticle.article.slug;
  });

  //   Delete the created article as a cleanup step
  afterAll(async () => {
    await api.article.deleteArticleBySlug(articleSlug);
  });

  //This test is created to update the title inside the article and assert that the slug has changed
  // Bug: The slug didn't change after updating the title
  test("Update article - update the title of the article", async (): Promise<void> => {
    articleCreationData.article.title = updatedTitle;
    delete articleCreationData.article.tagList;
    delete articleCreationData.article.body;
    delete articleCreationData.article.description;

    const updatedArticle = await api.article.updateAnArticle(
      articleSlug,
      articleCreationData
    );
    expect(updatedArticle.article.title).toEqual(updatedTitle);
    // expect(updatedArticle.article.slug).toContain(updatedTitle);
  });

  //  This test is created to mark the issue as confidential and to assert on that
  test("Update article - Update article - update the body of the article", async (): Promise<void> => {
    delete articleCreationData.article.title;
    delete articleCreationData.article.tagList;
    articleCreationData.article.body = updatedTitle;
    delete articleCreationData.article.description;

    const updatedArticle = await api.article.updateAnArticle(
      articleSlug,
      articleCreationData
    );
    expect(updatedArticle.article.body).toEqual(updatedTitle);
  });

  test("Update article - Update article - update the description of the article", async (): Promise<void> => {
    delete articleCreationData.article.title;
    delete articleCreationData.article.tagList;
    delete articleCreationData.article.body;
    articleCreationData.article.description = updatedTitle;

    const updatedArticle = await api.article.updateAnArticle(
      articleSlug,
      articleCreationData
    );
    expect(updatedArticle.article.description).toEqual(updatedTitle);
  });
});

// This test suite mainly target providing incorrect values and missing the private token
describe("Update an existing article - Unhappy Flows", () => {
  test("Update article - update article to a non existing slug", async (): Promise<void> => {
    await expect(async () => {
      await api.article.updateAnArticle(randomString, articleCreationData);
    }).rejects.toThrowError(
      "PUT request failed with error: Request failed with status code 404"
    );
  });

  // Bug: Updating the article with empty body result in the request timing out
  test.skip("Update article - update the article with empty body", async (): Promise<void> => {
    delete articleCreationData.article;
    console.log(articleCreationData);
    console.log(articleSlug);
    await expect(async () => {
      await api.article.updateAnArticle(articleSlug, articleCreationData);
    }).rejects.toThrowError(
      "PUT request failed with error: Request failed with status code 400"
    );
  });

  test("Update article - update the article without an authentication token", async (): Promise<void> => {
    await expect(async () => {
      await api.article.updateAnIssueWithoutAuthorization(
        articleSlug,
        articleCreationData
      );
    }).rejects.toThrowError(
      "PUT request failed with error: Request failed with status code 401"
    );
  });

  test("Update article - update the article with an incorrect URL", async (): Promise<void> => {
    await expect(async () => {
      await api.article.updateAnArticleWithIncorrectURL(
        articleSlug,
        articleCreationData
      );
    }).rejects.toThrowError(
      "PUT request failed with error: Request failed with status code 404"
    );
  });
});

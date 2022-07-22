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

/*
 * Module variables
 */

const api = new Api();

let articleSlug: string;

/*
 * Module
 */

// A straight forward set of test cases to delete an article by slug.
describe("Delete an article with a specific slug - Happy Flows", () => {
  beforeAll(async () => {
    const createdArticle = await api.article.createNewArticle(
      articleCreationData
    );
    articleSlug = createdArticle.article.slug;
  });

  test("Delete an article by valid slug ", async (): Promise<void> => {
    await api.article.deleteArticleBySlug(articleSlug);

    await expect(async () => {
      await api.article.readByArticleBySlug(articleSlug);
    }).rejects.toThrowError(
      `GET request failed with error: Request failed with status code 404`
    );
  });
});

// Making sure that when passing an invalid slug the article is not deleted
describe("Delete an article with a specific slug - Unhappy Flows", () => {
  test("Delete an article using an invalid slug", async (): Promise<void> => {
    await expect(async () => {
      await api.article.deleteArticleBySlug(randomString);
    }).rejects.toThrowError(
      "DELETE request failed with error: Request failed with status code 404"
    );
  });

  test("Delete an article without an authentication token ", async (): Promise<void> => {
    await expect(async () => {
      await api.article.deleteArticleWithoutAuthorization(articleSlug);
    }).rejects.toThrowError(
      "DELETE request failed with error: Request failed with status code 401"
    );
  });

  test("Delete an article with an incorrect URL ", async (): Promise<void> => {
    await expect(async () => {
      await api.article.deleteArticleWithIncorrectURL(articleSlug);
    }).rejects.toThrowError(
      "DELETE request failed with error: Request failed with status code 404"
    );
  });
});

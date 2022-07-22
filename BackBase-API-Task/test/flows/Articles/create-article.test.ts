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
import { articleCreationData } from "../../../utils/test-data";
import moment from "moment";

/*
 * Module variables
 */

const api = new Api();
let articleSlug: string;

/*
 * Module
 */
// This suite is intended to create a new article with the required paramters
describe("Add a new article - Happy Flows", () => {
  // Delete the created article as a cleanup step

  afterAll(async () => {
    await api.article.deleteArticleBySlug(articleSlug);
  });

  test("Create new article with required fields", async (): Promise<void> => {
    const createdArticle = await api.article.createNewArticle(
      articleCreationData
    );

    articleSlug = createdArticle.article.slug;

    expect(createdArticle.article.title).not.toBe(null);
    expect(createdArticle.article.description).not.toBe(null);
    expect(createdArticle.article.body).not.toBe(null);
    expect(createdArticle.article.tagList).not.toBe(null);
    expect(createdArticle.article.favorited).not.toBe(null);
    expect(createdArticle.article.favoritesCount).not.toBe(null);

    expect(moment(createdArticle.article.createdAt, true).isValid());
    expect(moment(createdArticle.article.updatedAt, true).isValid());

    expect(createdArticle.article.author.following).not.toBe(null);
    expect(createdArticle.article.author.image).not.toBe(null);
    expect(createdArticle.article.author.username).not.toBe(null);
  });
});

describe("Add a new article - Unhappy Flows", () => {
  // Bug : this request should return 400 bad request
  test("Create new article without a required field - title", async (): Promise<void> => {
    delete articleCreationData.article.title;

    await expect(async () => {
      await api.article.createNewArticle(articleCreationData);
    }).rejects.toThrowError(
      "POST request failed with error: Request failed with status code 500"
    );
  });
  // Bug : this request should return 400 bad request

  test("Create new article without a required field - body", async (): Promise<void> => {
    delete articleCreationData.article.body;

    await expect(async () => {
      await api.article.createNewArticle(articleCreationData);
    }).rejects.toThrowError(
      "POST request failed with error: Request failed with status code 500"
    );
  });

  test("Create new article without a required field - description", async (): Promise<void> => {
    delete articleCreationData.article.description;

    await expect(async () => {
      await api.article.createNewArticle(articleCreationData);
    }).rejects.toThrowError(
      "POST request failed with error: Request failed with status code 500"
    );
  });
  // bug
  test("Create new article with empty body", async (): Promise<void> => {
    delete articleCreationData.article;

    await expect(async () => {
      await api.article.createNewArticle(articleCreationData);
    }).rejects.toThrowError(
      "POST request failed with error: Request failed with status code 500"
    );
  });

  test("Create new article without an authentication token", async (): Promise<void> => {
    await expect(async () => {
      await api.article.createNewArticleWithoutAuthorization(
        articleCreationData
      );
    }).rejects.toThrowError(
      "POST request failed with error: Request failed with status code 401"
    );
  });

  test("Create new article with an incorrect URL", async (): Promise<void> => {
    await expect(async () => {
      await api.article.createNewArticleWithIncorrectURL(articleCreationData);
    }).rejects.toThrowError(
      "POST request failed with error: Request failed with status code 404"
    );
  });
});

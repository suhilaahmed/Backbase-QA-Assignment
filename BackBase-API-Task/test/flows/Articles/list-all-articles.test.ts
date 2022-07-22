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
import moment from "moment";
import { randomString } from "../../../utils/test-data";

/*
 * Module variables
 */
const api = new Api();

/*
 * Module
 */

// In this test suite we will test the happy flows of getting list of available articles.
// NOTE: in the ideal world each test should assert on a specific feature - and because this data is being generated in a random way,
// multiple assertions should be executed for each and every test to insure the consitency.
describe("List all articles - Happy Flows", () => {
  // since most of the response is a randome changing values and not required,
  // the assertions will be based on the types of the values and assertions on the author of the issue.
  test("Get list of all available articles ", async (): Promise<void> => {
    const availableArticles = await api.article.listAllArticles();
    expect(availableArticles != null || {});
    expect(availableArticles.articlesCount).not.toEqual(0);

    availableArticles.articles.forEach((article) => {
      expect(article.title).not.toBe(null);
      expect(article.description).not.toBe(null);
      expect(article.body).not.toBe(null);
      expect(article.tagList).not.toBe(null);
      expect(article.favorited).not.toBe(null);
      expect(article.favoritesCount).not.toBe(null);

      expect(moment(article.createdAt, true).isValid());
      expect(moment(article.updatedAt, true).isValid());

      expect(article.author.bio).not.toBe(null);
      expect(article.author.following).not.toBe(null);
      expect(article.author.image).not.toBe(null);
      expect(article.author.username).not.toBe(null);
    });
  });

  test("Get list of all articles available filtered by existing tag", async (): Promise<void> => {
    const availableArticles = await api.article.listAllArticlesWithFilters(
      "tag",
      "magic"
    );
    expect(availableArticles != null || {});
    expect(availableArticles.articlesCount).not.toEqual(0);
    expect(availableArticles.articles.length).toEqual(20);

    availableArticles.articles.forEach((article) => {
      expect(article.title).not.toBe(null);
      expect(article.description).not.toBe(null);
      expect(article.body).not.toBe(null);
      expect(article.tagList).toContain("magic");

      expect(moment(article.createdAt, true).isValid());
      expect(moment(article.updatedAt, true).isValid());

      expect(article.author.bio).not.toBe(null);
      expect(article.author.following).not.toBe(null);
      expect(article.author.image).not.toBe(null);
      expect(article.author.username).not.toBe(null);
    });
  });

  test("Get list of all articles available filtered by existing author", async (): Promise<void> => {
    const availableArticles = await api.article.listAllArticlesWithFilters(
      "author",
      "suhila123"
    );
    expect(availableArticles != null || {});
    expect(availableArticles.articlesCount).not.toEqual(0);

    availableArticles.articles.forEach((article) => {
      expect(article.title).not.toBe(null);
      expect(article.description).not.toBe(null);
      expect(article.body).not.toBe(null);
      expect(article.tagList).not.toBe(null);

      expect(moment(article.createdAt, true).isValid());
      expect(moment(article.updatedAt, true).isValid());

      expect(article.author.bio).not.toBe(null);
      expect(article.author.following).not.toBe(null);
      expect(article.author.image).not.toBe(null);
      expect(article.author.username).toEqual("suhila123");
    });
  });

  // In this test suite we will test the unhappy flows of getting list of available articles.
  // ex: passing an incorrect paramter

  describe("List all articles - Unhappy Flows", () => {
    // Adding the Date.now() to the tag string will allow it to be unique everytime we execute the tests.
    test("Get articles list with incorrect parameter value : tag = randome string", async (): Promise<void> => {
      let availableArticles = await api.article.listAllArticlesWithFilters(
        "tag",
        randomString
      );
      expect(availableArticles.articles).toEqual([]);
      expect(availableArticles.articlesCount).toEqual(0);
    });

    // Error Handeling test cases

    test("Get articles list without an authentication token", async (): Promise<void> => {
      await expect(async () => {
        await api.article.listAllArticlesWithoutAuthorization();
      }).rejects.toThrowError(
        "GET request failed with error: Request failed with status code 401"
      );
    });
  });

  test("Get articles list with an incorrect URL", async (): Promise<void> => {
    await expect(async () => {
      await api.article.listAllArticlesWithIncorrectURL();
    }).rejects.toThrowError(
      "GET request failed with error: Request failed with status code 404"
    );
  });
});

// In this test suite we will test the flows of getting a single article by slug

describe("List a single article - Happy/Unhappy Flows", () => {
  test("Get article with correct slug", async (): Promise<void> => {
    const availableArticles = await api.article.listAllArticles();

    availableArticles.articles.forEach(async (article) => {
      let foundArticle = await api.article.readByArticleBySlug(article.slug);
      expect(foundArticle.article.slug).toEqual(article.slug);
    });
  });

  test("Get article with an incorrect slug", async (): Promise<void> => {
    await expect(async () => {
      await api.article.readByArticleBySlug(randomString);
    }).rejects.toThrowError(
      `GET request failed with error: Request failed with status code 404`
    );
  });
});

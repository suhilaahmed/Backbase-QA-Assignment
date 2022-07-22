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

/*
 * Module variables
 */
const api = new Api();
const articlesSlug: Array<string> = [];

/*
 * Module
 */

// In this test suite we will test the happy flows of getting list of available comments under each article.
// NOTE: in the ideal world each test should assert on a specific feature - and because this data is being generated in a random way,
// multiple assertions should be executed for each and every test to insure the consitency.

describe("List all comments that belong to a specific article - Happy Flows", () => {
  // This step is mandatory in getting the slugs to be able to fetch the comments under those articles

  beforeAll(async () => {
    const availableArticles = await api.article.listAllArticles();
    availableArticles.articles.forEach(article => {
       articlesSlug.push(article.slug);
    });
  });

  test("Get list of all available comments under available articles ", async (): Promise<void> => {
    articlesSlug.forEach(async (slug) => {
      const availableComments = await api.comment.listAllCommentsUnderAnArticle(
        slug
      );
      expect(availableComments != null);
    });
  });
});

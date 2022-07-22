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
 * Module variables
 */

export const randomString = "_automated_article_string" + Date.now();

export const articleCreationData = {
  article: {
    title: randomString,
    description: randomString,
    body: randomString,
    tagList: ["magic", "cool", "dragons"],
  },
};

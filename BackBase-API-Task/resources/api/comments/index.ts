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
import { Api } from "../";
import { baseUrI } from "../../../utils/config";
import { Comments } from "../schema";

/*
 * Module
 */
export class CommentsApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  public async listAllCommentsUnderAnArticle(slug: string): Promise<Comments> {
    return this.api.get(`${baseUrI}/api/articles/${slug}/comments`);
  }

  public async listAllCommentsWithoutAuthToken(
    slug: string
  ): Promise<Comments> {
    return this.api.getUnAuthorized(`${baseUrI}/api/articles/${slug}/comments`);
  }

  public async listAllCommentsWithIncorrectURL(
    slug: string
  ): Promise<Comments> {
    return this.api.get(`${baseUrI}/api/articles/${slug}/commentss`);
  }
}

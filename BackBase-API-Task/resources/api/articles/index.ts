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
import { Api } from "..";
import { baseUrI } from "../../../utils/config";
import {
  Article,
  ArticleCreateData,
  ArticleReadData,
  Articles,
} from "../schema";

/*
 * Module
 */
export class ArticlesApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  public async listAllArticles(): Promise<Articles> {
    return this.api.get(`${baseUrI}/api/articles/`);
  }

  public async listAllArticlesWithFilters(
    paramter: string,
    value: string
  ): Promise<Articles> {
    return this.api.get(`${baseUrI}/api/articles/?${paramter}=${value}`);
  }

  public async listAllArticlesWithoutAuthorization(): Promise<Articles> {
    return this.api.getUnAuthorized(`${baseUrI}/api/articles/`);
  }

  public async listAllArticlesWithIncorrectURL(): Promise<Articles> {
    return this.api.get(`${baseUrI}/api/articless/`);
  }

  public async readByArticleBySlug(slug: string): Promise<ArticleReadData> {
    return this.api.get(`${baseUrI}/api/articles/${slug}`);
  }

  public async createNewArticle(
    article: ArticleCreateData
  ): Promise<ArticleReadData> {
    return this.api.post(`${baseUrI}/api/articles`, article);
  }

  public async createNewArticleWithoutAuthorization(
    article: ArticleCreateData
  ): Promise<Article> {
    return this.api.postUnAuthorized(`${baseUrI}/api/articles`, article);
  }

  public async createNewArticleWithIncorrectURL(
    article: ArticleCreateData
  ): Promise<Article> {
    return this.api.post(`${baseUrI}/api/articless`, article);
  }

  public async deleteArticleBySlug(slug: string): Promise<Article> {
    return this.api.delete(`${baseUrI}/api/articles/${slug}`);
  }

  public async deleteArticleWithoutAuthorization(
    slug: string
  ): Promise<Article> {
    return this.api.deleteUnAuthorized(`${baseUrI}/api/article/${slug}`);
  }

  public async deleteArticleWithIncorrectURL(slug: string): Promise<Article> {
    return this.api.delete(`${baseUrI}/api/articless/${slug}`);
  }

  public async updateAnArticle(
    slug: string,
    article: ArticleCreateData
  ): Promise<ArticleReadData> {
    return this.api.put(`${baseUrI}/api/articles/${slug}`, article);
  }

  public async updateAnIssueWithoutAuthorization(
    slug: string,
    article: ArticleCreateData
  ): Promise<ArticleReadData> {
    return this.api.putUnAuthorized(`${baseUrI}/api/articles/${slug}`);
  }

  public async updateAnArticleWithIncorrectURL(
    slug: string,
    article: ArticleCreateData
  ): Promise<ArticleReadData> {
    return this.api.put(`${baseUrI}/api/articless/${slug}`, article);
  }
}

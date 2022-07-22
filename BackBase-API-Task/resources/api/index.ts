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
import axios from "axios";
import { ArticlesApi } from "./articles";
import { CommentsApi } from "./comments";
import {
  baseUrI,
  basicAtuhUsername,
  basicAuthPassword,
  userEmail,
  userPassword,
} from "../../utils/config";
/*
 * Module declarations
 */

interface AxiosConfig {
  headers?: { [key: string]: string };
}
/*
 * Module
 */
export class Api {
  public accessToken: string;

  public jwtToken: string;

  public article = new ArticlesApi(this);

  public comment = new CommentsApi(this);

  public async get<T>(url: string, config?: AxiosConfig): Promise<T> {
    return this.doRequest(url, "GET", config);
  }

  public async getUnAuthorized<T>(
    url: string,
    config?: AxiosConfig
  ): Promise<T> {
    return this.doUnAuthorizedRequest(url, "GET", config);
  }

  public async post<T, U>(
    url: string,
    data?: U,
    config?: AxiosConfig
  ): Promise<T> {
    return this.doRequest(url, "POST", config, data);
  }

  public async postUnAuthorized<T, U>(
    url: string,
    data?: U,
    config?: AxiosConfig
  ): Promise<T> {
    return this.doUnAuthorizedRequest(url, "POST", config, data);
  }

  public async put<T, U>(
    url: string,
    data?: U,
    config?: AxiosConfig
  ): Promise<T> {
    return this.doRequest(url, "PUT", config, data);
  }

  public async putUnAuthorized<T, U>(
    url: string,
    data?: U,
    config?: AxiosConfig
  ): Promise<T> {
    return this.doUnAuthorizedRequest(url, "PUT", config, data);
  }

  public async delete<T, U>(url: string, config?: AxiosConfig): Promise<T> {
    return this.doRequest(url, "DELETE", config);
  }

  public async deleteUnAuthorized<T, U>(
    url: string,
    config?: AxiosConfig
  ): Promise<T> {
    return this.doUnAuthorizedRequest(url, "DELETE", config);
  }

  //It's more secure to convert the basic auth ( username, password ) into an encrypted token while performing a request.

  public async getBasicAuthToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }
    this.accessToken = Buffer.from(
      basicAtuhUsername + ":" + basicAuthPassword,
      "binary"
    ).toString("base64");
    this.accessToken = `Basic ${this.accessToken}`;
    return this.accessToken;
  }

  public async getJWTToken(): Promise<string> {
    if (this.jwtToken) {
      return this.jwtToken;
    }
    const {
      data: { user: user },
    } = await axios.post(
      `${baseUrI}/api/users/login`,
      {
        user: {
          email: userEmail,
          password: userPassword,
        },
      },
      { headers: { Authorization: await this.getBasicAuthToken() } }
    );

    this.jwtToken = `Token ${user.token}`;

    return this.jwtToken;
  }

  private async doRequest<T, U>(
    url: string,
    method: "GET" | "POST" | "DELETE" | "PUT",
    config: AxiosConfig,
    data?: U
  ): Promise<T> {
    const { data: response }: { data: T } = await axios({
      method,
      url,
      data,
      headers: {
        Authorization: await this.getBasicAuthToken(),
        jwtauthorization: await this.getJWTToken(),
        ...config?.headers,
      },
    }).then(
      (body) => body,
      (err) => {
        throw new Error(`${method} request failed with error: ${err.message}`);
      }
    );

    return response;
  }

  private async doUnAuthorizedRequest<T, U>(
    url: string,
    method: "GET" | "POST" | "DELETE" | "PUT",
    config: AxiosConfig,
    data?: U
  ): Promise<T> {
    const { data: response }: { data: T } = await axios({
      method,
      url,
      data,
      headers: { ...config?.headers },
    }).then(
      (body) => body,
      (err) => {
        throw new Error(`${method} request failed with error: ${err.message}`);
      }
    );

    return response;
  }
}

/*
 * Module exports
 */
export { ArticlesApi, CommentsApi };

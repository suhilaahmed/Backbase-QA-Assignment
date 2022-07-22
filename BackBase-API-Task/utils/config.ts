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
require("dotenv").config();

/*
 * Module declarations
 */
interface Config {
  baseUrI: string;
  basicAtuhUsername: string;
  basicAuthPassword: string;
  userEmail: string;
  userPassword: string;
}

/*
 * Module
 */
const config: Config = {
  baseUrI: "https://qa-task.backbasecloud.com",
  basicAtuhUsername: process.env.BasicAuth_USERNAME,
  basicAuthPassword: process.env.BasicAuth_PASSWORD,
  userEmail: process.env.EMAIL,
  userPassword: process.env.PASSWORD,
};

/*
 * Module exports
 */
export const {
  baseUrI,
  basicAtuhUsername,
  basicAuthPassword,
  userEmail,
  userPassword,
} = config;

/* eslint-disable @typescript-eslint/naming-convention */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const url1 = 'https://sell-store-ionic.cloudns.ph/wp-json/wc/v3';
const authUrl1 =
  'https://sell-store-ionic.cloudns.ph/wp-json/jwt-auth/v1/token';
const tokenVerifyUrl1 =
  'https://sell-store-ionic.cloudns.ph/wp-json/jwt-auth/v1/token/validate';
export const environment = {
  production: false,
  backend_api_url: url1,
  auth_url: authUrl1,
  token_verify_url: tokenVerifyUrl1,
  readOnlyKeys: {
    consumer_key: 'ck_a9eac71286d9b444ef1ae0f5677e0835119ccc9f',
    consumer_secret: 'cs_f1d5946c346291817ea81d3db4550a604171eadd',
  },
  writeOnlyKeys: {
    consumer_key: 'ck_a7871ca3467f22906d7e68becbf4defbfc03f2e9',
    consumer_secret: 'cs_6e86b59d9475a24f64be833ce0518c40059b8a6a',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

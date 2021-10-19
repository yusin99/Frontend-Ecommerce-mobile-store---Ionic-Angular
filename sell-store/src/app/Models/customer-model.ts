/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
export interface CustomerModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  billing: object;
  shipping: object;
  avatar_url: string;
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface CategoryModel {
  id: number;
  name: string;
  slug: string;
  image: {
    src: string;
    name: string;
  };
  count: number;
}

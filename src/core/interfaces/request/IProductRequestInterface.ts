import { ProductType } from '@prisma/client';

export interface IProductRequestParamsType {
  productName: ProductType;
  price: number;
}

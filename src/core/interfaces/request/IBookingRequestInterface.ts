import { BookingStatus, PaymentStatus, ProductType } from '@prisma/client';
import {
  IPromoRequestParamsRelationType,
  IPromoRequestParamsType,
} from './IPromoRequestInterface';
import {
  IProductRequestParamsRelationType,
  IProductRequestParamsType,
} from './IProductRequestInterface';

export interface IBookingRequestType {
  carType: string;
  licensePlat: string;
  bookingDate: Date;
  productService: ProductType;
  status: BookingStatus;
  customerId: string;
  timeslotId: number;
  orderId: string;
  amount: number;
  paymentStatus: PaymentStatus;
  receipt: string;
  promo?: IPromoRequestParamsRelationType[];
  product: IProductRequestParamsRelationType[];
}

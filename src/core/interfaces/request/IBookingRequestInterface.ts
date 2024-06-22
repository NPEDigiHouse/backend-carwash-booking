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
  licensePlate: string;
  status: BookingStatus;
  customerId: string;
  timeslotId: number;
  amount: number;
  paymentStatus: PaymentStatus;
  receipt: string;
  // promo?: IPromoRequestParamsRelationType[];
  // product: IProductRequestParamsRelationType[];
  promoId: number;
  productId: number;
  bookingDate?: Date;
  phoneNumber: string;
}

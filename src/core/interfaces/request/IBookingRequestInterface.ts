import { BookingStatus, ProductType } from '@prisma/client';

export interface IBookingRequestType {
  carType: string;
  licensePlat: string;
  bookingDate: Date;
  productService: ProductType;
  status: BookingStatus;
}

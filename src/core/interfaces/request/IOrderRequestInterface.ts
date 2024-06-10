import { PaymentStatus } from '@prisma/client';

export interface IOrderRequestParamsType {
  amount: number;
  status: PaymentStatus;
  receipt: string;
}

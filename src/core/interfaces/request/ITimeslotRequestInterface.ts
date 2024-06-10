import { DAY } from '@prisma/client';

export interface ITimeslotRequestInterface {
  day: DAY;
  time: Date;
  adminId: string;
  avaiableTime: boolean;
}

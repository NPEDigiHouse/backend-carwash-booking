import { DAY } from '@prisma/client';

export interface ITimeslotRequestInterface {
  day: DAY;
  time: string;
  adminId: string;
  avaiableTime: boolean;
}

import prisma from '../../config/database';
import { ITimeslotRequestInterface } from '../../core/interfaces/request/ITimeslotRequestInterface';

class TimeslotService {
  async createTimeslot(payload: ITimeslotRequestInterface) {
    try {
      const timeslot = await prisma.timeslot.create({
        data: {
          day: payload.day,
          time: payload.time,
          avaiableTime: payload.avaiableTime,
          adminId: payload.adminId,
        },
      });

      return timeslot;
    } catch (error) {
      throw error;
    }
  }

  async getAllTimeslot() {
    try {
      const timeslots = await prisma.timeslot.findMany();

      return timeslots;
    } catch (error) {
      throw error;
    }
  }

  async deleteTimeslot(timelostId: number) {
    try {
      const timeslot = await prisma.timeslot.delete({
        where: {
          id: timelostId,
        },
      });

      return timeslot;
    } catch (error) {
      throw error;
    }
  }

  async updateTimeslot(timeslotId: number, payload: ITimeslotRequestInterface) {
    try {
      const timeslot = await prisma.timeslot.update({
        where: {
          id: timeslotId,
        },
        data: {
          day: payload.day,
          time: payload.time,
          adminId: payload.adminId,
          avaiableTime: payload.avaiableTime,
        },
      });

      return timeslot;
    } catch (error) {
      throw error;
    }
  }
}

export default TimeslotService;

import prisma from '../../config/database';
import { ITimeslotRequestInterface } from '../../core/interfaces/request/ITimeslotRequestInterface';

class TimeslotService {
  async createTimeslot(payload: ITimeslotRequestInterface) {
    try {
      const timeslot = await prisma.timeslot.create({
        data: {
          time: payload.time,
          date: payload.date,
          avaiableTime: true,
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

  async getTimeslotDetail(timeslotId: number) {
    console.log('timeslot id : ', timeslotId);

    try {
      const timeslot = await prisma.timeslot.findFirst({
        where: {
          id: timeslotId,
        },
      });

      return timeslot;
    } catch (error) {
      throw error;
    }
  }

  async deleteTimeslot(timeslotId: number) {
    try {
      const timeslot = await prisma.timeslot.delete({
        where: {
          id: timeslotId,
        },
      });

      return timeslot;
    } catch (error) {
      console.log('service error : ', error);

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
          time: payload.time,
          date: payload.date,
          avaiableTime: true,
        },
      });

      return timeslot;
    } catch (error) {
      throw error;
    }
  }

  async checkAvaiableTimeslot() {}
}

export default TimeslotService;

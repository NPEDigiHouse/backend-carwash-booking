import { NextFunction, Request, Response } from 'express';
import TimeslotService from '../../service/Timeslot/TimeslotService';
import moment from 'moment';

class TimeslotController {
  service: TimeslotService;

  constructor(service: TimeslotService) {
    this.service = service;
    this.getAllTimeslots = this.getAllTimeslots.bind(this);
    this.createTimeslot = this.createTimeslot.bind(this);
    this.updateTimeslot = this.updateTimeslot.bind(this);
    this.deleteTimeslot = this.deleteTimeslot.bind(this);
  }

  async getAllTimeslots(req: Request, res: Response, next: NextFunction) {
    try {
      const timeslots = await this.service.getAllTimeslot();

      console.log('timeslot : ', timeslots[0].date);
      console.log(
        'timeslot moment convert : ',
        moment(timeslots[0].date).format(),
      );

      return res.json({
        message: 'Berhasil mendapatkan semua data timeslot',
        data: timeslots.map((timeslot) => {
          return {
            id: timeslot.id,
            time: timeslot.time,
            date: moment(timeslot.date).format('DD MMMM YYYY'),
            avaiableTime: timeslot.avaiableTime,
          };
        }),
      });
    } catch (error) {
      next(error);
    }
  }

  async createTimeslot(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;

      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (!timeRegex.test(payload.time)) {
        throw new Error('Invalid time format please use HH:MM format time');
      }

      const timeslot = await this.service.createTimeslot(payload);

      return res.json({
        message: 'Berhasil membuat data timeslot',
        data: timeslot,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTimeslot(req: Request, res: Response, next: NextFunction) {
    try {
      const { timeslotId } = req.params;

      const timeslot = await this.service.deleteTimeslot(Number(timeslotId));

      return res.json({
        message: 'Berhasil mendapatkan semua data timeslot',
        data: timeslot,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  async updateTimeslot(req: Request, res: Response, next: NextFunction) {
    try {
      try {
        const payload = req.body;
        const { timeslotId } = req.params;

        const timeslot = await this.service.updateTimeslot(
          Number(timeslotId),
          payload,
        );

        return res.json({
          message: 'Berhasil mengubah data timeslot',
          data: timeslot,
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default TimeslotController;

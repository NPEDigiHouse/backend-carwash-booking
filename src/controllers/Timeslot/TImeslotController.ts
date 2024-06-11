import { NextFunction, Request, Response } from 'express';
import TimeslotService from '../../service/Timeslot/TimeslotService';

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

      return res.json({
        message: 'Berhasil mendapatkan semua data timeslot',
        data: timeslots,
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
      const { timelostId } = req.params;

      const timeslot = await this.service.deleteTimeslot(Number(timelostId));

      return res.json({
        message: 'Berhasil mendapatkan semua data timeslot',
        data: timeslot,
      });
    } catch (error) {
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

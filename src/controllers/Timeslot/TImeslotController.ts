import { NextFunction, Request, Response } from 'express';
import TimeslotService from '../../service/Timeslot/TimeslotService';

class TimeslotController {
  service: TimeslotService;

  constructor(service: TimeslotService) {
    this.service = service;
  }

  async getAllTimeslots(req: Request, res: Response, next: NextFunction) {
    try {
      const timeslots = await this.service.getAllTimeslot();

      return res.json({
        message: 'Berhasil mendapatkan semua data timeslot',
        data: timeslots,
      });
    } catch (error) {
      throw error;
    }
  }

  async createTimeslot(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const timeslot = await this.service.createTimeslot(payload);

      return res.json({
        message: 'Berhasil membuat data timeslot',
        data: timeslot,
      });
    } catch (error) {
      throw error;
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
      throw error;
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
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default TimeslotController;

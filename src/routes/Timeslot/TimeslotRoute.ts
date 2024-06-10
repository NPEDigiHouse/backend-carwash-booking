import { NextFunction, Request, Response, Router } from 'express';
import { authToken, checkAdminAccees } from '../../middleware/AuthMiddleware';
import { routerConfig } from '../../config/routes/RoutesConfig';
import TimeslotController from '../../controllers/Timeslot/TImeslotController';

class TimeslotRoute {
  route: Router;
  timeslotController: TimeslotController;

  constructor(timeslotController: TimeslotController) {
    this.timeslotController = timeslotController;
    this.route = Router();
    this.registerRoute();
  }

  getAllTimeslotsRoute() {
    return this.route.get(
      '/',
      authToken,
      checkAdminAccees,
      (req: Request, res: Response, next: NextFunction) =>
        this.timeslotController.getAllTimeslots(req, res, next),
    );
  }

  createTimeslot() {
    return this.route.post(
      '/',
      authToken,
      checkAdminAccees,
      (req: Request, res: Response, next: NextFunction) =>
        this.timeslotController.createTimeslot(req, res, next),
    );
  }

  updateTimeslot() {
    return this.route.put(
      '/:timeslotId',
      authToken,
      checkAdminAccees,
      (req: Request, res: Response, next: NextFunction) =>
        this.timeslotController.updateTimeslot(req, res, next),
    );
  }

  deleteTimeslot() {
    return this.route.delete(
      '/:timeslotId',
      authToken,
      checkAdminAccees,
      (req: Request, res: Response, next: NextFunction) =>
        this.timeslotController.deleteTimeslot(req, res, next),
    );
  }

  registerRoute(): Router {
    this.getAllTimeslotsRoute();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default TimeslotRoute;

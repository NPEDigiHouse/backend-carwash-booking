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
      this.timeslotController.getAllTimeslots,
    );
  }

  createTimeslot() {
    return this.route.post(
      '/',
      authToken,
      checkAdminAccees,
      this.timeslotController.createTimeslot,
    );
  }

  updateTimeslot() {
    return this.route.put(
      '/:timeslotId',
      authToken,
      checkAdminAccees,
      this.timeslotController.updateTimeslot,
    );
  }

  deleteTimeslot() {
    return this.route.delete(
      '/:timeslotId',
      authToken,
      checkAdminAccees,
      this.timeslotController.deleteTimeslot,
    );
  }

  registerRoute(): Router {
    this.getAllTimeslotsRoute();
    this.createTimeslot();
    this.deleteTimeslot();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default TimeslotRoute;

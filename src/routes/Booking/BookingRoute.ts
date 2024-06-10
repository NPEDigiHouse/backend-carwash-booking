import { NextFunction, Request, Response, Router } from 'express';
import { authToken, checkAdminAccees } from '../../middleware/AuthMiddleware';
import { routerConfig } from '../../config/routes/RoutesConfig';
import BookingController from '../../controllers/Booking/BookingController';

class BookingRoute {
  route: Router;
  bookingController: BookingController;

  constructor(bookingController: BookingController) {
    this.bookingController = bookingController;
    this.route = Router();
    this.registerRoute();
  }

  createBookingRoute() {
    return this.route.post(
      '/',
      authToken,
      checkAdminAccees,
      this.bookingController.createBooking,
    );
  }

  getAllCustomerBookingsRoute() {
    return this.route.get(
      '/:customerId',
      authToken,
      checkAdminAccees,
      this.bookingController.getCustomerBooking,
    );
  }

  registerRoute(): Router {
    this.getAllCustomerBookingsRoute();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default BookingRoute;

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
      this.bookingController.createBooking,
    );
  }

  getAllCustomerBookingsRoute() {
    return this.route.get(
      '/:customerId',
      authToken,
      this.bookingController.getCustomerBooking,
    );
  }

  getAllBookingsRoute() {
    return this.route.get(
      '/',
      authToken,
      checkAdminAccees,
      this.bookingController.getAllBookings,
    );
  }

  cancelCustomerBookingRoute() {
    return this.route.delete(
      '/:bookingId',
      authToken,
      this.bookingController.cancelCustomerBooking,
    );
  }

  registerRoute(): Router {
    this.getAllCustomerBookingsRoute();
    this.createBookingRoute();
    this.cancelCustomerBookingRoute();
    this.getAllBookingsRoute();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default BookingRoute;

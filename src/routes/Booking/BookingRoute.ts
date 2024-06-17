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

  confirmBookingRoute() {
    return this.route.delete(
      '/confirm/:bookingId',
      authToken,
      checkAdminAccees,

      this.bookingController.confirmationBooking,
    );
  }

  unconfirmBookingRoute() {
    return this.route.delete(
      '/unconfirm/:bookingId',
      authToken,
      checkAdminAccees,
      this.bookingController.unconfirmationBooking,
    );
  }

  cancelCustomerBookingRoute() {
    return this.route.delete(
      '/cancel-booking/:bookingId',
      authToken,
      this.bookingController.cancelCustomerBooking,
    );
  }

  registerRoute(): Router {
    this.getAllCustomerBookingsRoute();
    this.createBookingRoute();
    this.cancelCustomerBookingRoute();
    this.getAllBookingsRoute();
    this.confirmBookingRoute();
    this.unconfirmBookingRoute();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default BookingRoute;

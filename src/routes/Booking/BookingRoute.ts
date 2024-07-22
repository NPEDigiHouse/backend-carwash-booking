import { NextFunction, Request, Response, Router } from 'express';
import { authToken, checkAdminAccees } from '../../middleware/AuthMiddleware';
import { routerConfig } from '../../config/routes/RoutesConfig';
import BookingController from '../../controllers/Booking/BookingController';
import { upload } from '../../middleware/MulterMiddleware';

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
      '/customer/:customerId',
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

  getBookingDetail() {
    return this.route.get(
      '/:bookingId',
      authToken,
      // checkAdminAccees,
      this.bookingController.getBookingDetail,
    );
  }

  updateConfirmationBookingRoute() {
    return this.route.put(
      '/:bookingId/confirmation',
      authToken,
      checkAdminAccees,
      this.bookingController.updateConfirmationBooking,
    );
  }

  uploadReceipt() {
    return this.route.put(
      '/:bookingId/upload-receipt',
      authToken,
      upload('booking').single('receipt'),
      this.bookingController.uploadReceipt,
    );
  }

  unconfirmBookingRoute() {
    return this.route.put(
      '/:bookingId/unconfirm',
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

  deleteBookingRoute() {
    return this.route.delete(
      '/:bookingId',
      authToken,
      // checkAdminAccees,
      this.bookingController.cancelCustomerBooking,
    );
  }

  registerRoute(): Router {
    this.getAllCustomerBookingsRoute();
    this.createBookingRoute();
    this.cancelCustomerBookingRoute();
    this.getAllBookingsRoute();
    this.getBookingDetail();
    this.updateConfirmationBookingRoute();
    this.deleteBookingRoute();
    this.unconfirmBookingRoute();
    this.uploadReceipt();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default BookingRoute;

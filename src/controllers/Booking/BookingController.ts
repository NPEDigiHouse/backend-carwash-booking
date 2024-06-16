import { NextFunction, Request, Response } from 'express';
import BookingService from '../../service/Booking/BookingService';

class BookingController {
  service: BookingService;

  constructor(service: BookingService) {
    this.service = service;
    this.createBooking = this.createBooking.bind(this);
    this.getCustomerBooking = this.getCustomerBooking.bind(this);
    this.cancelCustomerBooking = this.cancelCustomerBooking.bind(this);
    this.getAllBookings = this.getAllBookings.bind(this);
  }

  async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const booking = await this.service.createBooking(payload);

      return res.json({
        message: 'Berhasil membuat booking',
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCustomerBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const bookings = await this.service.getCustomerBooking(customerId);

      return res.json({
        message: 'Berhasil mendapatkan data booking customer',
        data: bookings,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllBookings(req: Request, res: Response, next: NextFunction) {
    try {
      const bookings = await this.service.getAllBooking();

      return res.json({
        message: 'Berhasil mendapatkan data booking',
        data: bookings,
      });
    } catch (error) {
      console.log('error : ', error);

      next(error);
    }
  }

  async cancelCustomerBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookingId } = req.params;
      const bookings = await this.service.cancelBooking(bookingId);

      return res.json({
        message: 'Berhasil membatalkan booking',
        data: bookings,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BookingController;

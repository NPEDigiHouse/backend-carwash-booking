import { NextFunction, Request, Response } from 'express';
import BookingService from '../../service/Booking/BookingService';
import moment from 'moment';

class BookingController {
  service: BookingService;

  constructor(service: BookingService) {
    this.service = service;
    this.createBooking = this.createBooking.bind(this);
    this.getCustomerBooking = this.getCustomerBooking.bind(this);
    this.cancelCustomerBooking = this.cancelCustomerBooking.bind(this);
    this.getAllBookings = this.getAllBookings.bind(this);
    this.getBookingDetail = this.getBookingDetail.bind(this);
    this.updateConfirmationBooking = this.updateConfirmationBooking.bind(this);
    this.unconfirmationBooking = this.unconfirmationBooking.bind(this);
    this.uploadReceipt = this.uploadReceipt.bind(this);
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
        data: bookings.map((booking) => {
          return {
            id: booking.id,
            name: booking.customer.name,
            carType: booking.carType,
            carPlate: booking.licensePlate,
            status: booking.status,
            amount: booking.amount,
            bookingDate: moment(booking.bookingDate).format('DD MMM YYYY'),
            bookingTime: booking.timeslot.time,
            service: `Car ${booking.product.productName.toLowerCase()}`,
            promo: !booking.promo
              ? 'tidak menggunakan promo'
              : booking.promo.promoName,
          };
        }),
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
        data: bookings.map((booking) => {
          return {
            id: booking.id,
            name: booking.customer.name,
            phoneNumber: booking.customer.phoneNumber,
            carType: booking.carType,
            carPlate: booking.licensePlate,
            status: booking.status,
            amount: booking.amount,
            receipt: booking.receipt,
            bookingDate: moment(booking.bookingDate).format('DD MMM YYYY'),
            bookingTime: booking.timeslot.time,
            service: `Car ${booking.product.productName.toLowerCase()}`,
            promo: !booking.promo
              ? 'tidak menggunakan promo'
              : booking.promo.promoName,
          };
        }),
      });
    } catch (error) {
      console.log('error : ', error);

      next(error);
    }
  }

  async getBookingDetail(req: Request, res: Response, next: NextFunction) {
    console.log('params id : ', req.params);

    try {
      const { bookingId } = req.params;
      const booking = await this.service.getBookingDetail(bookingId);

      return res.json({
        message: 'Berhasil mendapatkan data booking',
        data: {
          id: booking?.id,
          name: booking?.customer.name,
          phoneNumber: booking?.customer.phoneNumber,
          carType: booking?.carType,
          carPlate: booking?.licensePlate,
          status: booking?.status,
          amount: booking?.amount,
          receipt: booking?.receipt,
          bookingDate: moment(booking?.bookingDate).format('DD MMM YYYY'),
          bookingTime: booking?.timeslot.time,
          service: `Car ${booking?.product.productName.toLowerCase()}`,
          promo: !booking?.promo
            ? 'tidak menggunakan promo'
            : booking.promo.promoName,
          discount: booking?.promo?.discount,
          productPrice: booking?.product.price,
        },
      });
    } catch (error) {
      console.log('error : ', error);

      next(error);
    }
  }

  async uploadReceipt(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params;
      const receipt = req.file?.filename as any;

      console.log('receipt : ', receipt);

      const bookingReceipt = await this.service.uploadReceipt(
        params.bookingId,
        receipt,
      );

      return res.json({
        message: 'Berhasil upload bukti pembayaran',
        data: bookingReceipt,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateConfirmationBooking(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { bookingId } = req.params;
      const { status } = req.body;
      const booking = await this.service.updateConfirmationBooking(
        bookingId,
        status,
      );
      console.log('confirm status : ', booking);

      return res.json({
        message: 'Berhasil konfirmasi booking',
        data: booking,
      });
    } catch (error) {
      console.log('confirm booking error : ', error);

      next(error);
    }
  }

  async unconfirmationBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookingId } = req.params;
      const bookings = await this.service.cancelConfimBooking(bookingId);

      return res.json({
        message: 'Berhasil membatalkan konfirmasi booking',
        data: bookings,
      });
    } catch (error) {
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

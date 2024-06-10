import prisma from '../../config/database';
import { IBookingRequestType } from '../../core/interfaces/request/IBookingRequestInterface';

class BookingService {
  async createBooking(payload: IBookingRequestType) {
    try {
      const booking = await prisma.booking.create({
        data: {
          bookingDate: payload.bookingDate,
          carType: payload.carType,
          licensePlate: payload.licensePlat,
          status: payload.status,
          customerId: payload.customerId,
          timeslotId: payload.timeslotId,
          amount: payload.amount,
          receipt: payload.receipt,
          promo: {
            connect: payload.promo?.map((pr) => {
              return {
                id: pr.id,
              };
            }),
          },
          product: {
            connect: payload.product.map((pd) => {
              return {
                id: pd.id,
              };
            }),
          },
        },
      });

      return booking;
    } catch (error) {
      throw error;
    }
  }

  async getAllBooking() {
    try {
      const bookings = await prisma.booking.findMany();

      return bookings;
    } catch (error) {
      throw error;
    }
  }

  async getBookingDetail(bookingId: string) {
    try {
      const booking = await prisma.booking.findFirst({
        where: {
          id: bookingId,
        },
      });

      return booking;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerBooking(customerId: string) {
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          customerId,
        },
      });

      return bookings;
    } catch (error) {
      throw error;
    }
  }

  async cancelBooking(bookingId: string) {
    try {
      const booking = await prisma.booking.delete({
        where: {
          id: bookingId,
        },
      });

      return booking;
    } catch (error) {
      throw error;
    }
  }

  async updateBooking(bookingId: string, payload: IBookingRequestType) {
    try {
      const booking = await prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          bookingDate: payload.bookingDate,
          carType: payload.carType,
          licensePlate: payload.licensePlat,
          customerId: payload.customerId,
          timeslotId: payload.timeslotId,
          status: payload.status,
          promo: {
            connect: payload.promo?.map((pr) => {
              return {
                id: pr.id,
              };
            }),
          },
          product: {
            connect: payload.product.map((pd) => {
              return {
                id: pd.id,
              };
            }),
          },
        },
      });

      return booking;
    } catch (error) {
      throw error;
    }
  }

  async confirmBooking(bookingId: string) {
    try {
      const booking = await prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          status: 'CONFIRMATION',
        },
      });

      return booking;
    } catch (error) {
      throw error;
    }
  }
}

export default BookingService;

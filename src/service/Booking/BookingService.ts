import prisma from '../../config/database';
import { IBookingRequestType } from '../../core/interfaces/request/IBookingRequestInterface';

class BookingService {
  async createBooking(payload: IBookingRequestType) {
    try {
      // const booking = await prisma.booking.create({
      //   data: {
      //     bookingDate: payload.bookingDate,
      //     carType: payload.carType,
      //     licensePlate: payload.licensePlat,
      //     status: payload.status,
      //     customerId: payload.customerId,
      //     timeslotId: payload.timeslotId,
      //     amount: payload.amount,
      //     receipt: payload.receipt,
      //     promo: {
      //       connect: payload.promo?.map((pr) => {
      //         return {
      //           id: pr.id,
      //         };
      //       }),
      //     },
      //     product: {
      //       connect: payload.product.map((pd) => {
      //         return {
      //           id: pd.id,
      //         };
      //       }),
      //     },
      //   },
      // });

      const bookingTr = await prisma.$transaction(async (db) => {
        const products = await db.product.findMany({
          where: {
            id: { in: payload.product.map((pd) => pd.id) },
          },
        });

        const promos = !payload.promo
          ? []
          : await db.promo.findMany({
              where: {
                id: { in: payload.promo?.map((pr) => pr.id) },
              },
            });

        let totalAmount = products.reduce(
          (sum, product) => sum + product.price,
          0,
        );

        // Kurangi diskon promo
        const totalDiscount = promos.reduce(
          (sum, promo) => sum + promo.discount,
          0,
        );
        const discountAmount = totalAmount * (totalDiscount / 100);

        totalAmount -= discountAmount;

        const booking = await db.booking.create({
          data: {
            bookingDate: payload.bookingDate,
            carType: payload.carType,
            licensePlate: payload.licensePlat,
            status: payload.status,
            customerId: payload.customerId,
            timeslotId: payload.timeslotId,
            amount: totalAmount,
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
      });

      return bookingTr;
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

  async totalBookingChart() {}
}

export default BookingService;

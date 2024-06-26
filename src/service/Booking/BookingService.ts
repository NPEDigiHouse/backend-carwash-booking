import { log } from 'console';
import prisma from '../../config/database';
import { IBookingRequestType } from '../../core/interfaces/request/IBookingRequestInterface';
import CustomError from '../../utils/common/CustomError';
import { BookingStatus } from '@prisma/client';

class BookingService {
  async createBooking(payload: IBookingRequestType) {
    console.log('payload booking : ', payload);

    try {
      const bookingTr = await prisma.$transaction(async (db) => {
        const customerBooking = await db.booking.findFirst({
          where: {
            customerId: payload.customerId,
            productId: payload.productId,
          },
        });

        const product = await db.product.findFirst({
          where: {
            id: payload.productId,
          },
        });

        if (customerBooking) {
          throw new CustomError(
            `Booking untuk product car ${product?.productName.toLowerCase()} sudah dibuat, mohon batalkan lebih dulu`,
            404,
          );
        }

        const promo = !payload.promoId
          ? null
          : await db.promo.findFirst({
              where: {
                id: payload.promoId,
              },
            });

        const bookingDate = await db.timeslot.findFirst({
          where: {
            id: payload.timeslotId,
          },
        });

        const discountAmount =
          !product?.price && !promo?.discount
            ? product?.price
            : product!.price * (promo!.discount / 100);

        console.log('discount amount : ', discountAmount);

        const totalPrice =
          !product?.price && !discountAmount
            ? product?.price
            : product!.price - discountAmount!;

        console.log('total price : ', totalPrice);

        const booking = await db.booking.create({
          data: {
            bookingDate: bookingDate?.date!,
            carType: payload.carType,
            licensePlate: payload.licensePlate,
            status: payload.status,
            customerId: payload.customerId,
            timeslotId: payload.timeslotId,
            amount: totalPrice,
            receipt: payload.receipt,
            phoneNumber: payload.phoneNumber,
            // promo: {
            //   connect: payload.promo?.map((pr) => {
            //     return {
            //       id: pr.id,
            //     };
            //   }),
            // },
            // product: {
            //   connect: payload.product.map((pd) => {
            //     return {
            //       id: pd.id,
            //     };
            //   }),
            // },
            promoId: payload.promoId,
            productId: payload.productId,
          },
        });

        return booking;
      });

      return bookingTr;
    } catch (error) {
      throw error;
    }
  }

  async uploadReceipt(bookingId: string, receipt: string) {
    try {
      const user = await prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          receipt: receipt,
        },
        select: {
          id: true,
          receipt: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAllBooking() {
    try {
      const bookings = await prisma.booking.findMany({
        select: {
          id: true,
          customer: {
            select: {
              name: true,
              phoneNumber: true,
            },
          },
          carType: true,
          licensePlate: true,
          paymentStatus: true,
          status: true,
          amount: true,
          bookingDate: true,
          receipt: true,
          timeslot: {
            select: {
              time: true,
            },
          },
          product: {
            select: {
              productName: true,
            },
          },
          promo: {
            select: {
              promoName: true,
            },
          },
        },
      });

      return bookings;
    } catch (error) {
      throw error;
    }
  }

  async getBookingDetail(bookingId: string) {
    console.log('booking id : ', bookingId);

    try {
      const booking = await prisma.booking.findFirst({
        where: {
          id: bookingId,
        },
        include: {
          customer: true,
          product: true,
          promo: true,
          timeslot: true,
        },
      });

      // if (!booking) {
      //   throw new CustomError(`Booking tidak ditemukan`, 404);
      // }

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
        include: {
          customer: {
            select: {
              name: true,
            },
          },
          product: {
            select: {
              productName: true,
            },
          },
          promo: {
            select: {
              promoName: true,
            },
          },
          timeslot: {
            select: {
              time: true,
            },
          },
        },
      });

      if (!bookings) {
        throw new CustomError(`Booking tidak ditemukan`, 404);
      }

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
      // const booking = await prisma.booking.update({
      //   where: {
      //     id: bookingId,
      //   },
      //   data: {
      //     bookingDate: payload.bookingDate,
      //     carType: payload.carType,
      //     licensePlate: payload.licensePlat,
      //     customerId: payload.customerId,
      //     timeslotId: payload.timeslotId,
      //     status: payload.status,
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

      return 'tes';
    } catch (error) {
      throw error;
    }
  }

  async updateConfirmationBooking(bookingId: string, status: BookingStatus) {
    try {
      const updatePaymentStat =
        status === 'CONFIRMATION' ? 'COMPLETED' : 'PENDING';
      const booking = await prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          status,
          paymentStatus: updatePaymentStat,
        },
      });

      return booking;
    } catch (error) {
      throw error;
    }
  }

  async cancelConfimBooking(bookingId: string) {
    try {
      const booking = await prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          status: 'UNCONFIRMATION',
          paymentStatus: 'CANCELED',
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

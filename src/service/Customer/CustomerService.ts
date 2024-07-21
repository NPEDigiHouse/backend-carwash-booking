import prisma from '../../config/database';
import { IBookingRequestType } from '../../core/interfaces/request/IBookingRequestInterface';
import { ICustomerUserRecordRequestInterface } from '../../core/interfaces/request/ICustomerRequestInterface';
import CustomError from '../../utils/common/CustomError';

class CustomerService {
  async getAllCustomer() {
    try {
      const customers = await prisma.customer.findMany({
        include: {
          booking: {
            include: {
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
          },
          user: {
            select: {
              email: true,
              username: true,
            },
          },
        },
      });

      return customers;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerDetail(id: string) {
    try {
      const customer = await prisma.customer.findFirst({
        where: {
          OR: [
            {
              id,
            },
            {
              user: {
                id,
              },
            },
          ],
        },
        include: {
          booking: {
            include: {
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
          },
          user: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
        },
      });

      return customer;
    } catch (error) {
      throw error;
    }
  }

  async deleteCustomer(customerId: string) {
    try {
      const customer = await prisma.customer.delete({
        where: {
          id: customerId,
        },
      });

      if (!customer) {
        throw new CustomError('Customer tidak ditemukan', 404);
      }

      return customer;
    } catch (error) {
      throw error;
    }
  }

  async updateCustomer(
    customerId: string,
    payload: ICustomerUserRecordRequestInterface,
  ) {
    try {
      const customer = await prisma.customer.update({
        where: {
          id: customerId,
        },
        data: {
          name: payload.customer.name,
          phoneNumber: payload.customer.phoneNumber,
          user: {
            connect: {
              id: payload.id,
            },
            update: {
              email: payload.email,
              username: payload.username,
            },
          },
        },
      });

      return customer;
    } catch (error) {
      throw error;
    }
  }

  // async customerCreateBooking(customerId: string, payload: IBookingRequestType) {
  //   try {

  //     const customerBooking = await prisma.$transaction(async db => {

  //       if(!payload.bookingDate) {
  //         throw new CustomError("Booking date tidak dipilih", 404)
  //       }

  //       const booking = await db.customer.create({
  //         data: {
  //           booking: {
  //             connectOrCreate: {
  //               where: {
  //                 id: customerId
  //               },
  //               create: {
  //                 bookingDate: payload.bookingDate,
  //                 carType: payload.carType,
  //                 licensePlate: payload.licensePlate,
  //                 productId: payload.productId,
  //                 timeslotId: payload.timeslotId,
  //                 promoId: payload.promoId

  //               }
  //             }
  //           }
  //         }
  //       })
  //     })

  //   } catch (error) {

  //   }
  // }
}

export default CustomerService;

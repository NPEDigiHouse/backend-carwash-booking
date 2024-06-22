import { NextFunction, Request, Response } from 'express';
import CustomerService from '../../service/Customer/CustomerService';
import moment from 'moment';

class CustomerController {
  service: CustomerService;

  constructor(service: CustomerService) {
    this.service = service;
    this.getAllCustomer = this.getAllCustomer.bind(this);
    this.getCustomerDetail = this.getCustomerDetail.bind(this);
  }

  async getAllCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await this.service.getAllCustomer();

      console.log('customers : ', customers);

      return res.json({
        message: 'Berhasil mendapatkan semua data customer',
        data: customers,
      });
    } catch (error) {
      throw error;
    }
  }

  async getCustomerDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const customer = await this.service.getCustomerDetail(id);

      console.log('customer : ', customer);

      return res.json({
        message: 'Berhasil mendapatkan semua data customer',
        data: {
          id: customer?.id,
          name: customer?.name,
          phoneNumber: customer?.phoneNumber,
          bookings: customer?.booking.map((book) => {
            return {
              id: book.id,
              carType: book.carType,
              carPlate: book.licensePlate,
              status: book.status,
              amount: book.amount,
              bookingDate: moment(book.bookingDate).format('DD MMM YYYY'),
              bookingTime: book.timeslot.time,
              service: `Car ${book.product.productName.toLowerCase()}`,
              promo: !book.promo
                ? 'tidak menggunakan promo'
                : book.promo.promoName,
            };
          }),
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default CustomerController;

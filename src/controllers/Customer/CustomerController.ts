import { NextFunction, Request, Response } from 'express';
import CustomerService from '../../service/Customer/CustomerService';
import moment from 'moment';
import { ICustomerRequestInterface } from '../../core/interfaces/request/ICustomerRequestInterface';

class CustomerController {
  service: CustomerService;

  constructor(service: CustomerService) {
    this.service = service;
    this.getAllCustomer = this.getAllCustomer.bind(this);
    this.getCustomerDetail = this.getCustomerDetail.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
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
      next(error);
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
          user: {
            id: customer?.user?.id,
            email: customer?.user?.email,
            username: customer?.user?.username,
          },
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
      next(error);
    }
  }

  async deleteCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const customer = await this.service.deleteCustomer(customerId);

      return res.json({
        message: 'Berhasil menghapus data customer',
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const payload = req.body;

      const customerData = {
        customer: { name: payload.name, phoneNumber: payload.phoneNumber },
        email: payload.email,
        username: payload.username,
        id: payload.id,
      };

      const customer = await this.service.updateCustomer(
        customerId,
        customerData,
      );

      return res.json({
        message: 'Berhasil mengubah data customer',
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CustomerController;

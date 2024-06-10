import { NextFunction, Request, Response } from 'express';
import CustomerService from '../../service/Customer/CustomerService';

class CustomerController {
  service: CustomerService;

  constructor(service: CustomerService) {
    this.service = service;
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
}

export default CustomerController;

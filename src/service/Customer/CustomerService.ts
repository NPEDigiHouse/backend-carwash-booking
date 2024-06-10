import prisma from '../../config/database';

class CustomerService {
  async getAllCustomer() {
    try {
      const customers = await prisma.customer.findMany();

      return customers;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerDetail(customerId: string) {
    try {
      const customer = await prisma.customer.findFirst({
        where: {
          id: customerId,
        },
      });

      return customer;
    } catch (error) {
      throw error;
    }
  }

  async updateCustomer() {}
}

export default CustomerService;

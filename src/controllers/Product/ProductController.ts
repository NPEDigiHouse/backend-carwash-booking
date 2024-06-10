import { NextFunction, Request, Response } from 'express';
import ProductService from '../../service/Product/ProductService';

class ProductController {
  service: ProductService;

  constructor(service: ProductService) {
    this.service = service;
    this.getAllProduct = this.getAllProduct.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async getAllProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.service.getAllProduct();

      return res.json({
        message: 'Berhasil menampilkan semua data product',
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;

      const product = await this.service.createProduct(payload);

      return res.json({
        message: 'Berhasil membuat product',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const { productId } = req.params;

      const product = await this.service.updateProduct(
        Number(productId),
        payload,
      );

      return res.json({
        message: 'Berhasil mengubah data product',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;

      const product = await this.service.deleteProduct(Number(productId));

      return res.json({
        message: 'Berhasil menghapus product',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;

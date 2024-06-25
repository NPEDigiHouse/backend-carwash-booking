import { NextFunction, Request, Response } from 'express';
import PromoService from '../../service/Promo/PromoService';

class PromoController {
  service: PromoService;

  constructor(service: PromoService) {
    this.service = service;
    this.getAllPromo = this.getAllPromo.bind(this);
    this.createPromo = this.createPromo.bind(this);
    this.deletePromo = this.deletePromo.bind(this);
    this.updatePromo = this.updatePromo.bind(this);
    this.getDetailPromo = this.getDetailPromo.bind(this);
  }

  async getAllPromo(req: Request, res: Response, next: NextFunction) {
    try {
      const promos = await this.service.getAllPromos();

      return res.json({
        message: 'Berhasil menampilkan semua data promo',
        data: promos,
      });
    } catch (error) {
      next(error);
    }
  }

  async getDetailPromo(req: Request, res: Response, next: NextFunction) {
    console.log('id params : ', req.params);

    try {
      const { promoId } = req.params;
      const promo = await this.service.getDetailPromo(Number(promoId));

      return res.json({
        message: 'Berhasil menampilkan detail promo',
        data: promo,
      });
    } catch (error) {
      next(error);
    }
  }

  async createPromo(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const promo = await this.service.createPromo(payload);

      return res.json({
        message: 'Berhasil membuat promo',
        data: promo,
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePromo(req: Request, res: Response, next: NextFunction) {
    try {
      const { promoId } = req.params;

      const promo = await this.service.deletePromo(Number(promoId));

      return res.json({
        message: 'Berhasil menghapus promo',
        data: promo,
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePromo(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;

      const { promoId } = req.params;
      const promo = await this.service.updatePromo(Number(promoId), payload);

      return res.json({
        message: 'Berhasil mengubah data promo',
        data: promo,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default PromoController;

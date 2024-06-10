import prisma from '../../config/database';
import { IPromoRequestParamsType } from '../../core/interfaces/request/IPromoRequestInterface';

class PromoService {
  async createPromo(payload: IPromoRequestParamsType) {
    try {
      const promo = await prisma.promo.create({
        data: {
          discount: payload.discount,
          endDate: payload.endDate,
          startedDate: payload.startedDate,
          promoName: payload.promoName,
        },
      });

      return promo;
    } catch (error) {
      throw error;
    }
  }

  async deletePromo(promoId: number) {
    try {
      const promo = await prisma.promo.delete({
        where: {
          id: promoId,
        },
      });

      return promo;
    } catch (error) {
      throw error;
    }
  }

  async updatePromo(promoId: number, payload: IPromoRequestParamsType) {
    try {
      const promo = await prisma.promo.update({
        where: {
          id: promoId,
        },
        data: {
          discount: payload.discount,
          endDate: payload.endDate,
          startedDate: payload.startedDate,
          promoName: payload.promoName,
        },
      });

      return promo;
    } catch (error) {
      throw error;
    }
  }

  async getAllPromos() {
    try {
      const promos = await prisma.promo.findMany();

      return promos;
    } catch (error) {
      throw error;
    }
  }
}

export default PromoService;

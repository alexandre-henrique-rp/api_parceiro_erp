import { Injectable } from '@nestjs/common';
import { Fcweb } from '../models/fcweb.model';
import { Op } from 'sequelize';

@Injectable()
export class FcwebService {
  constructor() {}

  async findAll() {
    return await Fcweb.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      raw: true,
    });
  }
}

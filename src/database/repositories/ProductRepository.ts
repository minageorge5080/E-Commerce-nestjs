import { Injectable } from '@nestjs/common';
import { Product } from '../models/ProductModel';
import { BaseRepository } from './BaseRepository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export interface IProductRepository {}

@Injectable()
export class ProductRepository
  extends BaseRepository<Product>
  implements IProductRepository
{
  constructor(
    @InjectModel(Product.name)
    private readonly model: Model<Product>,
  ) {
    super(model);
  }
}

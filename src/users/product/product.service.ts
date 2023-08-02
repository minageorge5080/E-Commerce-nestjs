import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ProductRepository } from 'src/database/repositories/ProductRepository';
import { ProductResponseDto } from './dtos/product-response.dto';
import { plainToClass } from 'class-transformer';
import { CreateProductRequestDto } from './dtos/create-product-request.dto';
import { UpdateProductRequestDto } from './dtos/update-product-request.dto';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.findAll();
    return plainToClass(ProductResponseDto, products, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }

  async create(data: CreateProductRequestDto): Promise<ProductResponseDto> {
    if (!this.hasPrice(data)) {
      throw new UnprocessableEntityException('Check product price!');
    }
    const product = await this.productRepository.create(data);
    return plainToClass(ProductResponseDto, product, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }

  async update(
    id: string,
    data: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    // TODO handle empty data.
    // TODO check product price.
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('product not found ');
    }
    const product = await this.productRepository.updateOneAndReturn(id, data);
    if (!product) {
      throw new NotFoundException('product not found ');
    }
    return plainToClass(ProductResponseDto, product, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }

  async delete(id: string): Promise<ProductResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('product not found ');
    }
    const product = await this.productRepository.deleteOneAndReturn(id);
    if (!product) {
      throw new NotFoundException('product not found ');
    }
    return plainToClass(ProductResponseDto, product, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }

  private hasPrice(product: CreateProductRequestDto): boolean {
    if (product.price !== undefined) {
      return true;
    } else {
      if (product.variants.every((v) => v.price !== undefined) === true) {
        return true;
      }
      const allOptions: any = [];
      product.variants.forEach((v) => {
        v.options.forEach((op) => allOptions.push(op));
      });
      console.log(JSON.stringify(allOptions));
      if (allOptions.every((o: any) => o.price !== undefined) === true) {
        return true;
      }
    }
    return false;
  }
}

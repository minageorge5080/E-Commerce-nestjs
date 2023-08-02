import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductRequestDto } from './dtos/create-product-request.dto';
import { ProductResponseDto } from './dtos/product-response.dto';
import { UpdateProductRequestDto } from './dtos/update-product-request.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<ProductResponseDto[]> {
    return await this.productService.findAll();
  }

  @Post()
  async create(
    @Body() body: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return await this.productService.create(body);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return await this.productService.update(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<ProductResponseDto> {
    return await this.productService.delete(id);
  }
}

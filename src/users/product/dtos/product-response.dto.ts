import { Expose, Type } from 'class-transformer';

export class PriceDto {
  @Expose()
  readonly currency: string;
  @Expose()
  readonly value: number;
}

export class VariantOptionDto {
  @Expose()
  readonly title: string;

  @Expose()
  readonly order: number;

  @Expose()
  readonly stock: number;

  @Expose()
  @Type(() => PriceDto)
  readonly price: PriceDto;
}

export class VariantImageDto {
  @Expose()
  readonly url: string;

  @Expose()
  readonly order: number;
}

export class VariantDto {
  @Expose()
  order: number;

  @Expose()
  readonly title: string;

  @Expose()
  @Type(() => PriceDto)
  readonly price: PriceDto;

  @Expose()
  @Type(() => VariantImageDto)
  readonly images: VariantImageDto[];

  @Expose()
  @Type(() => VariantOptionDto)
  readonly options: VariantOptionDto[];
}

export class ProductResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly title: string;

  @Expose()
  readonly description: string;

  @Expose()
  @Type(() => PriceDto)
  readonly price: PriceDto;

  @Expose()
  @Type(() => VariantDto)
  readonly variants: VariantDto[];
}

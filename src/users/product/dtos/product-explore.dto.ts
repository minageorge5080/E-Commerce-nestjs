import { Expose, Transform, Type } from 'class-transformer';

export class PriceDto {
  @Expose()
  readonly currency: string;
  @Expose()
  readonly value: number;
}

export class ProductExploreResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly title: string;

  @Expose()
  readonly mainImage: string;

  @Expose()
  readonly description: string;

  @Expose()
  @Type(() => PriceDto)
  readonly explorePrice: PriceDto;
}

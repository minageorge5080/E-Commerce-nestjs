import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CURRENCIES } from 'src/core/constants';

export class PriceDto {
  @IsEnum(CURRENCIES)
  readonly currency: string;

  @IsNumber()
  readonly value: number;
}

export class VariantImageDto {
  @IsString()
  @IsNotEmpty()
  readonly url: string;

  @IsNumber()
  @IsPositive()
  readonly order: number;
}

export class VariantOptionDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  @IsPositive()
  readonly order: number;

  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PriceDto)
  readonly price: PriceDto;
}

export class VariantDto {
  @IsNumber()
  @IsPositive()
  order: number;

  @IsString()
  readonly title: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PriceDto)
  readonly price: PriceDto;

  @IsArray()
  @ValidateNested()
  @Type(() => VariantImageDto)
  readonly images: VariantImageDto[];

  @IsArray()
  @ValidateNested()
  @Type(() => VariantOptionDto)
  readonly options: VariantOptionDto[];
}

export class CreateProductRequestDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsOptional()
  readonly isActive: boolean;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PriceDto)
  readonly price: PriceDto;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => VariantDto)
  readonly variants: VariantDto[];
}

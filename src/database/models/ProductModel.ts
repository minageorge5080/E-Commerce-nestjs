import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseModel } from './BaseModel';
import { Variant, VariantSchema } from './ProductVariantModel';
import { Price } from './PriceModel';

@Schema()
export class Product extends BaseModel {
  @Prop({ required: true, index: 1, trim: true })
  title: string;

  @Prop()
  price: Price;

  @Prop({ required: true, index: 1, trim: true })
  description: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({
    required: true,
    type: [VariantSchema],
  })
  variants: Variant[];
}

export type ProductDocument = HydratedDocument<
  Product,
  { variants: Types.DocumentArray<Variant> }
>;
export const ProductSchema = SchemaFactory.createForClass(Product);

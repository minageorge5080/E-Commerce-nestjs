import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Price } from './PriceModel';

@Schema()
export class VariantOption {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true })
  stock: number;

  @Prop()
  price: Price;
}

export type VariantOptionDocument = HydratedDocument<VariantOption>;
export const VariantOptionSchema = SchemaFactory.createForClass(VariantOption);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { VariantImage, VariantImageSchema } from './VariantImageModel';
import { minimumLength } from '../validation';
import { VariantOption, VariantOptionSchema } from './VariantOptionModel';
import { Price } from './PriceModel';

@Schema()
export class Variant {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  order: number;

  @Prop({
    required: true,
    type: [VariantImageSchema],
    validate: [minimumLength(1, 'Should have at least one image')],
  })
  images: VariantImage[];

  @Prop({
    required: true,
    type: [VariantOptionSchema],
    validate: [minimumLength(1, 'Should have at least one option')],
  })
  options: VariantOption[];

  @Prop()
  price: Price;
}

export type VariantDocument = HydratedDocument<
  Variant,
  {
    images: Types.DocumentArray<VariantImage>;
    options: Types.DocumentArray<VariantOption>;
  }
>;
export const VariantSchema = SchemaFactory.createForClass(Variant);

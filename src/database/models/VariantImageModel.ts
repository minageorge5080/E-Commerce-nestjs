import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class VariantImage {
  @Prop({ required: true, trim: true })
  url: string;

  @Prop({ required: true })
  order: number;
}

export const VariantImageSchema = SchemaFactory.createForClass(VariantImage);

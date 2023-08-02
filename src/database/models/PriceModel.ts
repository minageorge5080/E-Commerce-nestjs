import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from './BaseModel';
import { CURRENCIES } from 'src/core/constants';

@Schema({ _id: false })
export class Price {
  @Prop({ required: true })
  value: number;

  @Prop({ required: true, enum: CURRENCIES, default: CURRENCIES.USD })
  currency: string;
}

export const PriceSchema = SchemaFactory.createForClass(Price);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Animal } from "../../animal/schemas/animal.schema";

export type MilkProductionDocument = HydratedDocument<MilkProduction>;

@Schema({versionKey: false})
export class MilkProduction {
  @Prop()
  milk_yield: string;
  @Prop()
  milk_quality: string;
  @Prop()
  milk_scheadule: string;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Animal'})
  animal_id: Animal; 
}

export const MilkProductionSchema = SchemaFactory.createForClass(MilkProduction);
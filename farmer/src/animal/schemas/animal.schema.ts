import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { AnimalType } from "../../animal_type/schemas/animal_type.schema";
import { VaccinationHistory } from "../../vaccination_history/schemas/vaccination_history.schema";
import { AnimalInfo } from "../../animal_info/schemas/animal_info.schema";
import { Feeding } from "../../feeding/schemas/feeding.schema";
import { RecordsOfIllness } from "../../records_of_illness/schemas/records_of_illness.schema";
import { MeatProduction } from "../../meat_production/schemas/meat_production.schema";
import { FiberProduction } from "../../fiber_production/schemas/fiber_production.schema";
import { MilkProduction } from "../../milk_production/schemas/milk_production.schema";

export type AnimalDocument = HydratedDocument<Animal>;

@Schema({versionKey: false})
export class Animal {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'AnimalType'})
  animal_type_id: AnimalType;
  @Prop()
  photos: string;
  @Prop()
  name: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'VaccinationHistory'}]})
  vaccination_history: VaccinationHistory[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'AnimalInfo'}]})
  animal_info: AnimalInfo[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Feeding'}]})
  feeding: Feeding[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'RecordsOfIllness'}]})
  records_of_illness: RecordsOfIllness[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'MeatProduction'}]})
  meat_production: MeatProduction[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'FiberProduction'}]})
  fiber_production: FiberProduction[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'MilkProduction'}]})
  milk_production: MilkProduction[];
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { AnimalType } from "../../animal_type/schemas/animal_type.schema";
import { VaccinationHistory } from "../../vaccination_history/schemas/vaccination_history.schema";

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
  vaccination_history: VaccinationHistory[]
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
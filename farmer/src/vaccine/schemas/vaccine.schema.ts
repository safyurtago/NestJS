import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { VaccinationHistory } from "../../vaccination_history/schemas/vaccination_history.schema";

export type VaccineDocument = HydratedDocument<Vaccine>;

@Schema({versionKey: false})
export class Vaccine {
  @Prop()
  vaccine_type: string
  @Prop()
  name: string
  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'VaccinationHistory'}]})
  vaccination_history: VaccinationHistory[];
}

export const VaccineSchema = SchemaFactory.createForClass(Vaccine);


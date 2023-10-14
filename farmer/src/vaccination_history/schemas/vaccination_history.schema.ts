import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Animal } from "../../animal/schemas/animal.schema";
import { Vaccine } from "../../vaccine/schemas/vaccine.schema";
import { Worker } from "../../worker/schemas/worker.schema";

export type VaccinationHistoryDocument = HydratedDocument<VaccinationHistory>;

@Schema({versionKey: false})
export class VaccinationHistory {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Animal'})
  animal_id: Animal;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Vaccine'})
  vaccine_id: Vaccine;
  date: Date;
  next_date: Date;
  photo_url: string;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Worker'})
  worker_id: Worker;
}


export const VaccinationHistorySchema = SchemaFactory.createForClass(VaccinationHistory);
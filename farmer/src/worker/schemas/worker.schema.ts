import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Speciality } from "../../speciality/schemas/speciality.schema";
import { WorkerBlock } from "../../worker_block/schemas/worker_block.schema";
import { VaccinationHistory } from "../../vaccination_history/schemas/vaccination_history.schema";
import { Feeding } from "../../feeding/schemas/feeding.schema";

export type WorkerDocument = HydratedDocument<Worker>;

@Schema({versionKey: false})
export class Worker {
  @Prop({required: true})
  name: string;

  @Prop()
  age: number;

  @Prop()
  experience: number;

  @Prop({required: true})
  phone_number: string;

  @Prop({required: true})
  username: string;

  @Prop()
  description: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Speciality'})
  speciality_id: Speciality;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'WorkerBlock'}]})
  worker_blocks: WorkerBlock[];
  
  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'VaccinationHistory'}]})
  vaccination_history: VaccinationHistory[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Feeding'}]})
  feeding: Feeding[];
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
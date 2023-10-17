import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Animal } from "../../animal/schemas/animal.schema";

export type RecordsOfIllnessDocument = HydratedDocument<RecordsOfIllness>;

@Schema({versionKey: false})
export class RecordsOfIllness {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Animal'})
  animal_id: Animal;
  @Prop()
  illness_type: RecordsOfIllness;
  @Prop()
  data_disease: string;
  @Prop()
  medicenes: string;
  @Prop()
  data_treatment: string;
  @Prop()
  illness_photo: string;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Worker'})
  worker_id: Worker;
}

export const RecordsOfIllnessSchema = SchemaFactory.createForClass(RecordsOfIllness);
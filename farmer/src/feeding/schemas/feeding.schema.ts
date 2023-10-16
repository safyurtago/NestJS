import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Animal } from "../../animal/schemas/animal.schema";
import { Worker } from "../../worker/schemas/worker.schema";
import { RecordsOfFeeding } from "../../records_of_feeding/schemas/records_of_feeding.schema";

export type FeedingDocument = HydratedDocument<Feeding>;

@Schema({versionKey: false})
export class Feeding {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Animal'})
  animal_id: Animal[];
  @Prop()
  feeding_schedules: string;
  @Prop()
  types_of_feed: string;
  @Prop()
  dietary: string;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Worker'})
  worker_id: Worker[];
  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'RecordsOfFeeding'}]})
  records_of_feeding: RecordsOfFeeding[];
}


export const FeedingSchema = SchemaFactory.createForClass(Feeding);
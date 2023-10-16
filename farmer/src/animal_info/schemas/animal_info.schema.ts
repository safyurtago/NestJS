import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Block } from "../../block/schemas/block.schema";
import { Animal } from "../../animal/schemas/animal.schema";

export type AnimalInfoDocument = HydratedDocument<AnimalInfo>;

@Schema({versionKey: false})
export class AnimalInfo {
  @Prop()
  weight: number;
  @Prop()
  color: string;
  @Prop()
  height: number;
  @Prop()
  breed: string;
  @Prop()
  gender: string;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Block'})
  block_id: Block[];
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Animal'})
  animal_id: Animal[];
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Animal', default: null})
  parent_id: Animal[];
}

export const AnimalInfoSchema = SchemaFactory.createForClass(AnimalInfo);
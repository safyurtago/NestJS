import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Animal } from "../../animal/schemas/animal.schema";


export type AnimalTypeDocument = HydratedDocument<AnimalType>;

@Schema({versionKey: false})
export class AnimalType {
  @Prop({unique: true})
  type_name: string;
  @Prop()
  description: string;
  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Animal'}]})
  animals: Animal[]
}

export const AnimalTypeSchema = SchemaFactory.createForClass(AnimalType)

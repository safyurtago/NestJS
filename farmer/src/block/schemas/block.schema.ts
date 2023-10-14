import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { WorkerBlock } from "../../worker_block/schemas/worker_block.schema";

export type BlockDocument = HydratedDocument<Block>;

@Schema({versionKey: false})
export class Block {
  @Prop({required: true})
  number: number;
  
  @Prop()
  description: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'WorkerBlock'}]})
  worker_blocks: WorkerBlock[];
}

export const BlockSchema = SchemaFactory.createForClass(Block);

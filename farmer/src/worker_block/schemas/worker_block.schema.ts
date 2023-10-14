import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Worker } from "../../worker/schemas/worker.schema";
import { Block } from "../../block/schemas/block.schema";

export type WorkerBlockDocument = HydratedDocument<WorkerBlock>;

@Schema({versionKey: false})
export class WorkerBlock {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Worker'})
  worker_id: Worker;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Block'})
  block_id: Block;
}

export const WorkerBlockSchema = SchemaFactory.createForClass(WorkerBlock)

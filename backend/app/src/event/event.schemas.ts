import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type EventsDocument = Events & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc : any, ret: any) => {
            delete ret._id;
        },
    },
    versionKey: false,
})
export class Events {
    @Prop({
        type: String,
        required: true,
        minlength: 2,
        trim: true,
      })
    title: string;
    @Prop({
        type: String,
        trim: true,
      })
    description?: string;
    @Prop({
        type: Date,
        required: true,
      })
    startDate: Date;
    @Prop({
        type: Date,
      })
    endDate?: Date;
    @Prop({
        type: Date,
        default: Date.now,
      })
    createdAt?: Date;
    @Prop({
        type: Date,
      })
    updatedAt?: Date;
    @Prop({
        type: String,
        trim: true,
    })
    user?: string;
}

export const EventsSchema = SchemaFactory.createForClass(Events);

EventsSchema.index({id: 1}, {unique: true})
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    @IsString()
    @IsNotEmpty()
    username: string;

    @Prop({ required: true, unique: true })
    @IsEmail()
    email: string;

    @Prop({ required: true })
    @IsString()
    @MinLength(8)
    password: string;

    @Prop()
    @IsString()
    bio: string;

    @Prop()
    @IsString()
    image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);